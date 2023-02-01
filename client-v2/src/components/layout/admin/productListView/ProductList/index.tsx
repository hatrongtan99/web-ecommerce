import { useRef, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import { BsThreeDots } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import { AxiosError } from "axios";
import Link from "next/link";

import styles from "../../productListView/productListView.module.scss";
import Spinner from "~components/common/spiner/Spiner";

const cx = classNames.bind(styles);

interface ListProductProps {}

const ProductList = () => {
  const [active, setActive] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const hanldeDropDown = (productId: number) => {
    if (!active) {
      setActive(productId);
    } else if (active !== productId) {
      setActive(productId);
    } else {
      setActive(null);
    }
  };

  // hanlde click out side
  const ulRef = useRef(null);
  const handleClickOutSide = () => {
    setActive(null);
  };

  return (
    <>
      {/* {products.map((product) => (
        <div className={`row ${cx("product-item")}`} key={product.id}>
          <div className={`col-1 ${cx("align-center")}`}>
            <Link href={`/${product.categorySlug}/${product.slug}`}>
              <img
                src={`${process.env.NEXT_PUBLIC_DB_HOST}/public/images/${product.productThumb}`}
                alt={product.productName}
              />
            </Link>
          </div>

          <div className={`col-5 ${cx("align-center")}`}>
            <Link href={`/${product.categorySlug}/${product.slug}`}>
              <h3 style={{ fontWeight: "500", padding: "20px 0" }}>
                {product.productName}
              </h3>
            </Link>
          </div>

          <div className={`col-2 ${cx("align-center")}`}>
            <strong>{product.price.toLocaleString()} vnđ</strong>
          </div>

          <div className={`col-2 ${cx("align-center")}`}>
            <p>
              Hãng: <strong>{product.brandName}</strong>
            </p>
          </div>
          <div
            className={cx("btn-more", "align-center")}
            onClick={() => hanldeDropDown(product.id)}
          >
            <BsThreeDots color="#999" />
          </div>
          {active == product.id && (
            <ul className={cx("dropdown")} ref={ulRef}>
              <li onClick={() => hanldeViewDetal(product)}>Xem chi tiết</li>
              <li onClick={() => handleNavigateEditProduct(product)}>
                Chỉnh sửa
              </li>
              <li
                data-bs-toggle="modal"
                data-bs-target={`#deletePeoduct${product.id}`}
                style={{ color: "#f40052 " }}
              >
                Xóa
              </li>
            </ul>
          )}
          <ModalPromt
            content="Chắc chắn xóa sản phẩm này"
            id={`deletePeoduct${product.id}`}
            buttonTitle="Delete"
            handle={() => handleDeleteProduct(product.categorySlug, product.id)}
          />
        </div>
      ))} */}
      <ToastContainer />

      {loading && <Spinner />}
    </>
  );
};

export default ProductList;
