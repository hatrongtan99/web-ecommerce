import classNames from 'classnames/bind';
import styles from './checkoutProductList.module.scss';

import ProductCheckout from './productCheckout/ProductCheckout';
import Spinner from '~components/common/spiner/Spiner';

const cx = classNames.bind(styles);

const CheckoutProductList = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-list')}>
                {/* {productsIncart.data.map(product => (

            <ProductCheckout product={product} key={product.cartItemId}/>
          ))} */}
                <ProductCheckout />
            </div>

            <div className={cx('total-pay')}>
                <p>Tổng tiền:</p>
                <strong>{(3270000).toLocaleString()} đ</strong>
            </div>
        </div>
    );
};

export default CheckoutProductList;
