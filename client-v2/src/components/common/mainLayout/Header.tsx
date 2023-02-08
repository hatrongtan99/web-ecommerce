import classNames from "classnames/bind";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";

import { AuthContext } from "~context/AuthProvider";
import styles from "./mainLayout.module.scss";
import SearchInput from "./SearchInput";
import Button from "~components/custom/button/Button";
import { loginSuccess } from "~api/user.api";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { getCartUser } from "~api/cart.api";
import { logout } from "~api/user.api";

const cx = classNames.bind(styles);

const Header = () => {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const { auth, setRedirect, setAuth } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  const handleClickCartIcon = () => {
    if (!auth || !auth.token) {
      setRedirect({ pathname: router.pathname, query: router.query });
      router.push("/auth/login");
    } else {
      router.push(`/checkout/${auth.user._id}`);
    }
  };

  const handleRedirect = (type: "login" | "register") => {
    if (type == "register") {
      router.push("/auth/register");
    } else {
      router.push("/auth/login");
    }
  };

  const handleLogout = async () => {
    logout(axiosPrivate).then((data) => {
      if (data.data.success) {
        setAuth(null);
      }
    });
  };

  useEffect(() => {
    if (auth && auth.token) {
      setIsLoading(false);
      return;
    }
    (async function () {
      try {
        const res = await loginSuccess(axiosPrivate);
        if (res.data?.success && res.data?.token) {
          setAuth(res.data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    })();
  }, [auth]);

  // cart user
  const { data: cartUser, isSuccess } = useQuery(
    ["cart-user", auth?.user._id],
    () => getCartUser(axiosPrivate),
    {
      refetchOnWindowFocus: false,
      enabled: auth !== null,
    }
  );

  const item =
    isSuccess && cartUser.data.cart ? cartUser.data.cart.products.length : 0;

  return (
    <header className={`container-fluid ${cx("header-wrapper")}`}>
      <div className={`${cx("header")}`}>
        <div className={`col-3 ${cx("header__logo")}`}>
          <h2 onClick={() => router.push("/", undefined, { shallow: false })}>
            dienmaykimkhi
          </h2>
        </div>

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
            <span>{item}</span>
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
          {isLoading ? null : auth && auth.token ? (
            <div className={cx("header__user__info")}>
              <p>userInfo</p>-<p onClick={handleLogout}>logout</p>
            </div>
          ) : (
            <div className={cx("header__user__auth")}>
              <p onClick={() => handleRedirect("register")}>Đăng ký</p>
              <span></span>
              <p onClick={() => handleRedirect("login")}>Đăng nhập</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
