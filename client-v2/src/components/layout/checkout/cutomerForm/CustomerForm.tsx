import classNames from 'classnames/bind';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';

import styles from './customerForm.module.scss';
import InputForm from '~components/custom/inputForm/InputForm';
import Button from '~components/custom/button/Button';
import Spinner from '~components/common/spiner/Spiner';
import useAxiosPrivate from '~hook/useAxiosPrivate';
import { createOrder } from '~api/order.api';
import { CreateOrderForm } from '~types/order.type';

const cx = classNames.bind(styles);

const CustomerForm = () => {
    const axiosPrivate = useAxiosPrivate();

    // validate form
    const customerValidators = Yup.object({
        sex: Yup.string(),
        // userName: Yup.string().required('*Vui lòng nhập tên!'),
        // email: Yup.string()
        //     .email('*Email không hợp lệ')
        //     .required('*Vui lòng nhập email!'),
        phoneNumber: Yup.string().required('*Vui lòng nhập số điện thoại!'),
        address: Yup.string().required('*Vui lòng nhập địa chỉ!'),
        note: Yup.string(),
    });

    // submit form to create order
    const handleSubmitForm = async (value: CreateOrderForm) => {
        try {
            const order = await createOrder(axiosPrivate, value);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('customer-form')}>
            <div className={cx('title')}>
                <h3>THÔNG TIN KHÁCH HÀNG</h3>
            </div>
            <Formik
                initialValues={{
                    sex: 'male',
                    phoneNumber: '',
                    address: '',
                    note: '',
                }}
                validationSchema={customerValidators}
                onSubmit={(value) => handleSubmitForm(value)}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className={cx('checkbox')}>
                            <Field
                                component={InputForm}
                                name="sex"
                                type="radio"
                                rightLabel="Anh"
                                id="male"
                                value="male"
                            />

                            <Field
                                component={InputForm}
                                name="sex"
                                type="radio"
                                rightLabel="Chị"
                                id="female"
                                value="female"
                            />
                        </div>

                        <div className="form-group">
                            {/* <div className="row my-3">
                                <div className="col-6">
                                    <Field
                                        className="form-control"
                                        component={InputForm}
                                        name="userName"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="col-6">
                                    <Field
                                        className="form-control"
                                        component={InputForm}
                                        name="userEmail"
                                        placeholder="Your email"
                                    />
                                </div>
                            </div> */}

                            <div className="col-12 my-3">
                                <Field
                                    className="form-control"
                                    component={InputForm}
                                    name="phoneNumber"
                                    type="number"
                                    placeholder="Your phone"
                                />
                            </div>

                            <div className="col-12 my-3">
                                <Field
                                    className="form-control"
                                    component={InputForm}
                                    name="address"
                                    placeholder="Your address"
                                />
                            </div>

                            <div className="col-12 my-3">
                                <Field
                                    className="form-control"
                                    as="textarea"
                                    placeholder="note"
                                    name="note"
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <Button
                                type="submit"
                                size="md"
                                style={{ padding: '4px 20px' }}
                            >
                                GỬI THÔNG TIN ĐẶT HÀNG
                            </Button>
                        </div>
                        {isSubmitting && <Spinner />}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CustomerForm;
