import classNames from "classnames/bind";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, MutableRefObject } from "react";

import styles from "./mainLayout.module.scss";
import SearchInput from "./SearchInput";
import Button from "~components/custom/button/Button";
import { loginSuccess } from "~api/user.api";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { getCartUser } from "~api/cart.api";
import { logout } from "~api/user.api";
import PropoverCart from "./PropoverCart";
import useAuth from "~hook/useAuth";
import Image from "next/image";
import Link from "next/link";

const cx = classNames.bind(styles);

const Header = () => {
    const router = useRouter();
    const axiosPrivate = useAxiosPrivate();
    const { auth, setRedirect, setAuth } = useAuth();

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
        logout(axiosPrivate)
            .then((data) => {
                if (data.data.success) {
                    setAuth(null);
                }
                router.push("/");
            })
            .catch((err) => console.log(err));
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
        isSuccess && cartUser.data.cart
            ? cartUser.data.cart.products.length
            : 0;

    // icon cart
    const refPopuser = useRef<HTMLDivElement | null>(null);
    const refPopCart = useRef<HTMLDivElement | null>(null);

    const hanldeMouseMoveIcon = (
        event: "onMove" | "onLeave",
        ref: MutableRefObject<HTMLDivElement | null>
    ) => {
        if (ref && ref.current) {
            if (event === "onMove") {
                ref.current.classList.add(cx("pop__show"));
            } else {
                ref.current.classList.remove(cx("pop__show"));
            }
        }
    };

    return (
        <header className={`container-fluid ${cx("header-wrapper")}`}>
            <div className={`${cx("header")}`}>
                <div className={`col-3 ${cx("header__logo")}`}>
                    <h2
                        onClick={() =>
                            router.push("/", undefined, { shallow: false })
                        }
                    >
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
                    onMouseMove={() =>
                        hanldeMouseMoveIcon("onMove", refPopCart)
                    }
                    onMouseLeave={() =>
                        hanldeMouseMoveIcon("onLeave", refPopCart)
                    }
                >
                    <BsFillCartCheckFill
                        size={24}
                        color="#fff"
                        onClick={handleClickCartIcon}
                    />

                    <div className={cx("header__cart__count")}>
                        <span>{item}</span>
                    </div>

                    <PropoverCart data={cartUser?.data.cart} ref={refPopCart} />
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
                        <div className="d-flex">
                            <div
                                className={cx("header__user__info")}
                                onMouseMove={() =>
                                    hanldeMouseMoveIcon("onMove", refPopuser)
                                }
                                onMouseLeave={() =>
                                    hanldeMouseMoveIcon("onLeave", refPopuser)
                                }
                            >
                                <div
                                    className={cx("user-box")}
                                    onClick={() =>
                                        router.push("/users/profile")
                                    }
                                >
                                    <div className={cx("avatar")}>
                                        <Image
                                            alt="avatar"
                                            src={auth.user.avatar.url}
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                    <p>{auth.user.user_name}</p>
                                </div>
                                <div
                                    className={cx("pop-user")}
                                    ref={refPopuser}
                                >
                                    <Link href={"/users/profile"}>
                                        Tài Khoản của tôi
                                    </Link>
                                    <Link href={"/users/puchase"}>
                                        Đơn Hàng
                                    </Link>
                                    <p onClick={handleLogout}>Đăng xuất</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={cx("header__user__auth")}>
                            <p onClick={() => handleRedirect("register")}>
                                Đăng ký
                            </p>
                            <span></span>
                            <p onClick={() => handleRedirect("login")}>
                                Đăng nhập
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
