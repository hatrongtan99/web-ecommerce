import classNames from "classnames/bind";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "~context/AuthProvider";
import styles from "./mainLayout.module.scss";
import SearchInput from "./SearchInput";
import Button from "~components/custom/button/Button";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import { loginSuccess } from "~api/user.api";

const cx = classNames.bind(styles);

const Header = () => {
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const { auth, setRedirect, redirect, setAuth } = useContext(AuthContext);
  const [isLoadUser, setIsLoadUser] = useState(true);

  const handleClickCartIcon = () => {
    if (!auth || !auth.token) {
      setRedirect({ pathname: router.pathname, query: router.query });
      router.push("/auth/login");
    } else {
      router.push(redirect);
    }
  };

  const handleAuth = (type: "login" | "register") => {
    if (type == "register") {
      router.push("/auth/register");
    } else {
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    (async function () {
      setIsLoadUser(true);
      try {
        const res = await loginSuccess(axiosPrivate);
        if (res.success) {
          setAuth(res);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoadUser(false);
    })();
  }, [axiosPrivate]);

  return (
    <header className={`container-fluid ${cx("header-wrapper")}`}>
      <div className={`${cx("header")}`}>
        <div className={`col-3 ${cx("header__logo")}`}>logo</div>

        {/* search */}
        <div className={`col-3 ${cx("header__search")}`}>
          <SearchInput />
        </div>

        {/* cart */}
        <div
          className={`col-2 ${cx("header__cart")}`}
          onClick={handleClickCartIcon}
        >
          <BsFillCartCheckFill size={24} color="#fff" />

          <div className={cx("header__cart__count")}>
            <span>2</span>
          </div>
        </div>

        <div className={`col-2 ${cx("header__product-review")}`}>
          <Button
            rightIcon={<MdOutlineArrowDropDown />}
            size="sm"
            variant="primary-border"
          >
            Sản phẩm đã xem
          </Button>
        </div>
        <div className={`col-2 ${cx("header__user")}`}>
          {isLoadUser ? null : !auth?.token ? (
            <div className={cx("header__user__auth")}>
              <p onClick={() => handleAuth("register")}>Đăng ký</p>
              <span></span>
              <p onClick={() => handleAuth("login")}>Đăng nhập</p>
            </div>
          ) : (
            <div className={cx("header__user__info")}>userinfo</div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
