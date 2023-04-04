import { ChangeEvent, useRef, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import dynamic from "next/dynamic";
import Image from "next/image";
import * as Yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import { ToastContainer } from "react-toastify";

import filter from "~data/filter";
import styles from "./createProductForm.module.scss";
import InputForm from "~components/custom/inputForm/InputForm";
import Button from "~components/custom/button/Button";
import Spinner from "~components/common/spiner/Spiner";
import type { CreateProduct } from "~types/product.type";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import { createProduct, uploadImg } from "~api/product.api";
import notify from "~utils/toastify";
import { getAllBrand } from "~api/brand.api";
import { getAllCategory } from "~api/categories.api";
import SelectForm from "~components/custom/selectForm/SelectForm";

const cx = classNames.bind(styles);

const createProductValidates = Yup.object({
    name_product: Yup.string().required("*Vui lòng nhập tên sản phẩm!"),
    brand: Yup.string().required("*Vui lòng chọn hãng sản xuất!"),
    price: Yup.number()
        .positive("*Giá bán phải lớn hơn 0")
        .required("*Vui lòng nhập giá sản phẩm!"),
    images: Yup.mixed(),
    insurance: Yup.string().required("*Vui lòng nhập thời hạn bảo hành!"),
    discount: Yup.number()
        .default(0)
        .min(0, "*Khuyến mãi phải từ 0 - 99 %")
        .max(99, "*Khuyến mãi phải từ 0 - 99 %"),
    sku: Yup.string().required("*Vui lòng nhập mã hàng!"),
    categories: Yup.array().min(1, "*Chọn ít nhất 1 loại!"),
    in_stock: Yup.number()
        .positive("*Số lượng phải lớn hơn 0!")
        .required("*Vui lòng nhập số lượng!"),
});

interface HandleInputProps {
    e: ChangeEvent<HTMLInputElement>;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean
    ) => void;
}

const CreateProductForm = () => {
    const [images, setImages] = useState<string[]>([]);
    const [categoriesSelct, setCategoriesSelect] = useState([]);

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
    const refInputImg = useRef<HTMLInputElement>(null);

    const handleResetForm = (cb: any) => {
        if (refInputImg.current) {
            refInputImg.current.value = "";
            cb();
            setImages([]);
        }
    };

    const mutation = useMutation((data: CreateProduct) =>
        createProduct(aixosPrivate, data)
    );

    // fetch data;
    const { data: allBrand, isLoading: isLoadingBrand } = useQuery(
        ["brands"],
        getAllBrand
    );
    const { data: allCategory, isLoading: isLoadingCate } = useQuery(
        ["all-category"],
        getAllCategory
    );

    const MultiSelect = useMemo(() => {
        return dynamic(
            import("react-multi-select-component").then(
                (mod) => mod.MultiSelect
            ),
            { ssr: false }
        );
    }, []);

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
                        validationSchema={createProductValidates}
                        onSubmit={async (
                            values,
                            { resetForm, setFieldError }
                        ) => {
                            const formData = new FormData();
                            try {
                                if (values.images.length > 0) {
                                    for (
                                        let i = 0;
                                        i < values.images.length;
                                        i++
                                    ) {
                                        formData.append(
                                            "images",
                                            values.images[i]
                                        );
                                    }
                                } else {
                                    setFieldError(
                                        "images",
                                        "*Vui lòng chọn ít nhất 1 ảnh mô tả!"
                                    );
                                    return;
                                }

                                const uploadImgRes = await uploadImg(
                                    aixosPrivate,
                                    formData
                                );
                                if (uploadImgRes.data.success) {
                                    values.images = uploadImgRes.data.images;
                                    values.specialField =
                                        values.specialField?.map((i: any) => ({
                                            [i.title]: i.content,
                                        })) as [];

                                    mutation
                                        .mutateAsync(values)
                                        .then((data) => {
                                            console.log(data);
                                            if (data.data.success) {
                                                notify(
                                                    "success",
                                                    "Tạo mới thành công!"
                                                );
                                            }
                                            handleResetForm(resetForm);
                                        })
                                        .catch((err) =>
                                            notify(
                                                "error",
                                                err?.response?.data?.message
                                            )
                                        );
                                }
                            } catch (error: any) {
                                console.log(error);
                                notify("error", error?.response?.data?.message);
                            }
                        }}
                    >
                        {({
                            setFieldValue,
                            errors,
                            touched,
                            isSubmitting,
                            values,
                            resetForm,
                        }) => (
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
                                {!isLoadingBrand && (
                                    <div className={cx("form-group")}>
                                        <Field
                                            component={SelectForm}
                                            name="brand"
                                            leftlabel="Hãng sản xuất:"
                                            className="form-control"
                                        >
                                            <option disabled value="">
                                                Chọn hãng sản xuất
                                            </option>
                                            {allBrand?.brands.map((brand) => (
                                                <option
                                                    value={brand._id}
                                                    key={brand._id}
                                                >
                                                    {brand.brand_name}
                                                </option>
                                            ))}
                                        </Field>
                                    </div>
                                )}

                                {/* categories */}
                                <div className={cx("form-group")}>
                                    <div className="d-flex">
                                        <label>Categories:</label>
                                        <div
                                            style={{
                                                marginLeft: "auto",
                                                maxWidth: "700px",
                                                minWidth: "450px",
                                                flex: 1,
                                            }}
                                        >
                                            {!isLoadingCate && (
                                                <MultiSelect
                                                    options={
                                                        allCategory?.lists.map(
                                                            (cate) => ({
                                                                label: cate.name,
                                                                value: cate._id,
                                                            })
                                                        )!
                                                    }
                                                    value={categoriesSelct}
                                                    onChange={(e: any) => {
                                                        setCategoriesSelect(e);
                                                        setFieldValue(
                                                            "categories",
                                                            e.map(
                                                                (i: any) =>
                                                                    i.value
                                                            )
                                                        );
                                                    }}
                                                    labelledBy=""
                                                    valueRenderer={(
                                                        selected,
                                                        _options
                                                    ) => {
                                                        return selected.length
                                                            ? selected.map(
                                                                  ({ label }) =>
                                                                      "✔️ " +
                                                                      label
                                                              )
                                                            : "Chọn ít nhất 1";
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    {touched.categories &&
                                        errors.categories && (
                                            <div
                                                className="mt-1"
                                                style={{
                                                    color: "red",
                                                    fontSize: "0.8rem",
                                                }}
                                            >
                                                {errors.categories as string}
                                            </div>
                                        )}
                                </div>

                                <div
                                    className={`d-flex py-3 px-2 ${cx(
                                        "form-group"
                                    )}`}
                                    style={{
                                        border: "1px solid #666",
                                    }}
                                >
                                    <label>SpecialField:</label>
                                    <FieldArray
                                        name="specialField"
                                        render={(arrayHelpers) => {
                                            return (
                                                <div
                                                    style={{
                                                        marginLeft: "auto",
                                                    }}
                                                >
                                                    {values.specialField &&
                                                    values.specialField.length >
                                                        0
                                                        ? values.specialField.map(
                                                              (item, index) => (
                                                                  <div
                                                                      className="d-flex align-items-center my-2"
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      <Field
                                                                          component={
                                                                              SelectForm
                                                                          }
                                                                          name={`specialField.${index}.title`}
                                                                          placeholder="title"
                                                                          className="form-control"
                                                                      >
                                                                          <option
                                                                              disabled
                                                                              value=""
                                                                          ></option>
                                                                          {Object.keys(
                                                                              filter
                                                                                  .filter
                                                                                  .specialField
                                                                          ).map(
                                                                              (
                                                                                  i,
                                                                                  index
                                                                              ) => (
                                                                                  <option
                                                                                      key={
                                                                                          index
                                                                                      }
                                                                                      value={
                                                                                          i
                                                                                      }
                                                                                  >
                                                                                      {
                                                                                          i
                                                                                      }
                                                                                  </option>
                                                                              )
                                                                          )}
                                                                      </Field>
                                                                      <span className="px-2">
                                                                          :
                                                                      </span>
                                                                      <Field
                                                                          component={
                                                                              SelectForm
                                                                          }
                                                                          name={`specialField.${index}.content`}
                                                                          placeholder="content"
                                                                          className="form-control"
                                                                      >
                                                                          <option
                                                                              value=""
                                                                              disabled
                                                                          ></option>
                                                                          {(
                                                                              filter
                                                                                  .filter
                                                                                  .specialField[
                                                                                  values.specialField![
                                                                                      index
                                                                                  ][
                                                                                      "title"
                                                                                  ]
                                                                              ] as
                                                                                  | []
                                                                                  | undefined
                                                                          )?.map(
                                                                              (
                                                                                  i: any,
                                                                                  index
                                                                              ) => (
                                                                                  <option
                                                                                      key={
                                                                                          index
                                                                                      }
                                                                                      value={
                                                                                          i.title
                                                                                      }
                                                                                  >
                                                                                      {
                                                                                          i.title
                                                                                      }
                                                                                  </option>
                                                                              )
                                                                          )}
                                                                      </Field>
                                                                      <Button
                                                                          size="sm"
                                                                          type="button"
                                                                          style={{
                                                                              marginLeft:
                                                                                  "6px",
                                                                          }}
                                                                          onClick={() =>
                                                                              arrayHelpers.remove(
                                                                                  index
                                                                              )
                                                                          }
                                                                      >
                                                                          -
                                                                      </Button>
                                                                  </div>
                                                              )
                                                          )
                                                        : null}
                                                    <div
                                                        style={{
                                                            float: "right",
                                                        }}
                                                    >
                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                            type="button"
                                                            onClick={() =>
                                                                arrayHelpers.push(
                                                                    {
                                                                        title: "",
                                                                        content:
                                                                            "",
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            Thêm
                                                        </Button>
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    />
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
                                            ref={refInputImg}
                                            name="images"
                                            type="file"
                                            className="form-control"
                                            multiple
                                            onChange={(
                                                e: ChangeEvent<HTMLInputElement>
                                            ) =>
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
                                <div className={cx("img-desc")}>
                                    {images.map((image, index) => (
                                        <span
                                            className={cx("img-desc__item")}
                                            key={index}
                                        >
                                            <Image
                                                src={image}
                                                alt="product image desc"
                                                fill
                                            />
                                        </span>
                                    ))}
                                </div>

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

                                <div
                                    className={`d-flex py-3 px-2 ${cx(
                                        "form-group"
                                    )}`}
                                    style={{
                                        border: "1px solid #666",
                                    }}
                                >
                                    <label>Catalog:</label>
                                    <FieldArray
                                        name="catalog"
                                        render={(arrayHelpers) => {
                                            return (
                                                <div
                                                    style={{
                                                        marginLeft: "auto",
                                                    }}
                                                >
                                                    {values.catalog &&
                                                    values.catalog.length > 0
                                                        ? values.catalog.map(
                                                              (item, index) => (
                                                                  <div
                                                                      className="d-flex align-items-center my-2"
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      <Field
                                                                          component={
                                                                              InputForm
                                                                          }
                                                                          name={`catalog.${index}.title`}
                                                                          placeholder="title"
                                                                          className="form-control"
                                                                      />
                                                                      <span className="px-2">
                                                                          :
                                                                      </span>
                                                                      <Field
                                                                          component={
                                                                              InputForm
                                                                          }
                                                                          name={`catalog.${index}.content`}
                                                                          placeholder="content"
                                                                          className="form-control"
                                                                      />
                                                                      <Button
                                                                          size="sm"
                                                                          type="button"
                                                                          style={{
                                                                              marginLeft:
                                                                                  "6px",
                                                                          }}
                                                                          onClick={() =>
                                                                              arrayHelpers.remove(
                                                                                  index
                                                                              )
                                                                          }
                                                                      >
                                                                          -
                                                                      </Button>
                                                                  </div>
                                                              )
                                                          )
                                                        : null}
                                                    <div
                                                        style={{
                                                            float: "right",
                                                        }}
                                                    >
                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                            type="button"
                                                            onClick={() =>
                                                                arrayHelpers.push(
                                                                    {
                                                                        title: "",
                                                                        content:
                                                                            "",
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            Thêm
                                                        </Button>
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    />
                                </div>

                                <div className="d-flex justify-content-end">
                                    <Button
                                        variant="secondary"
                                        style={{ marginTop: "10px" }}
                                        onClick={() =>
                                            handleResetForm(resetForm)
                                        }
                                        type="button"
                                    >
                                        Reset
                                    </Button>

                                    <Button
                                        style={{ marginTop: "10px" }}
                                        type="submit"
                                    >
                                        Tạo mới
                                    </Button>
                                </div>
                                {isSubmitting && <Spinner />}
                            </Form>
                        )}
                    </Formik>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default CreateProductForm;
