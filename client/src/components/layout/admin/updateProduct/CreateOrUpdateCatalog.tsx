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
import { saveProductByCategoryAndSlug } from "~/redux/slice/productsSlice";
import { ProductBycategoryAndSlugResult } from "~/types/index";
import adminApi from "~/api/admin";
import { notifyError, notifySuccess } from "~/utils/toastify";
import { AxiosError } from "axios";
import Catalog from "./catalog";
import SidebarUpdate from "~/components/admin/sidebarUpdate";

const cx = classNames.bind(styles);

export interface CreateOrUpdateCatalogType {
    product_catalog: {
        title_catalog: string, 
        content_catalog: string
    }[]
}

const CreateOrUpdateCatalog = () => {
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
    const submitUpdate = async (values: CreateOrUpdateCatalogType, resetForm: (nextState?: Partial<FormikState<CreateOrUpdateCatalogType>> | undefined) => void) => {
        try {
            if (values.product_catalog.length > 0) {
                await adminApi.createCatalog(product.id.toString(), {product_catalog: values.product_catalog})
            }
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
                    {product.id && <Formik<CreateOrUpdateCatalogType>
                        initialValues={{
                            product_catalog: [
                                {
                                    title_catalog: '',
                                    content_catalog: ''
                                }
                            ]
                        }}
                        onSubmit={(values, {resetForm}) => submitUpdate(values, resetForm)}
                    >
                        {({isSubmitting, resetForm, touched, errors, values, setFieldValue}) => {
                            return (
                                <Form>
                                    <div className={cx('wrapper-form')}>
                                        <Catalog product={product} values={values}/>
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

export default CreateOrUpdateCatalog;