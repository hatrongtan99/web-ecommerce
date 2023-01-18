import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import styles from "./productItem.module.scss";

const cx = classNames.bind(styles);

interface ProductItemProps {
  brandImg: boolean;
  product: any;
}

const ProductItem = ({ brandImg, product }: ProductItemProps) => {
  const newPrice = product.price - (product.price * product.discount) / 100;
  const image = product.images[0] ?? product.images;
  return (
    <div className={cx("product__item")}>
      <Link href="/" legacyBehavior>
        <a>
          <Image
            alt={`${product.name_product}`}
            className={cx("product__item__thumb")}
            src={image}
            width={300}
            height={300}
          />
          <h6>{product.name_product}</h6>
        </a>
      </Link>
      {brandImg ? (
        <Link href="/" legacyBehavior>
          <a>
            <img
              className={cx("product__item__brand")}
              src="https://maydochuyendung.com/img/uploads/cache_image/x35-milwaukee-logo-1584090720.png"
            />
          </a>
        </Link>
      ) : null}
      <div className={cx("product__item__price")}>
        <strong>{newPrice.toLocaleString()} đ</strong>
        {product.discount > 0 ? (
          <>
            <p className={cx("product__item__old__price")}>
              {product.price.toLocaleString()} đ
            </p>
            <div className={cx("tag-discount")}>
              <p>{product.discount}%</p>
              <span></span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProductItem;
