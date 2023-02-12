import { ReactNode } from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineProfile, AiOutlineUser } from "react-icons/ai";

import useAuth from "~hook/useAuth";
import styles from "./sidebar.module.scss";
import Link from "next/link";

const cx = classNames.bind(styles);

const body = [
  {
    label: "Tài khoản của tôi",
    icon: <AiOutlineUser color="#225eb9" size={25} />,
    path: "/users/profile",
  },
  {
    label: "Đơn mua",
    icon: <AiOutlineProfile color="#225eb9" size={25} />,
    path: "/users/puchase",
  },
];

const Sidebar = ({ children }: { children: ReactNode }) => {
  const { auth } = useAuth();
  const router = useRouter();
  return (
    <main className="main-content">
      <div className="container">
        <div className="row">
          <div className={`col-3 ${cx("side-bar")}`}>
            <div className={cx("side-bar__top")}>
              <div className={cx("avatar")}>
                <Image alt="avatar" src={auth?.user.avatar.url!} fill />
              </div>
              <p className={cx("name")}>{auth?.user.user_name}</p>
            </div>

            <div className={cx("side-bar__body")}>
              {body.map((i, index) => (
                <Link
                  href={i.path}
                  className={cx("item", { active: router.pathname === i.path })}
                  key={index}
                >
                  {i.icon}
                  <p className={cx("item__label")}>{i.label}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className={`col-9 `}>{children}</div>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
