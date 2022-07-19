import { ResponseWithData } from "../types";
import configAxios from "./configAxios";

class OrderApi {
    // get products in cart by generation id user
    getProductsInCart(userId: string) {
        const url = `/${userId}/cart`;
        return configAxios.get<never, ResponseWithData>(url);
    }

}

const orderApi = new OrderApi();

export default orderApi;