import { GetServerSideProps, NextPage } from 'next';
import { wrapper } from '~/redux/store';

import CheckoutTop from '~/components/layout/checkout/checkoutTop';
import CheckoutProductList from '~/components/layout/checkout/checkoutProductList';
import CustomerForm from '~/components/layout/checkout/cutomerForm';
import { ProductsInCartResult } from '~/types/index';
import OrderApi from '~/api/order';
import { saveProductsInCart } from '~/redux/slice/checkoutSlice';
import { useAppSelector } from '~/redux/hooks';

interface CheckoutProps {
    data: ProductsInCartResult[]
}

const Checkout: NextPage<CheckoutProps> = ({data}) => {
    return (
        <main className='container'>
            <div className='col-6 offset-3'>
                <CheckoutTop/>

                {/* <CheckoutProductList/> */}

                <CustomerForm/>
            </div>
        </main>   
    )
}

export default Checkout;

export const getServerSideProps: GetServerSideProps<CheckoutProps> = wrapper.getServerSideProps(store => async ({params, query}) => {
    const {userId} = query
    try {
        const productsIncart = await OrderApi.getProductsInCart(userId as string);
        store.dispatch(saveProductsInCart(productsIncart.data));
        return {
            props: {
                data: productsIncart.data
            }
        }
    } catch (error) {
        console.log(error);
        return {
            props: {data: []}
        }
    }
})