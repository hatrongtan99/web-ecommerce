import { AxiosInstance } from 'axios';
import type {CartUser} from "~types/cart.type";

export const getCartUser = (axiosPrivate: AxiosInstance) => {
    return axiosPrivate.get<never, {success: boolean, cart: CartUser}>("cart")
}

export const productTocart = (axiosPrivate: AxiosInstance, params: {product: string, quantity: number}) => {
    return axiosPrivate.post("cart", params)
}
