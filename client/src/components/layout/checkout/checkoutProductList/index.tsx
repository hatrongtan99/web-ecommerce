import classNames from "classnames/bind";
import styles from './checkoutProductList.module.scss';
import { useAppSelector } from "~/redux/hooks";

import ProductCheckout from "./productCheckout";
import Spinner from "~/components/component/spinner"; 
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { notifyError } from "~/utils/toastify";

const cx = classNames.bind(styles);

const CheckoutProductList = () => {
  const productsIncart = useAppSelector(state => state.checkout.productsIncart);
  
  const totalSum = productsIncart.data.reduce((sum, curr) => sum + (curr.price * curr.quantity), 0);
  
  useEffect(() => {
    if (productsIncart.status === 'rejected') {
      notifyError(productsIncart.error!)
    }
  }, [productsIncart.status, productsIncart.error])
  
  return (
    <div className={cx('wrapper')}>
        <div className={cx('product-list')}>
        {productsIncart.data && productsIncart.data.map(product => (

            <ProductCheckout product={product} key={product.cartItemId}/>
          ))}
        </div>

        <div className={cx('total-pay')}>
            <p>Tổng tiền:</p>
            <strong>{(totalSum).toLocaleString()} đ</strong> 
        </div>
        {productsIncart.status == 'loading' && <Spinner/>}
        <ToastContainer/>
    </div>
  )
}

export default CheckoutProductList