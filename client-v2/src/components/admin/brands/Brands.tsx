import { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import classNames from "classnames/bind";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import useClickOutSide from "~hook/useClickOutSide";
import styles from "./brands.module.scss";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import { createNewBrand, getAllBrand } from "~api/brand.api";
import { CreateBrand } from "~types/brand.type";
import Spinner from "~components/common/spiner/Spiner";
import Button from "~components/custom/button/Button";
import { uploadImg } from "~api/product.api";
import notify from "~utils/toastify";
import InputForm from "~components/custom/inputForm/InputForm";
import RichEditor from "../richEditor/RichEditor";
import { BsThreeDots } from "react-icons/bs";
import BackdropModal from "~components/custom/backdropModal/BackdropModal";

const cx = classNames.bind(styles);

const Brands = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["brands"], getAllBrand);
  const [rawHtml, setRawHtml] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const mutaion = useMutation(
    (data: CreateBrand) => createNewBrand(axiosPrivate, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["brands"]);
      },
    }
  );

  const validateSchema = Yup.object({
    brand_name: Yup.string().required("*Vui lòng nhập tên!"),
    brand_thumb: Yup.string().required("*Vui lòng chọn ảnh!"),
  });

  const refInputImg = useRef<HTMLInputElement>(null);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container-fluid">
          <div className="d-flex align-items-center my-2">
            <h1 className={cx("title")}>Nhà Sản xuất</h1>
            <Button
              style={{ padding: "4px 10px", marginLeft: "auto" }}
              variant="secondary"
              leftIcon={<IoMdAddCircleOutline size={30} color="#fff" />}
              type="button"
              onClick={() => setOpenForm(true)}
            >
              Tạo mới
            </Button>
          </div>
          <div className={cx("brands-form", { "open-form": openForm })}>
            <Formik
              initialValues={{ name: "", image: "" } as any}
              validationSchema={validateSchema}
              onSubmit={async (values, { resetForm }) => {
                const formData = new FormData();
                try {
                  formData.append("thumb", values.image);
                  const resImg = await uploadImg(axiosPrivate, formData);
                  if (resImg.data.success) {
                    values.image = resImg.data.thumb;
                    values.description = rawHtml;
                    mutaion.mutateAsync(values).then((data) => {
                      if (data.data.success) {
                        notify("success", "Tạo mới thành công");
                      }
                      if (refInputImg.current) {
                        refInputImg.current.value = "";
                        resetForm();
                      }
                    });
                  }
                } catch (error: any) {
                  console.log(error);
                  notify("error", error?.response?.data?.message);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className={cx("form-group")}>
                    <Field
                      component={InputForm}
                      name="brand_name"
                      leftlabel="Tên nhà Sản xuất:"
                      className="form-control"
                    />
                  </div>

                  <div className={cx("form-group")}>
                    <Field
                      component={InputForm}
                      name="brand_thumb"
                      type="file"
                      leftlabel="Ảnh nền:"
                    />
                  </div>
                  <div className="col-12">
                    <RichEditor rawHtml={rawHtml} setRawHtml={setRawHtml} />
                  </div>
                  <div className="mt-3 d-flex" style={{ float: "right" }}>
                    <Button
                      variant="secondary-border"
                      type="button"
                      onClick={() => setOpenForm(false)}
                    >
                      Thu gọn
                    </Button>
                    <Button type="submit">Tạo mới</Button>
                  </div>
                  {isSubmitting && <Spinner />}
                </Form>
              )}
            </Formik>
          </div>

          <div className={`row ${cx("cate-list")}`}>
            {data?.brands.map((brand, index) => (
              <BrandItem data={brand} key={brand._id} />
            ))}
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

const BrandItem = ({ data }: any) => {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const btnDropDownRef = useRef(null);
  useClickOutSide(btnDropDownRef, () => setActive(false));
  const handleDeleteBrand = () => {};

  return (
    <div className="col-2 g-2">
      <div className={cx("brand-item")}>
        <Link href={``} className={cx("brand-item__img")}>
          <Image src={data.brand_thumb} alt={""} fill sizes="auto" />
        </Link>

        <div className={cx("brand-item__title")}>
          <Link href={``}>
            <span>{data.brand_name}</span>
          </Link>
        </div>

        <div
          className={`d-flex justify-content-center align-items-center ${cx(
            "btn-more"
          )}`}
          onClick={() => setActive(!active)}
        >
          <BsThreeDots color="#999" />
        </div>
        {active && (
          <ul className={cx("dropdown")} ref={btnDropDownRef}>
            <li
              onClick={() => {
                router.push(`/admin/products/brands/${data.slug}`);
              }}
            >
              Chỉnh sửa
            </li>
            <li
              data-bs-toggle="modal"
              data-bs-target={`#deletePeoduct${data._id}`}
              style={{ color: "#f40052 " }}
            >
              Xóa
            </li>
          </ul>
        )}
        <BackdropModal
          body="Chắc chắn xóa?"
          id={`deletePeoduct${data._id}`}
          titleDismiss="Hủy"
          titleAgree="Xóa"
          handleAgree={() => handleDeleteBrand()}
        />
      </div>
    </div>
  );
};

export default Brands;
