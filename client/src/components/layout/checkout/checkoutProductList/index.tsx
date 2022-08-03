import classNames from "classnames/bind";
import styles from './checkoutProductList.module.scss';
import { useAppSelector } from "~/redux/hooks";

import ProductCheckout from "./productCheckout";
import Spinner from "~/components/component/spinner"; 

const cx = classNames.bind(styles);

const CheckoutProductList = () => {
  const productsIncart = useAppSelector(state => state.checkout.productsIncart);
  
  const totalSum = productsIncart.data.reduce((sum, curr) => sum + curr.price, 0);
  
  return (
    <div className={cx('wrapper')}>
        <div className={cx('product-list')}>
          {productsIncart.data.map(product => (

            <ProductCheckout product={product} key={product.cartItemId}/>
          ))}
            {/* <ProductCheckout/> */}
        </div>

        <div className={cx('total-pay')}>
            <p>Tổng tiền:</p>
            <strong>{(3270000).toLocaleString()} đ</strong> 
        </div>
        {productsIncart.status == 'loading' && <Spinner/>}
    </div>
  )
}

export default CheckoutProductList