import classNames from "classnames/bind";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Field, Form, Formik, FormikState } from "formik";

import styles from "./updateProduct.module.scss";
import ProductCore from "./productCore";
import CreateOrUpdateCatalog from "./catalog";
import CreateOrUpdateDescProduct from "./description";

const cx = classNames.bind(styles);

interface ProductsCore {
  product_name: string;
  product_price: number;
  product_thumb: string;
  product_category_id: number;
  product_brand_id: number;
  sku: string;
  insurance_time: string;
}

export interface FormikValuesType {
  products: ProductsCore;
  product_inventory: {
    inventory: number;
  };
  product_discount: {
    discount: number;
  };
  images: string[];
  product_catalog: {
    title_catalog: string;
    content_catalog: string;
  }[];
  desc_product: {
    title: string;
    content: string;
    image_desc: string;
    title_image_desc: string;
  }[];
}

const UpdateProduct = () => {
  const router = useRouter();
  const path = router.query.all;

  const handleResetForm = <T extends {}>(
    resetForm: (nextState?: Partial<FormikState<T>> | undefined) => void
  ) => {
    resetForm();
  };

  return (
    // <div className={`offset-2 ${cx('wrapper')}`}>
    //     {/* <h1 className={cx('title')}>Chỉnh sửa sản phẩm</h1> */}
    //     {product.id && <Formik<FormikValuesType>
    //         initialValues={{
    //             products: {
    //                 product_name: product.productName,
    //                 product_price: product.price,
    //                 product_thumb: product.productThumb,
    //                 product_category_id: product.categoryId,
    //                 product_brand_id: product.brandId,
    //                 sku: product.sku,
    //                 insurance_time: product.insurance,
    //             },
    //             product_discount: {
    //                 discount: product.discount,
    //             },
    //             product_inventory: {
    //                 inventory: product.quantity,
    //             },

    //             images: [],
    //             product_catalog: [
    //                 {
    //                     title_catalog: '',
    //                     content_catalog: ''
    //                 }
    //             ],
    //             desc_product: [
    //                 {
    //                     title: '',
    //                     content: '',
    //                     image_desc: '',
    //                     title_image_desc: ''
    //                 }
    //             ]
    //         }}
    //         onSubmit={async (values) => {
    //             const formDataMultipleImages = new FormData();
    //             const formDataSingleImage = new FormData();

    //             if (values.images.length > 0) {
    //                 for (let i = 0; i < values.images.length; i++) {
    //                     formDataMultipleImages.append('images', values.images[i])
    //                 }
    //                 const imagesPath = await adminApi.uploadMultipleImages(formDataMultipleImages);
    //                 values.images = imagesPath.data
    //             }

    //             if (typeof values.products.product_thumb === 'object') {
    //                 // formDataSingleImage.append('image', values.products.product_thumb[0])
    //                 // const image = await adminApi.uploadSingleImage(formDataSingleImage);
    //                 // values.products.product_thumb = image.data;
    //                 console.log(typeof values.products.product_thumb)
    //             }

    //             // const updateCoreProduct = {
    //             //     products: values.products,
    //             //     product_discount: values.product_discount,
    //             //     product_inventory: values.product_inventory
    //             // }

    //             // const response = await adminApi.updateProduct((product.id).toString(), updateCoreProduct)
    //             // if (path) {
    //             //     loadProductByCategoryAndSlug(dispatch, path[0], path[1])
    //             // }
    //             // console.log(response)
    //         }}
    //     >
    //         {({isSubmitting, resetForm, touched, errors, values, setFieldValue}) => {
    //             return (
    //                 <Form>
    //                     <div className={cx('wrapper-form')}>
    //                         <ProductCore product={product} touched={touched} errors={errors} values={values} setFieldValue={setFieldValue}/>
    //                     </div>

    //                     <div className={cx('wrapper-form')}>
    //                         <CreateOrUpdateCatalog product={product} touched={touched} errors={errors} values={values} setFieldValue={setFieldValue}/>
    //                     </div>

    //                     <div className={cx('wrapper-form')}>
    //                         <CreateOrUpdateDescProduct product={product} touched={touched} errors={errors} values={values} setFieldValue={setFieldValue}/>
    //                     </div>

    //                     <div className={cx('button-group')}>
    //                         <Button variant="primary" type="button" data-bs-toggle='modal' data-bs-target='#resetFormUpdate'>Reset</Button>
    //                         <Button variant="secondary" type="submit">Lưu</Button>
    //                     </div>

    //                     <ModalPromt buttonTitle="Reset" content="Xác nhận reset form?" id="resetFormUpdate" handle={() => handleResetForm(resetForm)}/>
    //                     {/* {isSubmitting && <Spinner/>} */}
    //                 </Form>
    //             )
    //         }}
    //     </Formik>}
    // </div>

    <></>
  );
};

export default UpdateProduct;
