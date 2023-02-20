import classNames from "classnames/bind";
import Link from "next/link";
import { ProductDetails } from "~types/product.type";

import styles from "../../priceDeltailProduct/priceDeltailProduct.module.scss";

const cx = classNames.bind(styles);

const PriceBox = ({ product }: { product: ProductDetails }) => {
    return (
        <div className={cx("price-box")}>
            <div className={cx("price-box__product")}>
                <p>
                    Giá bán: <strong>{product.price.toLocaleString()} đ</strong>{" "}
                    (đã bao gồm VAT)
                </p>
            </div>

            <div className={cx("price-box__item")}>
                <p>
                    Hãng: <Link href="/">{product.brand.brand_name}</Link>
                </p>
            </div>
            <div className={cx("price-box__item")}>
                <p>Mã sản phẩm: {product.sku}</p>
            </div>
            <div className={cx("price-box__item")}>
                <p>Bảo hành: {product.insurance}</p>
            </div>
            <div className={cx("price-box__item")}>
                <p>
                    Tình trạng:{" "}
                    {product.in_stock >= 1 ? "Còn hàng" : "Hết hàng"}
                </p>
            </div>
        </div>
    );
};

export default PriceBox;
