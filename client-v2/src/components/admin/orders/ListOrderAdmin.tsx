import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import styles from "./listOrderAdmin.module.scss";
import { useRouter } from "next/router";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineNoteAlt } from "react-icons/md";

import { getOrderByAdmin } from "~api/order.api";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import Spinner from "~components/common/spiner/Spiner";
import { optionsStatusOrders } from "~data/index";

const cx = classNames.bind(styles);

const ListOrder = () => {
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();

  const { data, isLoading } = useQuery(["orders-by-admin"], () =>
    getOrderByAdmin(axiosPrivate, router.query)
  );

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={cx("wrapper")}>
      <table className={cx("table")}>
        <thead>
          <tr>
            <th
              scope="col"
              style={{
                width: "10%",
                display: "inline-block",
                marginLeft: "10px",
              }}
            >
              <p>Id</p>
            </th>
            <th scope="col" style={{ width: "15%" }}>
              <p>
                Khách hàng <IoMdArrowDropdown />
              </p>
            </th>
            <th scope="col" style={{ width: "25%" }}>
              <p>Đơn hàng</p>
            </th>
            <th scope="col" style={{ width: "15%", textAlign: "center" }}>
              <p>
                Ngày đặt <IoMdArrowDropdown />
              </p>
            </th>
            <th scope="col" style={{ width: "15%", textAlign: "center" }}>
              <p>
                Tổng <IoMdArrowDropdown />
              </p>
            </th>
            <th scope="col" style={{ width: "14%", textAlign: "center" }}>
              <p>
                Status <IoMdArrowDropdown />
              </p>
            </th>
            <th scope="col" style={{ width: "6%", textAlign: "center" }}>
              <p>Note</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data.orders.map((order) => {
            return (
              <tr className={cx("row-item")} key={order._id}>
                <th
                  scope="row"
                  className={cx("text", "light")}
                  style={{ display: "block", paddingLeft: "10px" }}
                >
                  <p>#{order._id.slice(-7)}</p>
                </th>
                <td className={cx("text", "dark")}>
                  <p>{order.user.user_name}</p>
                </td>
                <td className={cx("text", "light")}>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "310px",
                    }}
                  >
                    {order.cart._id}
                  </p>
                </td>
                <td
                  style={{ textAlign: "center" }}
                  className={cx("text", "light")}
                >
                  <p>{new Date(order.created!).toLocaleDateString("en-GB")}</p>
                </td>
                <td
                  style={{ textAlign: "center" }}
                  className={cx("text", "dark")}
                >
                  <p>{(order.totalPrice as number).toLocaleString()}đ</p>
                </td>
                <td style={{ textAlign: "center" }}>
                  <p
                    className={cx("order-status")}
                    style={{
                      backgroundColor: optionsStatusOrders.find(
                        (option) => option.value === order.status
                      )?.bgColor,
                    }}
                  >
                    {order.status}
                  </p>
                </td>
                <td style={{ textAlign: "center" }}>
                  <p
                    className={cx("order-icon-note")}
                    onClick={() => router.push(`/admin/orders/${order._id}`)}
                  >
                    <MdOutlineNoteAlt size={20} />
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListOrder;
