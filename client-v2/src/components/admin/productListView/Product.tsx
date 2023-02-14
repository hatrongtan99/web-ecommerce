import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

import styles from "./productListView.module.scss";
import Spinner from "~components/common/spiner/Spiner";
import BackdropModal from "~components/custom/backdropModal/BackdropModal";
import useClickOutSide from "~hook/useClickOutSide";

const cx = classNames.bind(styles);

interface ProductListProps {}

const ProductList = ({}: ProductListProps) => {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // hanlde click out side
  const btnDropDownRef = useRef(null);

  useClickOutSide(btnDropDownRef, () => setActive(false));

  const hanldeViewDetal = () => {};

  const handleNavigateEditProduct = () => {};

  const handleDeleteProduct = () => {};

  return (
    <>
      <div className={`row ${cx("product-item")}`}>
        <div className={`col-1 ${cx("align-center")}`}>
          <Link href={``}>
            <Image
              src={`http://api.dienmaykimkhi.com/public/imagesV2/500x-may-khoan-van-vit-dung-pin-18v-makita-df488dwe-1-1639707151.jpg`}
              alt={""}
              width={30}
              height={30}
            />
          </Link>
        </div>

        <div className={`col-5 ${cx("align-center")}`}>
          <Link href={``}>
            <h3 style={{ fontWeight: "500", padding: "20px 0" }}>
              name products
            </h3>
          </Link>
        </div>

        <div className={`col-2 ${cx("align-center")}`}>
          <strong>{(20000).toLocaleString()} đ</strong>
        </div>

        <div className={`col-2 ${cx("align-center")}`}>
          <p>
            Hãng: <strong>{"makita"}</strong>
          </p>
        </div>
        <div
          className={cx("btn-more", "align-center")}
          onClick={() => setActive(!active)}
          ref={btnDropDownRef}
        >
          <BsThreeDots color="#999" />
        </div>
        {active && (
          <ul className={cx("dropdown")}>
            <li onClick={() => hanldeViewDetal()}>Xem chi tiết</li>
            <li onClick={() => handleNavigateEditProduct()}>Chỉnh sửa</li>
            <li
              data-bs-toggle="modal"
              data-bs-target={`#deletePeoduct${1}`}
              style={{ color: "#f40052 " }}
            >
              Xóa
            </li>
          </ul>
        )}
        <BackdropModal
          body="Chắc chắn xóa sản phẩm này"
          id={`deletePeoduct${1}`}
          titleDismiss="Hủy"
          titleAgree="Xóa"
          handleAgree={() => handleDeleteProduct()}
        />
      </div>
    </>
  );
};

export default ProductList;
