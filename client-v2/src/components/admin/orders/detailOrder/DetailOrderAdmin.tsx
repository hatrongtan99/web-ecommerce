import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsCalendar3, BsFillPrinterFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { changeStatusNoteOrder, getDetailOrderByAdmin } from "~api/order.api";
import Spinner from "~components/common/spiner/Spiner";
import Button from "~components/custom/button/Button";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import { ChangeStatusOrder } from "~types/order.type";

import styles from "./detailOrderAdmin.module.scss";
import { dFormat } from "~utils/format";
import notify from "~utils/toastify";
import { ToastContainer } from "react-toastify";
import BackdropModal from "~components/custom/backdropModal/BackdropModal";
import { optionsStatusOrders } from "~data/index";

const cx = classNames.bind(styles);

const DetailOrderAdmin = () => {
    const axiosPrivate = useAxiosPrivate();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [dataStatus, setDataStatus] = useState<{
        status: string;
        noteByAdmin: string;
    }>({
        status: "",
        noteByAdmin: "",
    });
    const refStatus = useRef<any>(null);
    const [saveEnable, setBtnEnable] = useState(true);

    const { data: detailOrder, isLoading } = useQuery(
        ["detail-order", router.query.idOrder],
        () =>
            getDetailOrderByAdmin(axiosPrivate, router.query.idOrder as string)
    );

    useEffect(() => {
        if (detailOrder && detailOrder.data.success) {
            setDataStatus({
                status: detailOrder.data.order.status,
                noteByAdmin: detailOrder.data.order.noteByAdmin,
            });
            refStatus.current = detailOrder.data.order.status;
            setBtnEnable(true);
        }
    }, [detailOrder]);

    useEffect(() => {
        if (refStatus.current) {
            if (refStatus.current === dataStatus.status) {
                setBtnEnable(true);
            } else {
                setBtnEnable(false);
            }
        }
    }, [dataStatus.status]);

    const mutation = useMutation(
        (data: ChangeStatusOrder) =>
            changeStatusNoteOrder(
                axiosPrivate,
                detailOrder?.data.order._id!,
                data
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    "detail-order",
                    router.query.idOrder,
                ]);
            },
        }
    );

    const handleSubmit = async (dataChange: ChangeStatusOrder) => {
        mutation
            .mutateAsync(dataChange)
            .then((data) => {
                if (data.data.success) {
                    notify("success", data.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
                notify("error", err?.response?.data?.message);
            });
    };

    const handlePrint = () => {
        var printContents = document.getElementById("order-details")!.innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();
        document.body.innerHTML = originalContents;
    };

    return isLoading || mutation.isLoading ? (
        <Spinner />
    ) : (
        <div className="container-fluid mx-2 my-3">
            <h1 className={cx("title")}>Order details</h1>
            <div className={cx("wrapper")} id="order-details">
                <div className={cx("detail-top")}>
                    <div className={cx("detail-top__left")}>
                        <p>
                            <BsCalendar3
                                size={20}
                                color="#333"
                                style={{ marginRight: "6px" }}
                            />{" "}
                            {dFormat(
                                new Date(detailOrder?.data.order.created!)
                            )}
                        </p>
                        <span>#ID {detailOrder?.data.order._id.slice(-7)}</span>
                    </div>
                    <div className={cx("detail-top__right")}>
                        <select
                            name="status"
                            id={cx("status-order")}
                            onChange={(e) =>
                                setDataStatus({
                                    ...dataStatus,
                                    status: e.target.value,
                                })
                            }
                            value={dataStatus.status}
                            disabled={
                                refStatus.current === "cancelled" ||
                                refStatus.current == "delivered"
                            }
                        >
                            {optionsStatusOrders.map((option, index) => {
                                if (option.value === dataStatus.status) {
                                    return (
                                        <option
                                            value={dataStatus.status}
                                            key={index}
                                        >
                                            {option.label}
                                        </option>
                                    );
                                } else {
                                    return (
                                        <option
                                            value={option.value}
                                            key={index}
                                        >
                                            {option.label}
                                        </option>
                                    );
                                }
                            })}
                        </select>
                        <Button
                            variant="secondary"
                            data-bs-toggle="modal"
                            data-bs-target={`#change-status-orer-${detailOrder?.data.order._id}`}
                            disable={saveEnable}
                        >
                            Save
                        </Button>
                        <span
                            className={cx("print-icon")}
                            onClick={handlePrint}
                        >
                            <BsFillPrinterFill size={24} />
                        </span>
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
                                <p>{detailOrder?.data.order.user.user_name}</p>
                                <p>{detailOrder?.data.order.user.email}</p>
                                <p>{detailOrder?.data.order.phoneNumber}</p>
                            </div>
                        </div>
                        <div className={cx("detail-body__info__item")}>
                            <p className={cx("icon-info")}>
                                <ImLocation2 size={20} />
                            </p>
                            <div className="ms-3">
                                <p className={cx("label")}>Địa chỉ giao:</p>
                                <p>{detailOrder?.data.order.address}</p>
                            </div>
                        </div>
                        <div className={cx("admin-note")}>
                            <textarea
                                placeholder="Ghi chú"
                                name="noteByAdmin"
                                value={dataStatus.noteByAdmin}
                                onChange={(e) =>
                                    setDataStatus({
                                        ...dataStatus,
                                        noteByAdmin: e.target.value,
                                    })
                                }
                            />
                            <Button
                                size="sm"
                                style={{ marginLeft: "auto" }}
                                onClick={() =>
                                    handleSubmit({
                                        noteByAdmin: dataStatus.noteByAdmin,
                                    })
                                }
                            >
                                Save note
                            </Button>
                        </div>
                    </div>

                    <div className={cx("detail-body__product")}>
                        <div className={cx("table-header")}>
                            <p style={{ width: "60%" }}>Tên sản phẩm</p>
                            <p style={{ width: "20%", textAlign: "center" }}>
                                Số lượng
                            </p>
                            <p style={{ width: "10%" }}>Giá mua</p>
                            <p style={{ width: "10%", textAlign: "end" }}>
                                Thành tiền
                            </p>
                        </div>
                        {detailOrder?.data.order.cart.products.map(
                            (product) => {
                                return (
                                    <div
                                        className={cx("table-item")}
                                        key={product.product._id}
                                    >
                                        <div
                                            style={{
                                                width: "60%",
                                            }}
                                            className="d-flex align-items-center"
                                        >
                                            <span
                                                className={cx(
                                                    "table-item__img"
                                                )}
                                            >
                                                <Image
                                                    alt=""
                                                    fill
                                                    sizes="auto"
                                                    src={
                                                        product.product
                                                            .images[0]
                                                    }
                                                />
                                            </span>
                                            <p
                                                className={cx(
                                                    "table-item__proName"
                                                )}
                                            >
                                                {product.product.name_product}
                                            </p>
                                        </div>
                                        <p
                                            style={{
                                                width: "20%",
                                                textAlign: "center",
                                            }}
                                        >
                                            {product.quantity}
                                        </p>
                                        <p style={{ width: "10%" }}>
                                            {product.perchasePrice.toLocaleString()}
                                            đ
                                        </p>
                                        <p
                                            style={{
                                                width: "10%",
                                                textAlign: "end",
                                            }}
                                        >
                                            {product.totalPrice.toLocaleString()}
                                            đ
                                        </p>
                                    </div>
                                );
                            }
                        )}
                    </div>

                    <div className={cx("detail-body__footer")}>
                        <p>
                            Tổng cộng:{" "}
                            <span>
                                {detailOrder?.data.order.totalPrice.toLocaleString()}
                                đ
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <BackdropModal
                handleAgree={() => handleSubmit(dataStatus as any)}
                body="Xác nhận lưu thay đổi?"
                titleDismiss="Hủy"
                id={`change-status-orer-${detailOrder?.data.order._id}`}
                titleAgree="Xác nhận"
            />
            <ToastContainer />
        </div>
    );
};

export default DetailOrderAdmin;
