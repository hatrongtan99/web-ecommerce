import classNames from "classnames/bind";
import Image from "next/image";
import { forwardRef } from "react";
import { useRouter } from "next/router";

import { CartUser } from "~types/cart.type";
import Button from "~components/custom/button/Button";
import styles from "./mainLayout.module.scss";
import useAuth from "~hook/useAuth";

const cx = classNames.bind(styles);

const PropoverCart = (
    {
        data,
    }: {
        data: CartUser | undefined;
        ref: any;
    },
    ref: any
) => {
    const router = useRouter();
    const { auth } = useAuth();
    return (
        <div className={cx("pop")} id="popover-cart" ref={ref}>
            <div className={cx("pop__header")}>
                {!data ? (
                    <p>Vui lòng đăng nhập để xem chi tiết</p>
                ) : data.products.length == 0 ? (
                    <p>Giỏ hàng trống</p>
                ) : (
                    <p>Sản phẩm mới thêm</p>
                )}
            </div>

            <div className={cx("pop__body")}>
                {data?.products.map((product) => (
                    <div
                        className={cx("pop__body__item")}
                        onClick={() =>
                            router.push(
                                `/${product.product.categories[0].slug}/${product.product.slug}`
                            )
                        }
                        key={product.product._id}
                    >
                        <div className="d-flex" style={{ width: "85%" }}>
                            <Image
                                alt={product.product.name_product}
                                src={product.product.images[0]}
                                width={50}
                                height={50}
                            />
                            <p className={cx("pop__body__item__title")}>
                                {product.product.name_product}
                            </p>
                        </div>

                        <strong>
                            {product.product.price.toLocaleString()} đ
                        </strong>
                    </div>
                ))}
            </div>

            {data && data.products.length > 0 && (
                <div className={cx("pop__footer")}>
                    <Button
                        size="sm"
                        onClick={() =>
                            router.push(`/checkout/${auth?.user._id}`)
                        }
                    >
                        Xem chi tiết
                    </Button>
                </div>
            )}
        </div>
    );
};

export default forwardRef(PropoverCart);
