import { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import classNames from "classnames/bind";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { IoMdAddCircleOutline } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/router";

import styles from "./categories.module.scss";
import { createNewCategory, getAllCategory } from "~api/categories.api";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import { NewCategory } from "~types/categories.type";
import Spinner from "~components/common/spiner/Spiner";
import InputForm from "~components/custom/inputForm/InputForm";
import RichEditor from "../richEditor/RichEditor";
import Button from "~components/custom/button/Button";
import { uploadImg } from "~api/product.api";
import notify from "~utils/toastify";
import BackdropModal from "~components/custom/backdropModal/BackdropModal";
import useClickOutSide from "~hook/useClickOutSide";

const cx = classNames.bind(styles);

const Categories = () => {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery(["all-category"], getAllCategory);
    const [rawHtml, setRawHtml] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const mutaion = useMutation(
        (data: NewCategory) => createNewCategory(axiosPrivate, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["all-category"]);
            },
        }
    );

    const validateSchema = Yup.object({
        name: Yup.string().required("*Vui lòng nhập tên!"),
        image: Yup.string().required("*Vui lòng chọn ảnh!"),
    });

    const refInputImg = useRef<HTMLInputElement>(null);
    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="container-fluid">
                    <div className="d-flex align-items-center my-2">
                        <h1 className={cx("title")}>Phân loại</h1>
                        <Button
                            style={{ padding: "4px 10px", marginLeft: "auto" }}
                            variant="secondary"
                            leftIcon={
                                <IoMdAddCircleOutline size={30} color="#fff" />
                            }
                            type="button"
                            onClick={() => setOpenForm(true)}
                        >
                            Tạo mới
                        </Button>
                    </div>
                    <div
                        className={cx("category-form", {
                            "open-form": openForm,
                        })}
                    >
                        <Formik
                            initialValues={{ name: "", image: "" } as any}
                            validationSchema={validateSchema}
                            onSubmit={async (values, { resetForm }) => {
                                const formData = new FormData();
                                try {
                                    formData.append("thumb", values.image);
                                    const resImg = await uploadImg(
                                        axiosPrivate,
                                        formData
                                    );
                                    if (resImg.data.success) {
                                        values.image = resImg.data.thumb;
                                        values.description = rawHtml;
                                        mutaion
                                            .mutateAsync(values)
                                            .then((data) => {
                                                if (data.data.success) {
                                                    notify(
                                                        "success",
                                                        "Tạo mới thành công"
                                                    );
                                                }
                                                if (refInputImg.current) {
                                                    refInputImg.current.value =
                                                        "";
                                                    resetForm();
                                                }
                                            });
                                    }
                                } catch (error: any) {
                                    console.log(error);
                                    notify(
                                        "error",
                                        error?.response?.data?.message
                                    );
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className={cx("form-group")}>
                                        <Field
                                            component={InputForm}
                                            name="name"
                                            leftlabel="Tên Category:"
                                            className="form-control"
                                        />
                                    </div>

                                    <div className={cx("form-group")}>
                                        <Field
                                            component={InputForm}
                                            name="image"
                                            type="file"
                                            leftlabel="Ảnh nền:"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <RichEditor
                                            rawHtml={rawHtml}
                                            setRawHtml={setRawHtml}
                                        />
                                    </div>
                                    <div
                                        className="mt-3 d-flex"
                                        style={{ float: "right" }}
                                    >
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
                        {data?.lists.map((cate, index) => (
                            <CateItem data={cate} key={cate._id} />
                        ))}
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    );
};

const CateItem = ({ data }: any) => {
    const router = useRouter();
    const [active, setActive] = useState(false);
    const btnDropDownRef = useRef(null);
    useClickOutSide(btnDropDownRef, () => setActive(false));
    const handleDeleteCate = () => {};

    return (
        <div className="col-2 g-2">
            <div className={cx("cate-item")}>
                <Link href={``} className={cx("cate-item__img")}>
                    <Image src={data.image} alt={""} fill sizes="auto" />
                </Link>

                <div className={cx("cate-item__title")}>
                    <Link href={``}>
                        <span>{data.name}</span>
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
                                router.push(
                                    `/admin/products/categories/${data.slug}`
                                );
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
                    body="Chắc chắn xóa sản phẩm này"
                    id={`deletePeoduct${data._id}`}
                    titleDismiss="Hủy"
                    titleAgree="Xóa"
                    handleAgree={() => handleDeleteCate()}
                />
            </div>
        </div>
    );
};

export default Categories;
