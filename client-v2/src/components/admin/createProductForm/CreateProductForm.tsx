import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { ToastContainer } from "react-toastify";

import styles from "./createProductForm.module.scss";
import InputForm from "~components/custom/inputForm/InputForm";
import Button from "~components/custom/button/Button";
import Spinner from "~components/common/spiner/Spiner";
import type { CreateProduct } from "~types/product.type";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import { createProduct, uploadImg } from "~api/product.api";
import notify from "~utils/toastify";
import SelectForm from "~components/custom/selectForm/SelectForm";
import { getAllBrand } from "~api/brand.api";
import { getAllCategory } from "~api/categories.api";
import EditDescripton from "../editDescription/EditDescription";

const cx = classNames.bind(styles);

const createProductValidates = Yup.object({
  name_product: Yup.string().required("*Vui lòng nhập tên sản phẩm!"),
  brand: Yup.string().required("*Vui lòng chọn hãng sản xuất!"),
  price: Yup.number().required("*Vui lòng nhập giá sản phẩm!"),
  images: Yup.mixed().required("*Vui lòng chọn thêm ảnh mô tả cho sản phẩm"),
  insurance: Yup.string().required("*Vui lòng nhập thời hạn bảo hành!"),
  discount: Yup.number()
    .default(0)
    .min(0, "*Khuyến mãi phải từ 0 - 99 %")
    .max(99, "*Khuyến mãi phải từ 0 - 99 %"),
  sku: Yup.string().required("*Vui lòng nhập mã hàng!"),
  category: Yup.mixed(),
  in_stock: Yup.number().required("*Vui lòng nhập số lượng!"),
});

interface HandleInputProps {
  e: ChangeEvent<HTMLInputElement>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const CreateProductForm = () => {
  const [images, setImages] = useState<string[]>([]);

  const [description, setDescription] = useState("");

  const aixosPrivate = useAxiosPrivate();

  const handleMultipleImage = ({ e, setFieldValue }: HandleInputProps) => {
    const files = e.currentTarget.files;
    if (files) {
      const result = [];
      setFieldValue("images", files);
      for (let i = 0; i < files.length; i++) {
        result.push(URL.createObjectURL(files[i]));
      }
      setImages(result);
    }
  };

  // fetch data;
  const { data: allBrand, isSuccess: getAllBrandSuccess } = useQuery(
    ["brands"],
    getAllBrand
  );
  const { data: allCategory, isSuccess: getAllCategorySuccess } = useQuery(
    ["all-category"],
    getAllCategory
  );

  useEffect(() => {
    return () => {
      for (let i = 0; i < images.length; i++) {
        URL.revokeObjectURL(images[i]);
      }
    };
  }, [images]);

  return (
    <>
      <div className="container-fluid mb-5">
        <h1 className={cx("title")}>Thêm mới sản phẩm</h1>
        <div className={cx("wrapper")}>
          <Formik<CreateProduct>
            initialValues={{
              name_product: "",
              brand: "",
              specialField: [],
              discount: 0,
              price: 0,
              images: [],
              in_stock: 0,
              insurance: "",
              sku: "",
              catalog: [],
              categories: [],
            }}
            // validationSchema={createProductValidates}
            onSubmit={async (values) => {
              const formData = new FormData();

              if (values.images.length > 0) {
                for (let i = 0; i < values.images.length; i++) {
                  formData.append("images", values.images[i]);
                }
              }

              try {
                const uploadImgRes = await uploadImg(aixosPrivate, formData);
                if (uploadImgRes.data.success) {
                  values.images = uploadImgRes.data.images;

                  const newProductRes = await createProduct(
                    aixosPrivate,
                    values
                  );
                  if (newProductRes.data.success) {
                    notify("success", "Tạo mới thành công.");
                  }
                }
              } catch (error: any) {
                console.log(error);
                notify("error", error?.response?.data?.message);
              }
            }}
          >
            {({ setFieldValue, errors, touched, isSubmitting }) => (
              <Form>
                <div className={cx("form-group")}>
                  <Field
                    component={InputForm}
                    name="name_product"
                    leftlabel="Tên sản phẩm:"
                    className="form-control"
                  />
                </div>

                {/* brands */}
                {/* <div className={cx("form-group")}>
                  <Field
                    component={SelectForm}
                    name="brand"
                    className="form-select"
                    leftlabel="Hãng sản xuất:"
                    aria-label=".form-select-sm"
                  >
                    <option value={""} disabled hidden>
                      Chọn hãng sản xuất:
                    </option>
                    {getAllBrandSuccess &&
                      allBrand.brands.map((brand) => (
                        <option key={brand._id} value={brand._id}>
                          {brand.brand_name}
                        </option>
                      ))}
                  </Field>
                </div> */}

                {/* categories */}
                {/* <div className={cx("form-group")}>
                  <Field
                    component={SelectForm}
                    name="categories"
                    className="form-select"
                    leftlabel="Loại hàng:"
                    aria-label=".form-select-sm"
                  >
                    <option value={""} disabled hidden>
                      Chọn loại hàng:
                    </option>
                    {getAllCategorySuccess &&
                      allCategory.lists.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                  </Field>
                </div> */}

                <div className={cx("form-group")}>
                  <div className="d-flex">
                    <label>specialField:</label>
                    <input name="specialField" className="form-control" />
                  </div>
                </div>

                <div className={cx("form-group")}>
                  <Field
                    component={InputForm}
                    name="discount"
                    leftlabel="Khuyến mãi:"
                    type="number"
                    className="form-control"
                  />
                </div>

                <div className={cx("form-group")}>
                  <Field
                    component={InputForm}
                    name="price"
                    leftlabel="Giá bán:"
                    className="form-control"
                  />
                </div>

                <div className={cx("form-group")}>
                  <div className="d-flex">
                    <label>Ảnh mô tả:</label>
                    <input
                      name="images"
                      type="file"
                      className="form-control"
                      multiple
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleMultipleImage({
                          e,
                          setFieldValue,
                        })
                      }
                    />
                  </div>
                  {touched.images && errors.images && (
                    <div
                      className="mt-1"
                      style={{
                        color: "red",
                        fontSize: "0.8rem",
                      }}
                    >
                      {errors.images as string}
                    </div>
                  )}
                </div>
                {images.map((image, index) => (
                  <div className={cx("img-desc")} key={index}>
                    <span className={cx("img-desc__item")}>
                      <Image
                        src={image}
                        key={index}
                        alt="product image desc"
                        fill
                      />
                    </span>
                  </div>
                ))}

                <div className={cx("form-group")}>
                  <Field
                    component={InputForm}
                    name="in_stock"
                    leftlabel="Số lượng:"
                    className="form-control"
                    type="number"
                  />
                </div>

                <div className={cx("form-group")}>
                  <Field
                    component={InputForm}
                    name="insurance"
                    leftlabel="Thời gian bảo hành:"
                    className="form-control"
                  />
                </div>

                <div className={cx("form-group")}>
                  <Field
                    component={InputForm}
                    name="sku"
                    leftlabel="Mã hàng:"
                    className="form-control"
                  />
                </div>

                <div className={cx("form-group")}>
                  <Field
                    component={InputForm}
                    name="catalog"
                    leftlabel="Catalog:"
                    className="form-control"
                  />
                </div>

                <div className={cx("form-group")}>
                  <Field
                    component={InputForm}
                    name="desc"
                    leftlabel="Mô tả:"
                    className="form-control"
                  />
                </div>

                <Button
                  variant="primary"
                  style={{ float: "right" }}
                  type="submit"
                >
                  Lưu
                </Button>
                {isSubmitting && <Spinner />}
              </Form>
            )}
          </Formik>
        </div>
        <ToastContainer />
      </div>
      <div className="container mb-5">
        <EditDescripton
          description={description}
          setDescription={setDescription}
        />
      </div>
    </>
  );
};

export default CreateProductForm;
