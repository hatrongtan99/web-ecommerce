import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";

import classNames from "classnames/bind";
import styles from "./formLayout.module.scss";
import Button from "~components/custom/button/Button";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

const cx = classNames.bind(styles);

const FormRegisterUi = () => {
    const router = useRouter();

    const [user, setUser] = useState({});

    const handleSubmitRegister = () => {};

    const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {};
    return (
        <>
            <form
                className={`offset-2 col-8 ${cx("form")}`}
                onSubmit={handleSubmitRegister}
            >
                <div className={cx("form__title")}>
                    <h2>Sign up</h2>
                    <p>Please enter your details.</p>
                </div>

                <div className={cx("form__group")}>
                    <div className={cx("form__group__input")}>
                        <label>Họ:</label>
                        <input
                            name="lastname"
                            required
                            onChange={handleUserChange}
                        />
                    </div>
                </div>

                <div className={cx("form__group")}>
                    <div className={cx("form__group__input")}>
                        <label>Tên:</label>
                        <input
                            name="firstname"
                            required
                            onChange={handleUserChange}
                        />
                    </div>
                </div>

                <div className={cx("form__group")}>
                    <div className={cx("form__group__input")}>
                        <label>Email:</label>
                        <input
                            name="email"
                            required
                            onChange={handleUserChange}
                        />
                    </div>
                </div>

                <div className={cx("form__group")}>
                    <div className={cx("form__group__input")}>
                        <label>Mật khẩu:</label>
                        <input
                            name="password"
                            required
                            onChange={handleUserChange}
                        />
                    </div>
                </div>

                <div className={cx("form__group")}>
                    <div className={cx("form__group__input")}>
                        <label>Xác nhận mật khẩu:</label>
                        <input
                            name="confirmPassword"
                            required
                            onChange={handleUserChange}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center my-4">
                    <Button style={{ width: "100%" }} type="submit">
                        Đăng ký
                    </Button>
                </div>

                <div className={cx("form__signup")}>
                    <p>
                        Đã có tài khoản?{" "}
                        <Link href="/auth/login">Đăng nhâp.</Link>
                    </p>
                </div>
            </form>
            <ToastContainer />
        </>
    );
};

export default FormRegisterUi;
