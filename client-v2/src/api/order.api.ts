import { AxiosInstance, AxiosResponse } from "axios";
import { CreateOrderForm, Order } from "~types/order.type";

export const createOrder = (
  axiosPrivate: AxiosInstance,
  orderForm: CreateOrderForm
) => {
  return axiosPrivate.post<
    never,
    AxiosResponse<{ success: boolean; order: Order }>
  >("/order/add", orderForm);
};
