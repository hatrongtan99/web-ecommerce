import classNames from "classnames/bind";
import styles from './checkoutProductList.module.scss';
import ProductCheckout from "./productCheckout";

const cx = classNames.bind(styles);

const CheckoutProductList = () => {
  return (
    <div className={cx('wrapper')}>
        <div className={cx('product-list')}>
            <ProductCheckout/>
            <ProductCheckout/>
        </div>

        <div className={cx('total-pay')}>
            <p>Tổng tiền:</p>
            <strong>{(3270000).toLocaleString()} đ</strong> 
        </div>
    </div>
  )
}

export default CheckoutProductList