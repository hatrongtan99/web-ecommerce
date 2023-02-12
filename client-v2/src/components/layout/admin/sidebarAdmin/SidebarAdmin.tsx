import classNames from "classnames/bind";
import Link from "next/link";
import { ReactNode, useState, useRef } from "react";
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

const cx = classNames.bind(styles);

const sidebarBody = [
  {
    hasChild: false,
    label: "Doanh số",
    child: [],
    path: "doanh-so",
    icon: <FcSalesPerformance size={30} color="#fff" />,
  },
  {
    hasChild: true,
    label: "Sản phẩm",
    child: [
      {
        icon: <GrAddCircle />,
        label: "Thêm sản phẩm",
        path: "them-san-pham",
      },
      {
        icon: <BsCircle />,
        label: "Tất cả sản phẩm",
        path: "products",
      },
      {
        icon: <BsCircle />,
        label: "Categories",
        path: "categories",
      },
      {
        icon: <BsCircle />,
        label: "Hãng",
        path: "brands",
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
        path: "/",
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
  const [resizeSidebar, setResizeNavbar] = useState(false);
  const [itemActive, setItemActive] = useState<number[]>([]);

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
    if (itemActive.includes(index)) {
      setItemActive([...itemActive.filter((num) => num !== index)]);
    } else {
      setItemActive([...itemActive, index]);
    }
  };

  return (
    <main className="main-content">
      <div className="d-flex">
        <div
          className={cx("side-container", {
            resize: resizeSidebar,
          })}
        >
          <div className={cx("sidebar-top")}>
            <Link href={`/admin`} legacyBehavior>
              <a className={cx("sidebar-top__link", { resize: resizeSidebar })}>
                <Image src={adminLogo} alt="admin logo" />
                <span>Admin dashboard</span>
              </a>
            </Link>
            <div className={cx("sidebar-top__info", { resize: resizeSidebar })}>
              <div className={cx("sidebar-top__info__avatar")}>
                <Image
                  src={auth?.user.avatar.url!}
                  alt="avatar user"
                  width={45}
                  height={45}
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
                  className={cx(
                    "body-item",
                    { resize: resizeSidebar },
                    { active: itemActive.includes(index) }
                  )}
                  onClick={(e) => handleSetItemActive(index)}
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
                    <div className={cx("body-item__main")}>
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
                        <li className={cx("body-item__child__link")}>
                          <Link href={child.path} key={index}>
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

        <div className={cx("content")}>
          <header className={cx("header")}>
            <div className={cx("header__nav")}>
              <AiOutlineMenu
                size={20}
                className={cx("header__nav__menu")}
                onClick={() => setResizeNavbar(!resizeSidebar)}
              />
              <Link href={"/"}>Home</Link>
            </div>

            <div className={cx("header__nav")}>
              <p onClick={() => router.reload()}>
                Reload <TfiReload />
              </p>
              <p onClick={handleLogout}>Đăng xuất</p>
            </div>
          </header>
          <div>{children}</div>
        </div>
      </div>
    </main>
  );
};

export default SidebarAdmin;
