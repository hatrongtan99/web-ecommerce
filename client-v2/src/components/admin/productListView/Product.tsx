import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";

import styles from "./productListView.module.scss";
import Spinner from "~components/common/spiner/Spiner";
import BackdropModal from "~components/custom/backdropModal/BackdropModal";
import useClickOutSide from "~hook/useClickOutSide";

const cx = classNames.bind(styles);

interface ProductListProps {
  data: any;
}

const ProductList = ({ data }: ProductListProps) => {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // hanlde click out side
  const btnDropDownRef = useRef(null);

  useClickOutSide(btnDropDownRef, () => setActive(false));

  const handleDeleteProduct = () => {};

  return (
    <div className="col-3 g-2">
      <div className={cx("product-item")}>
        <Link href={``} className={cx("product-item__img")}>
          <Image src={data.images[0]} alt={""} fill sizes="auto" />
        </Link>

        <div className={cx("product-item__title")}>
          <Link href={``}>
            <span>{data.name_product}</span>
          </Link>
        </div>

        <div className={cx("product-item__price")}>
          <strong>{data.price.toLocaleString()}đ</strong>
        </div>

        <div className={cx("product-item__brand")}>
          <p>
            Hãng: <Link href={""}>{data.brand.brand_name}</Link>
          </p>
        </div>

        <div
          className={`d-flex justify-content-center align-items-center ${cx(
            "btn-more"
          )}`}
          onClick={() => setActive(!active)}
        >
          <BsThreeDots color="#999" />
        </div>
        {active && (
          <ul className={cx("dropdown")} ref={btnDropDownRef}>
            <li
              onClick={() => {
                router.push(`/admin/products/update/${data.slug}`);
                console.log("runn");
              }}
            >
              Chỉnh sửa
            </li>
            <li
              data-bs-toggle="modal"
              data-bs-target={`#deletePeoduct${data._id}`}
              style={{ color: "#f40052 " }}
            >
              Xóa
            </li>
          </ul>
        )}
        <BackdropModal
          body="Chắc chắn xóa sản phẩm này"
          id={`deletePeoduct${data._id}`}
          titleDismiss="Hủy"
          titleAgree="Xóa"
          handleAgree={() => handleDeleteProduct()}
        />
      </div>
    </div>
  );
};

export default ProductList;
