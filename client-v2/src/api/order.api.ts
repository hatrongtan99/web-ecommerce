import { AxiosInstance, AxiosResponse } from "axios";
import { CreateOrderForm, OrderUser } from "~types/order.type";

interface OrderUserRes extends OrderUser {
  success: boolean;
}

export const createOrder = (
  axiosPrivate: AxiosInstance,
  orderForm: CreateOrderForm
) => {
  return axiosPrivate.post<
    never,
    AxiosResponse<{ success: boolean; message: string }>
  >("/order/add", orderForm);
};

export const getOrderByUser = (axiosPrivate: AxiosInstance) => {
  return axiosPrivate.get<never, AxiosResponse<OrderUserRes>>("/order/me");
};
