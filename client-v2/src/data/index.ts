const optionsStatusOrders = [
    {
        label: "Chờ xác nhận",
        value: "pending",
        bgColor: "rgb(38,170,153, 1)",
    },
    {
        label: "Không xác nhận",
        value: "not processed",
        bgColor: "rgba(111, 113, 116, 0.7)",
    },
    {
        label: "Đã xác nhận",
        value: "processed",
        bgColor: "rgba(10, 159, 237, 0.7)",
    },
    {
        label: "Đang vận chuyển",
        value: "shipping",
        bgColor: "rgba(10, 159, 237, 0.7)",
    },
    {
        label: "Đã giao thành công",
        value: "delivered",
        bgColor: "rgba(10, 154, 25, 0.7)",
    },
    {
        label: "Đã hủy",
        value: "cancelled",
        bgColor: "rgba(216, 42, 20, 0.7)",
    },
];

export { optionsStatusOrders };
