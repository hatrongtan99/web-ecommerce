import { AxiosInstance, AxiosResponse } from "axios";
import type { CartUser } from "~types/cart.type";

export const getCartUser = (axiosPrivate: AxiosInstance) => {
  return axiosPrivate.get<
    never,
    AxiosResponse<{ success: boolean; cart: CartUser }>
  >("/cart");
};

export const addProductToCart = (
  axiosPrivate: AxiosInstance,
  params: { product: string; quantity: number }
) => {
  return axiosPrivate.post("/cart", params);
};
