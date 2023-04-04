import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "~components/custom/button/Button";
import { optionsStatusOrders } from "~data/index";

import type { DetailOrderUser } from "~types/order.type";
import { dFormat } from "~utils/format";
import styles from "./perchase.module.scss";

const cx = classNames.bind(styles);

const Perchase = ({ data }: { data: { order: DetailOrderUser[] } }) => {
    const router = useRouter();
    return (
        <section className={cx("container")}>
            {data.order.length == 0 ? (
                <h3
                    style={{
                        fontSize: "1.4rem",
                        textAlign: "center",
                        marginTop: "5rem",
                        color: "#666",
                    }}
                >
                    Chưa có đơn hàng nào
                </h3>
            ) : (
                data.order.map((order) => {
                    const option = optionsStatusOrders.find(
                        (o) => o.value === order.status
                    );
                    return (
                        <div className={cx("item")} key={order._id}>
                            <div className={cx("item__top")}>
                                <p>
                                    Ngày đặt:{" "}
                                    <span>
                                        {dFormat(new Date(order.created))}
                                    </span>
                                </p>
                                <p className={cx("item__top__status")}>
                                    Trạng thái:{" "}
                                    <Link
                                        href={`puchase/${order._id}`}
                                        style={{ color: option?.bgColor }}
                                    >
                                        {option?.label}
                                    </Link>
                                </p>
                            </div>

                            <div className={cx("item__body")}>
                                {order.cart.products.map((item) => {
                                    return (
                                        <div
                                            className={cx("product")}
                                            key={item.product._id}
                                        >
                                            <div className="d-flex">
                                                <div
                                                    className={cx(
                                                        "product__img"
                                                    )}
                                                >
                                                    <Link
                                                        href={`/${item.product.categories[0].slug}/${item.product.slug}`}
                                                    >
                                                        <Image
                                                            alt="product"
                                                            src={
                                                                item.product
                                                                    .images[0]
                                                            }
                                                            fill
                                                        />
                                                    </Link>
                                                </div>
                                                <div
                                                    className={cx(
                                                        "product__title"
                                                    )}
                                                >
                                                    <h2>
                                                        <Link
                                                            href={`/${item.product.categories[0].slug}/${item.product.slug}`}
                                                        >
                                                            {
                                                                item.product
                                                                    .name_product
                                                            }
                                                        </Link>
                                                    </h2>
                                                    <p>
                                                        Số lượng:{" "}
                                                        <span>
                                                            {item.quantity}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div
                                                className={cx("product__price")}
                                            >
                                                <strong>
                                                    {item.perchasePrice.toLocaleString()}{" "}
                                                    đ
                                                </strong>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={cx("item__footer")}>
                                <p>
                                    Thành tiền:{" "}
                                    <span>
                                        {order.totalPrice.toLocaleString()} đ
                                    </span>
                                </p>
                                <Button
                                    style={{ padding: "6px 20px" }}
                                    onClick={() =>
                                        router.push(
                                            `/users/puchase/${order._id}`
                                        )
                                    }
                                >
                                    Xem chi tiết
                                </Button>
                            </div>
                        </div>
                    );
                })
            )}
        </section>
    );
};

export default Perchase;
