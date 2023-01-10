import { AxiosInstance } from 'axios';
import { CreateOrderForm, Order } from '~types/order.type';

export const createOrder = (
    axiosPrivate: AxiosInstance,
    orderForm: CreateOrderForm
) => {
    return axiosPrivate.post<never, { success: boolean; order: Order }>(
        '/order/add',
        orderForm
    );
};
