import classNames from "classnames/bind";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import { MdOutlineArrowDropDown } from "react-icons/md";

import styles from "./navbar.module.scss";

const cx = classNames.bind(styles);

const Navbar = () => {
  return (
    <nav className={`container-fluid ${cx("nav-wraper")}`}>
      <div className={`container ${cx("nav")}`}>
        <div className={`${cx("nav__menu")}`}>
          <BiMenu size={22} />
          <p>Danh mục sản phẩm</p>
          <MdOutlineArrowDropDown size={24} />
        </div>

        <ul className={cx("nav__list")}>
          <Link href="/page/gioi-thieu">
            <li className={cx("nav__list__item")}>Giới thiệu</li>
          </Link>

          <Link href="/tin-tuc/khuyen-mai">
            <li className={cx("nav__list__item")}>Khuyến mãi</li>
          </Link>

          <Link href="/tin-tuc/tu-van-tieu-dung">
            <li className={cx("nav__list__item")}>Tư vấn tiêu dùng</li>
          </Link>

          <Link href="/page/lien-he">
            <li className={cx("nav__list__item")}>Liên hệ báo giá</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
