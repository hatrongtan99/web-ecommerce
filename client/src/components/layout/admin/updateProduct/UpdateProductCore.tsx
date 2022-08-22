import classNames from "classnames/bind";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "~/redux/hooks";
import { Form, Formik, FormikState } from "formik";
import {ToastContainer} from 'react-toastify';

import { useAppDispatch } from "~/redux/hooks";
import { loadProductByCategoryAndSlug } from "~/utils/loadProduct";
import styles from './updateProduct.module.scss';
import Button from "~/components/custom/button";
import ModalPromt from "~/components/modalButton";
import Spinner from "~/components/component/spinner";
import ProductCore from "./productCore";
import { saveProductByCategoryAndSlug } from "~/redux/slice/productsSlice";
import { ProductBycategoryAndSlugResult } from "~/types/index";
import adminApi from "~/api/admin";
import { notifyError, notifySuccess } from "~/utils/toastify";
import { AxiosError } from "axios";
import SidebarUpdate from "~/components/admin/sidebarUpdate";

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

export interface UpdateProductType {
    products: ProductsCore,
    product_inventory: {
        inventory: number;
    },
    product_discount: {
        discount: number;
    },
    product_images: string[];
}

const UpdateProductCore = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const path = router.query.all;
    

    const product = useAppSelector(state => state.products.dataByCategoryAndSlug);

    useEffect(() => {
        if (path) {
            loadProductByCategoryAndSlug(dispatch, path[0], path[1])
        }
        return () => {
            dispatch(saveProductByCategoryAndSlug({} as ProductBycategoryAndSlugResult))
        }
    }, [path, dispatch])

    const handleResetForm = <T extends {}>(resetForm: (nextState?: Partial<FormikState<T>> | undefined) => void)=> {
        resetForm()
    }

    // submit form 
    const submitUpdate = async (values: UpdateProductType, resetForm: (nextState?: Partial<FormikState<UpdateProductType>> | undefined) => void) => {

        const formDataMultipleImages = new FormData();
        const formDataSingleImage = new FormData();
        try {
            if (values.product_images.length > 0) {
                for (let i = 0; i < values.product_images.length; i++) {
                    formDataMultipleImages.append('images', values.product_images[i])
                }
                const imagesPath = await adminApi.uploadMultipleImages(formDataMultipleImages);
                values.product_images = imagesPath.data
            }
            
            if (typeof values.products.product_thumb === 'object') {
                formDataSingleImage.append('image', values.products.product_thumb)
                const image = await adminApi.uploadSingleImage(formDataSingleImage);
                values.products.product_thumb = image.data;
            }
    
            const updateCoreProduct = {
                products: values.products,
                product_discount: values.product_discount,
                product_inventory: values.product_inventory
            }
    
            await adminApi.updateProduct((product.id).toString(), updateCoreProduct);
            await adminApi.addMultipleImagesToProduct((product.id).toString(), {product_images: values.product_images});

            if (path) {
                loadProductByCategoryAndSlug(dispatch, path[0], path[1])
            }
            resetForm()
            notifySuccess('Update successful')
        } catch (error) {
            const err = error as AxiosError
            console.log(err);
            notifyError(err.message)
        }
    }

    return (
        <>
            {/* <h1 className={cx('title')}>Chỉnh sửa sản phẩm</h1> */}
            <div className={`offset-2 row ${cx('wrapper')}`}>
                <div className='col-2'>
                    <SidebarUpdate/>
                </div>
                <div className='col-10'>
                    {product.id && <Formik<UpdateProductType>
                        initialValues={{
                            products: {
                                product_name: product.productName,
                                product_price: product.price,
                                product_thumb: product.productThumb,
                                product_category_id: product.categoryId,
                                product_brand_id: product.brandId,
                                sku: product.sku,
                                insurance_time: product.insurance,
                            },
                            product_discount: {
                                discount: product.discount,
                            },
                            product_inventory: {
                                inventory: product.quantity,
                            },

                            product_images: [],
                        }}
                        onSubmit={(values, {resetForm}) => submitUpdate(values, resetForm)}
                    >
                        {({isSubmitting, resetForm, touched, errors, values, setFieldValue}) => {
                            return (
                                <Form>
                                    <div className={cx('wrapper-form')}>
                                        <ProductCore product={product} touched={touched} errors={errors} values={values} setFieldValue={setFieldValue}/>
                                    </div>

                                    <div className={cx('button-group')}>
                                        <Button variant="primary" type="button" data-bs-toggle='modal' data-bs-target='#resetFormUpdate'>Reset</Button>
                                        <Button variant="secondary" type="submit">Lưu</Button>
                                    </div>

                                    <ModalPromt buttonTitle="Reset" content="Xác nhận reset form?" id="resetFormUpdate" handle={() => handleResetForm(resetForm)}/>
                                    {isSubmitting && <Spinner/>}
                                </Form>
                            )
                        }}
                    </Formik>}
                </div>
                <ToastContainer/>
            </div>
        </>
    )
}

export default UpdateProductCore;