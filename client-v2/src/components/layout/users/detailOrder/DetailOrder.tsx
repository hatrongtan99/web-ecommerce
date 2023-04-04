import { useMemo } from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaUserAlt } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";

import Button from "~components/custom/button/Button";
import { DetailOrderUser } from "~types/order.type";
import styles from "./detailOrder.module.scss";
import { optionsStatusOrders } from "~data/index";
import { BsCalendar3 } from "react-icons/bs";
import { dFormat } from "~utils/format";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import { changeStatusNoteOrder } from "~api/order.api";
import { ToastContainer } from "react-toastify";
import Spinner from "~components/common/spiner/Spiner";
import notify from "~utils/toastify";
import BackdropModal from "~components/custom/backdropModal/BackdropModal";

const cx = classNames.bind(styles);

const DetailOrder = ({ order }: { order: DetailOrderUser }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();
    const option = useMemo(() => {
        return optionsStatusOrders.find(
            (option) => option.value === order.status
        );
    }, [order]);

    const mutation = useMutation(
        () =>
            changeStatusNoteOrder(axiosPrivate, order._id, {
                status: "cancelled",
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    "order-user",
                    router.query.idOrder,
                ]);
            },
        }
    );

    const handleCanlleOrder = async () => {
        mutation
            .mutateAsync()
            .then((data) => {
                if (data.data.success) {
                    notify("success", "Hủy đơn thành công.");
                }
            })
            .catch((err) => {
                console.log(err);
                notify("error", err?.response?.data?.message);
            });
    };

    return mutation.isLoading ? (
        <Spinner />
    ) : (
        <section className={`my-4 ${cx("container")}`}>
            <div className={cx("order-top")}>
                <div className={cx("order-top__inteact")}>
                    <p onClick={() => router.back()}>
                        <IoIosArrowBack size={20} /> <span>TRỞ LẠI</span>
                    </p>

                    <p
                        className={cx("order-top__inteact__status")}
                        style={{
                            color: option?.bgColor,
                        }}
                    >
                        {option?.label}
                    </p>

                    <Button
                        size="sm"
                        variant="primary-border"
                        disable={
                            order.status === "cancelled" ||
                            order.status === "delivered"
                        }
                        data-bs-target={`#canlle-order-${order._id}`}
                        data-bs-toggle="modal"
                    >
                        Hủy
                    </Button>
                </div>

                <div className={cx("order-top__info")}>
                    <p>
                        Ngày đặt:{" "}
                        <span style={{ color: "#333" }}>
                            {dFormat(new Date(order.created))}
                        </span>
                    </p>
                    <p>
                        MÃ ĐƠN HÀNG:{" "}
                        <span style={{ color: "#333" }}>
                            #{order._id.slice(-7)}
                        </span>
                    </p>
                </div>
            </div>

            <div className={cx("detail-body")}>
                <div className={cx("detail-body__info")}>
                    <div className={cx("detail-body__info__item")}>
                        <p className={cx("icon-info")}>
                            <FaUserAlt size={20} />
                        </p>
                        <div className="ms-3">
                            <p className={cx("label")}>Khách hàng:</p>
                            <p>{order.user.user_name}</p>
                            <p>{order.user.email}</p>
                            <p>{order.phoneNumber}</p>
                        </div>
                    </div>
                    <div className={cx("detail-body__info__item")}>
                        <p className={cx("icon-info")}>
                            <ImLocation2 size={20} />
                        </p>
                        <div className="ms-3">
                            <p className={cx("label")}>Địa chỉ giao:</p>
                            <p>{order.address}</p>
                        </div>
                    </div>
                    <div className={cx("user-note")}>
                        <textarea
                            placeholder="Ghi chú"
                            value={order.note}
                            readOnly
                        />
                    </div>
                </div>

                <div className={cx("detail-body__product")}>
                    <div className={cx("table-header")}>
                        <p style={{ width: "55%" }}>Tên sản phẩm</p>
                        <p style={{ width: "15%", textAlign: "center" }}>
                            Số lượng
                        </p>
                        <p style={{ width: "15%" }}>Giá mua</p>
                        <p style={{ width: "15%", textAlign: "end" }}>
                            Thành tiền
                        </p>
                    </div>
                    {order.cart.products.map((product) => {
                        return (
                            <div
                                className={cx("table-item")}
                                key={product.product._id}
                            >
                                <div
                                    style={{
                                        width: "55%",
                                    }}
                                    className="d-flex align-items-center"
                                >
                                    <span className={cx("table-item__img")}>
                                        <Image
                                            alt=""
                                            fill
                                            sizes="auto"
                                            src={product.product.images[0]}
                                        />
                                    </span>
                                    <p className={cx("table-item__proName")}>
                                        {product.product.name_product}
                                    </p>
                                </div>
                                <p
                                    style={{
                                        width: "15%",
                                        textAlign: "center",
                                    }}
                                >
                                    {product.quantity}
                                </p>
                                <p style={{ width: "15%" }}>
                                    {product.perchasePrice.toLocaleString()}đ
                                </p>
                                <p style={{ width: "15%", textAlign: "end" }}>
                                    {product.totalPrice.toLocaleString()}đ
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className={cx("detail-body__footer")}>
                    <p>
                        Tổng cộng:{" "}
                        <span>{order.totalPrice.toLocaleString()}đ</span>
                    </p>
                </div>
            </div>
            <BackdropModal
                id={`canlle-order-${order._id}`}
                titleAgree="Xác nhận"
                titleDismiss="Hủy"
                body="Xác nhận hủy đơn hàng?"
                handleAgree={handleCanlleOrder}
            />
            <ToastContainer />
        </section>
    );
};

export default DetailOrder;
