import classNames from "classnames/bind";
import Link from "next/link";
import { ReactNode, useRef } from "react";
import { useRouter } from "next/router";

import { FcSalesPerformance } from "react-icons/fc";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { TfiReload } from "react-icons/tfi";
import { BiChevronLeft } from "react-icons/bi";
import { FaProductHunt } from "react-icons/fa";
import { BsCircle } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";

import { logout } from "~api/user.api";
import useAuth from "~hook/useAuth";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import adminLogo from "../../../../../public/image/adminLogo.webp";
import styles from "./sidebarAdmin.module.scss";
import Image from "next/image";
import useSidebar from "~hook/useSidebarAdmin";
import { IoIosArrowBack } from "react-icons/io";

const cx = classNames.bind(styles);

const sidebarBody = [
  {
    hasChild: false,
    label: "Doanh số",
    child: [],
    path: "/admin/doanh-so",
    icon: <FcSalesPerformance size={30} color="#fff" />,
  },
  {
    hasChild: true,
    label: "Sản phẩm",
    child: [
      {
        icon: <GrAddCircle />,
        label: "Thêm sản phẩm",
        path: "/admin/products/add",
      },
      {
        icon: <BsCircle />,
        label: "Tất cả sản phẩm",
        path: "/admin/products/list-product",
      },
      {
        icon: <BsCircle />,
        label: "Categories",
        path: "/admin/products/categories",
      },
      {
        icon: <BsCircle />,
        label: "Hãng",
        path: "/admin/products/brands",
      },
    ],
    path: "",
    icon: <FaProductHunt size={30} color="#fff" />,
  },
  {
    hasChild: true,
    label: "Orders",
    child: [
      {
        icon: <BsCircle />,
        label: "Đơn đặt hàng",
        path: "/admin/orders",
      },
    ],
    path: "",
    icon: <AiOutlineShoppingCart size={30} color="#fff" />,
  },
];

const SidebarAdmin = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const { setAuth, auth } = useAuth();
  const { itemsOpen, resizeSidebar, setItemsOpen, setResizeNavbar } =
    useSidebar()!;

  const refSidebar = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    logout(axiosPrivate)
      .then((data) => {
        if (data.data.success) {
          setAuth(null);
        }
        router.replace("/");
      })
      .catch((err) => console.log(err));
  };

  const handleSetItemActive = (index: number) => {
    if (itemsOpen.includes(index)) {
      setItemsOpen([...itemsOpen.filter((num) => num !== index)]);
    } else {
      setItemsOpen([...itemsOpen, index]);
    }
  };

  return (
    <main className="main-content">
      <div className="d-flex">
        <div
          className={cx("side-container", {
            resize: resizeSidebar,
          })}
          ref={refSidebar}
        >
          <div className={cx("sidebar-top")}>
            <Link href={`/admin`} legacyBehavior>
              <a className={cx("sidebar-top__link")}>
                <Image src={adminLogo} alt="admin logo" />
                <span>Admin dashboard</span>
              </a>
            </Link>
            <div className={cx("sidebar-top__info")}>
              <div className={cx("sidebar-top__info__avatar")}>
                <Image
                  src={auth?.user.avatar.url!}
                  alt="avatar user"
                  fill
                  sizes="auto"
                />
              </div>
              <span>{auth?.user.user_name}</span>
            </div>
          </div>

          <ul className={cx("sidebar-body")}>
            {sidebarBody.map((item, index) => {
              return (
                <li
                  key={index}
                  className={cx("body-item", {
                    "menu-open": itemsOpen.includes(index),
                    active:
                      router.pathname == item.path ||
                      item.child.some((child) =>
                        router.asPath.startsWith(child.path)
                      ),
                  })}
                >
                  {!item.hasChild ? (
                    <Link href={item.path} className={cx("body-item__main")}>
                      <span className={cx("body-item__icon-l")}>
                        {item.icon}
                      </span>
                      <span className={cx("body-item__label")}>
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <div
                      className={cx("body-item__main")}
                      onClick={(e) => handleSetItemActive(index)}
                    >
                      <span className={cx("body-item__icon-l")}>
                        {item.icon}
                      </span>
                      <span className={cx("body-item__label")}>
                        {item.label}
                      </span>
                      {item.hasChild ? (
                        <span className={cx("body-item__icon-r")}>
                          <BiChevronLeft size={26} />
                        </span>
                      ) : null}
                    </div>
                  )}
                  {item.hasChild && (
                    <ul className={cx("body-item__child")}>
                      {item.child.map((child, index) => (
                        <li
                          className={cx("body-item__child__link", {
                            active: router.asPath.startsWith(child.path),
                          })}
                          key={index}
                        >
                          <Link href={child.path}>
                            <span
                              className={cx("body-item__child__link__icon")}
                            >
                              {child.icon}
                            </span>
                            <span
                              className={cx("body-item__child__link__label")}
                            >
                              {child.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <main className={cx("content")}>
          <header className={cx("header")}>
            <div className={cx("header__nav")}>
              <AiOutlineMenu
                size={20}
                className={cx("header__nav__menu")}
                onClick={() => setResizeNavbar(!resizeSidebar)}
              />
              <Link href={"/"}>Home</Link>
              <p onClick={() => router.back()}>
                <IoIosArrowBack size={20} /> Back
              </p>
            </div>

            <div className={cx("header__nav")}>
              <p onClick={() => router.reload()}>
                Reload <TfiReload />
              </p>
              <p onClick={handleLogout}>Đăng xuất</p>
            </div>
          </header>

          {children}
        </main>
      </div>
    </main>
  );
};

export default SidebarAdmin;
