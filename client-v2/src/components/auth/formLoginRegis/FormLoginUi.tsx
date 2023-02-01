import classNames from "classnames/bind";
import { useState, useContext, ChangeEvent, MouseEvent } from "react";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import notify from "~utils/toastify";
import { AuthContext } from "~context/AuthProvider";
import google from "../../../../public/image/google.png";
import styles from "./formLayout.module.scss";
import { userLoginByGoogle, userLoginLocal } from "~api/user.api";
import axiosClient from "~api/axiosConfig";
import Button from "~components/custom/button/Button";
import { setStorage } from "~utils/storage";

const cx = classNames.bind(styles);

const FormLoginUi = () => {
  const router = useRouter();
  const { setAuth, persirt, setPersirt, redirect, auth } =
    useContext(AuthContext);

  const hanldeLoginSocial = async (type: "google" | "facebook") => {
    if (type == "google") {
      window.open("http://localhost:5000/v2/api/users/google", "_self");
    }
  };

  const handleLoginLocal = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await userLoginLocal(axiosClient, user);
      if (res.success) {
        setAuth(res);
        setStorage("token", res.token, "sessionStorage");
        router.push("/may-khoan-pin");
      }
    } catch (error: any) {
      notify("error", error.response?.data?.message);
    }
  };

  // input change
  const [user, setUser] = useState({ email: "", password: "" });

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  return (
    <>
      <form
        className={`offset-2 col-8 ${cx("form")}`}
        onSubmit={handleLoginLocal}
      >
        <div className={cx("form__title")}>
          <h2>Welcome back</h2>
          <p>Please enter your details.</p>
        </div>

        {/* btn login with google */}
        <div className={cx("form__group")}>
          <div className={cx("form__btn-social")}>
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                hanldeLoginSocial("google");
              }}
              type="button"
            >
              <Image src={google} alt="google suport" width={28} height={28} />
              Login with Google
            </button>
          </div>
        </div>

        <div className={cx("form__separate")}>
          <span className={cx("separate")}></span>
          <p>or</p>
          <span className={cx("separate")}></span>
        </div>

        <div className={cx("form__group")}>
          <div className={cx("form__group__input")}>
            <label>Email:</label>
            <input name="email" required onChange={handleUserChange} />
          </div>
        </div>

        <div className={cx("form__group")}>
          <div
            className={cx("form__group__input")}
            style={{ marginBottom: "16px" }}
          >
            <label>Password:</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleUserChange}
            />
          </div>
        </div>

        <div className={cx("form__option")}>
          <div className={cx("form__option__item")}>
            <input
              id="persirt"
              type="checkbox"
              checked={persirt}
              onChange={() => setPersirt(!persirt)}
            />
            <label htmlFor="persirt">Lưu tài khoản trong 30 ngày</label>
          </div>

          <div className={cx("form__option__item")}>
            <Link href="/auth/forgot">Quên mật khẩu</Link>
          </div>
        </div>

        <div className="d-flex justify-content-center my-4">
          <Button style={{ width: "100%" }} type="submit">
            Đăng nhập
          </Button>
        </div>

        <div className={cx("form__signup")}>
          <p>
            Chưa có Tài Khoản? <Link href="/auth/register">Đăng ký.</Link>
          </p>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default FormLoginUi;
