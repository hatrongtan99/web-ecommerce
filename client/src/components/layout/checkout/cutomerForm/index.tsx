import classNames from "classnames/bind";
import { ChangeEvent, useState } from "react";
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/router";

import orderApi from "~/api/order";
import Button from "~/components/custom/button";
import styles from './customerForm.module.scss';
import InputForm from "~/components/custom/inputForm";
import Spinner from "~/components/component/spinner";

const cx = classNames.bind(styles);

export interface FormSubmitProps {
    typeSex: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    userAddress: string;
    note?: string;
}

const CustomerForm = () => {
    const router = useRouter();
    const userId = router.query.userId;

    // validate form 
    const customerValidators = Yup.object({
        typeSex: Yup.string(),
        userName: Yup.string().required('*Vui lòng nhập tên!'),
        userEmail: Yup.string().email('*Email không hợp lệ').required('*Vui lòng nhập email!'),
        userPhone: Yup.string().required('*Vui lòng nhập số điện thoại!'),
        userAddress: Yup.string().required('*Vui lòng nhập địa chỉ!'),
        note: Yup.string()
    })

    // submit form to create order
    const handleSubmitForm = async (value: FormSubmitProps) => {
        try {
            const res = await orderApi.createOrderByUserId(userId as string, value);
            if (res.success) {
                router.push('/')
            }
        } catch (error) {
            console.log(error);
            alert('false')
        }
    }
    
  return (
    <div className={cx('customer-form')}>
        <div className={cx('title')}>
            <h3>THÔNG TIN KHÁCH HÀNG</h3>
        </div>
        <Formik
            initialValues={{
                typeSex: 'male',
                userName: '',
                userEmail: '',
                userPhone: '',
                userAddress: '',
                note: ''
            }}
            validationSchema={customerValidators}
            onSubmit={(value) => handleSubmitForm(value)}
        >
            {({isSubmitting}) => (
                <Form>
                    <div className={cx('checkbox')}>
                        <Field
                            component={InputForm} 
                            name='typeSex' 
                            type='radio'
                            rightLabel='Anh'
                            id='male'
                            value='male'
                        />

                        <Field
                            component={InputForm} 
                            name='typeSex' 
                            type='radio'
                            rightLabel='Chị'
                            id='female'
                            value="female"
                        />
                    </div>

                    <div className="form-group">
                        <div className='row my-3'>
                            <div className='col-6'>
                                <Field
                                    className='form-control' 
                                    component={InputForm}
                                    name='userName'
                                    placeholder='Your name' 
                                />
                            </div>
                            <div className='col-6'>
                                <Field
                                    className='form-control' 
                                    component={InputForm}
                                    name='userEmail'
                                    placeholder='Your email' 
                                />
                            </div>
                        </div>

                        <div className="col-12 my-3">
                            <Field
                                className='form-control' 
                                component={InputForm}
                                name='userPhone'
                                placeholder='Your phone' 
                            />
                        </div>

                        <div className="col-12 my-3">
                            <Field
                                className='form-control' 
                                component={InputForm}
                                name='userAddress'
                                placeholder='Your address' 
                            />
                        </div>

                        <div className="col-12 my-3">
                            <Field 
                                className='form-control'
                                as='textarea'
                                placeholder='note'
                                name='note'
                            />
                        </div>
                    </div>

                    <div className='text-center'>
                        <Button type='submit' size='md' style={{padding: '4px 20px'}}>
                            GỬI THÔNG TIN ĐẶT HÀNG
                        </Button>
                    </div>
                    {isSubmitting && <Spinner/>}
                </Form>
            )}
            
        </Formik>

    </div>
  )
}

export default CustomerForm