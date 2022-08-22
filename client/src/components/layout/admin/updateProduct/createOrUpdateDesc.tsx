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
import SidebarUpdate from "~/components/admin/sidebarUpdate";
import Description from "./description";

const cx = classNames.bind(styles);

export interface CreateOrUpdateDescProductType {
    desc_product: {
        title: string;
        content: string;
        image_desc: string | null;
        title_image_desc: string;
        number_order: string;
    }[];
}

const CreateOrUpdateDescription = () => {
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
    const submitUpdate = async (values: CreateOrUpdateDescProductType, resetForm: (nextState?: Partial<FormikState<CreateOrUpdateDescProductType>> | undefined) => void) => {  
        try {
            if (values.desc_product.length > 0) {
                for (let i = 0; i < values.desc_product.length; i++) {
                    if (typeof values.desc_product[i].image_desc === 'object') {
                        const fileData = new FormData()
                        fileData.append('image', values.desc_product[i].image_desc!)
                        const pathImage = await adminApi.uploadSingleImage(fileData)
                        values.desc_product[i].image_desc = pathImage.data
                    } else {
                        values.desc_product[i].image_desc = null
                    }
                }
                await adminApi.createProductDesc(product.id.toString(), {desc_product: values.desc_product})
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
                    {product.id && <Formik<CreateOrUpdateDescProductType>
                        initialValues={{
                            desc_product: [
                                {
                                    title: '',
                                    content: '',
                                    image_desc: '',
                                    title_image_desc: '',
                                    number_order: ''
                                }
                            ]
                        }}
                        onSubmit={(values, {resetForm}) => submitUpdate(values, resetForm)}
                    >
                        {({isSubmitting, resetForm, touched, errors, values, setFieldValue}) => {
                            return (
                                <Form>
                                    <div className={cx('wrapper-form')}>
                                        <Description product={product} touched={touched} errors={errors} values={values} setFieldValue={setFieldValue}/>
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

export default CreateOrUpdateDescription;