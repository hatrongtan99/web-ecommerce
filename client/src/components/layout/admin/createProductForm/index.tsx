import classNames from "classnames/bind";
import {ChangeEvent, useEffect, useState} from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {ToastContainer, toast} from 'react-toastify';

import styles from './createProductForm.module.scss';
import InputForm from "~/components/custom/inputForm";
import Button from '~/components/custom/button';
import SelectForm from "~/components/custom/selectForm";
import adminApi from "~/api/admin";
import FormSelectProductCategory from "./formSelectProductCategory";
import FormSelectProductBrands from "./FormSelectProductBrands";
import { AxiosError } from "axios";
import { Response } from "~/types/index";
import { notifyError, notifySuccess } from "~/utils/toastify";
import Spinner from "~/components/component/spinner";

const cx = classNames.bind(styles);

const createProductValidates = Yup.object({
    productName: Yup.string().required('*Vui lòng nhập tên sản phẩm'),
    productPrice: Yup.number().required('*Vui lòng nhập giá sản phẩm'),
    productCategoryId: Yup.string().required('*Vui lòng chọn loại hàng'),
    productBrandId: Yup.string().required('*Vui lòng chọn hãng sản phẩm'),
    image: Yup.mixed().required('*Vui lòng chọn ảnh nền cho sản phẩm'),
    images: Yup.mixed().required('*Vui lòng chọn thêm ảnh mô tả cho sản phẩm'),
    discount: Yup.number().default(0),
    quantity: Yup.number().required('*Vui lòng nhập số lượng'),
    sku: Yup.string(),
    insurance: Yup.string()
})

interface HandleInputProps {
    e: ChangeEvent<HTMLInputElement>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

const CreateProductForm = () => {
    const [image, setImage] = useState<string>('');
    const [images, setImages] = useState<string[]>([]);

    const hanldleSingleImage = ({e, setFieldValue}: HandleInputProps) => {
        if (e.currentTarget.files){
            setFieldValue('image', e.currentTarget.files[0]);
            const url = URL.createObjectURL(e.currentTarget.files[0]);
            setImage(url)
        }
    }

    const handleMultipleImage = ({e, setFieldValue}: HandleInputProps) => {
        const files = e.currentTarget.files
        if (files) {
            const result = []
            setFieldValue('images', files);
            for (let i = 0; i < files.length; i++) {
                result.push(URL.createObjectURL(files[i]));
            }
            setImages(result)
        }
    }

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image);

            for (let i = 0; i < images.length; i++) {
                URL.revokeObjectURL(images[i])
            }
        }
    }, [image, images])

  return (
    <div className='offset-2'>
        <h1 className={cx("title")}>Thêm mới sản phẩm</h1>
        <div className={cx('wrapper')}>
            <Formik
                initialValues={{
                    productName: '',
                    productPrice: '',
                    productCategoryId: '',
                    productBrandId: '',
                    image: '',
                    images: '',
                    discount: '',
                    quantity: '',
                    sku: '',
                    insurance: ''
                }}
                validationSchema={createProductValidates}

                onSubmit={async (values) => {
                    const formDataSingleImage = new FormData();
                    const formDataMultipleImage = new FormData();

                    if (values.image && values.images.length > 0) {
                        formDataSingleImage.append('image', values.image);

                        for (let i = 0; i < values.images.length; i++) {
                            formDataMultipleImage.append('images', values.images[i])
                        }
                    }
                    try {
                        const [singleImage, multipleImage] = await Promise.all([adminApi.uploadSingleImage(formDataSingleImage), adminApi.uploadMultipleImages(formDataMultipleImage)])
                        if (singleImage.success && multipleImage.success) {
                            const {image, images, ...rest} = values
                            const params = {
                                ...rest,
                                productThumb: singleImage.data,
                                images: multipleImage.data,
                                productCategoryId: Number(rest.productCategoryId),
                                productBrandId: Number(rest.productBrandId)
                            }
                            const createNewProduct = await adminApi.createProduct(params);
                            notifySuccess(createNewProduct.message)
                        }
                    } catch (error) {
                        console.log(error)
                        const err = error as AxiosError
                        const data = err.response?.data as Response
                        notifyError(data.message)
                    }
                }}
            > 
            {({setFieldValue, errors, touched, isSubmitting}) => (
                <Form encType="multipart/form-data">
                    <div className={cx('form-group')}>
                        <Field 
                            component={InputForm} 
                            name='productName' 
                            leftlabel='Tên sản phẩm:' 
                            className='form-control'
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <div className='d-flex'>
                            <label>Ảnh nền:</label>
                            <input 
                                name='image'
                                type='file' 
                                className='form-control' 
                                onChange={(e: ChangeEvent<HTMLInputElement>) => hanldleSingleImage({e, setFieldValue})}
                            />
                        </div>
                        {touched.image && errors.image && <div className='mt-1' style={{color: 'red', fontSize: '0.8rem'}}>{errors.image as string}</div> }
                    </div>
                    {image && <img src={image} height='auto' width='200'/>}

                    <div className={cx('form-group')}>
                        <div className='d-flex'>
                            <label>Ảnh mô tả:</label>
                            <input
                                name='images'
                                type='file'
                                className='form-control'
                                multiple
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleMultipleImage({e, setFieldValue})}
                            />
                        </div>
                        {touched.images && errors.images && <div className='mt-1' style={{color: 'red', fontSize: '0.8rem'}}>{errors.images as string}</div> }
                    </div>
                    {images.map((image, index) => (
                        <img src={image} key={index} height='auto' width='200'/>
                    ))}

                    <div className={cx('form-group')}>
                        <FormSelectProductCategory/>
                    </div>

                    <div className={cx('form-group')}>
                        <FormSelectProductBrands/>
                    </div>

                    <div className={cx('form-group')}>
                        <Field 
                            component={InputForm} 
                            name='productPrice' 
                            leftlabel='Giá sản phẩm:' 
                            className='form-control'
                            type='number'
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <Field 
                            component={InputForm} 
                            name='discount' 
                            leftlabel='Khuyến mãi:' 
                            className='form-control'
                            type='number'
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <Field 
                            component={InputForm} 
                            name='quantity' 
                            leftlabel='Số lượng có sẵn:' 
                            className='form-control'
                            type='number'
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <Field 
                            component={InputForm} 
                            name='sku' 
                            leftlabel='Mã hàng:' 
                            className='form-control'
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <Field 
                            component={InputForm} 
                            name='insurance' 
                            leftlabel='Bảo hành:' 
                            className='form-control'
                        />
                    </div>

                    <Button variant="secondary" style={{float: 'right'}} type='submit'>Lưu</Button>
                    {isSubmitting && <Spinner/>}
                </Form>
            )}
            </Formik>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default CreateProductForm