import { AxiosInstance, AxiosResponse } from "axios";
import { CommonResponse } from "~types/index.type";
import {
  ChangeStatusOrder,
  CreateOrderForm,
  DetailOrderUser,
} from "~types/order.type";

export const createOrder = (
  axiosPrivate: AxiosInstance,
  orderForm: CreateOrderForm
) => {
  return axiosPrivate.post<never, AxiosResponse<CommonResponse>>(
    "/order/add",
    orderForm
  );
};

export const getOrderByUser = (axiosPrivate: AxiosInstance, params?: any) => {
  return axiosPrivate.get<
    never,
    AxiosResponse<{ success: true; order: DetailOrderUser[] }>
  >("/order/me", {
    params,
  });
};

export const getDetailOrderByUser = (
  axiosPrivate: AxiosInstance,
  idOrder: string
) => {
  return axiosPrivate.get(`/order/me/${idOrder}`);
};

export const getOrderByAdmin = async (
  axiosPrivate: AxiosInstance,
  params?: any
) => {
  return axiosPrivate.get<
    never,
    AxiosResponse<{ success: boolean; orders: DetailOrderUser[] }>
  >("/order/admin/all", { params });
};

export const getDetailOrderByAdmin = async (
  axiosPrivate: AxiosInstance,
  id: string,
  params?: any
) => {
  return axiosPrivate.get<
    never,
    AxiosResponse<{ success: true; order: DetailOrderUser }>
  >(`/order/admin/${id}`, { params });
};

export const changeStatusNoteOrder = async (
  axiosPrivate: AxiosInstance,
  idOrder: string,
  data: ChangeStatusOrder
) => {
  return axiosPrivate.patch(`/order/update/${idOrder}`, data);
};
