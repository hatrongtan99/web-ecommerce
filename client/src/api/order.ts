import { FormSubmitProps } from "~/components/layout/checkout/cutomerForm";
import { ResponseWithData, Response } from "../types";
import configAxios from "./configAxios";

class OrderApi {
    // add product to cart
    addToCart(params: any) {
        const url = '/add-to-cart';
        return configAxios.post<never, ResponseWithData>(url, {params})
    }

    // get products in cart by generation id user
    getProductsInCart(userId: string) {
        const url = `/cart/${userId}`;
        return configAxios.get<never, ResponseWithData>(url);
    }
    
    // delete product in cart by userId
    deleteProductInCart(userId: string, productId: string) {
        const url =`/cart/${userId}/${productId}`;
        return configAxios.delete<never, Response>(url);
    }

    // update quantity product 
    updateQuantityProduct(userId: string, productId: string, params: {quantity: number}) {
        const url =`/cart/${userId}/${productId}`;
        return configAxios.patch<never, Response>(url, {params})
    }

    // create order by userId
    createOrderByUserId(userId: string, params: FormSubmitProps) {
        const url = `/checkout/${userId}`
        return configAxios.post<never, Response>(url, {params})
    }
}

const orderApi = new OrderApi();

export default orderApi;