import Link from "next/link";
import classNames from "classnames/bind";

import styles from "./mainLayout.module.scss";

const cx = classNames.bind(styles);

const listGroups = [
  {
    titleGroup: "GIỚI THIỆU",
    listLink: [
      {
        display: "Giới thiệu Công Ty",
        path: "/",
      },
      {
        display: "Hướng dẫn mua hàng & Thanh toán",
        path: "/",
      },
      {
        display: "Chính sách vận chuyển",
        path: "/",
      },
      {
        display: "Bản đồ chỉ đường đi đến THB Việt Nam",
        path: "/",
      },
      {
        display: "Liên hệ",
        path: "/",
      },
    ],
  },
  {
    titleGroup: "CHÍNH SÁCH",
    listLink: [
      {
        display: "Quy định sử dụng",
        path: "/",
      },
      {
        display: "Chính sách bảo hành",
        path: "/",
      },
      {
        display: "Chính sách bảo mật thông tin",
        path: "/",
      },
      {
        display: "Chính sách đổi trả hàng",
        path: "/",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer id="footer">
      <section className={`container ${cx("footer-wrapper")}`}>
        <div className="row">
          <div className="col-3">
            <h3 className={cx("title-group")}>VỀ CHÚNG TÔI</h3>
            <ul className={cx("list-group")}>
              <li>Công ty CP công nghệ THB Việt Nam</li>
              <li>Giấy phép đăng ký kinh doanh số</li>
              <li>0105848319 do sở KHĐT TP Hà Nội cấp ngày 09/04/2012</li>
              <li>Website:</li>
              <li>Đã đăng ký với Bộ Công Thương</li>
            </ul>
          </div>

          {listGroups.map((listGroup, index) => (
            <div className="col-3" key={index}>
              <h3 className={cx("title-group")}>{listGroup.titleGroup}</h3>
              <ul className={cx("list-group")}>
                {listGroup.listLink.map((link, index) => (
                  <li key={index}>
                    <Link href={link.path}>{link.display}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-3">
            <h3 className={cx("title-group")}>DANH SÁCH CỬA HÀNG</h3>
            <ul className={cx("list-group")}>
              <li>CÔNG TY ...</li>
              <li></li>
            </ul>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
