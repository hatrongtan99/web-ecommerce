import classNames from 'classnames/bind';
import SlideDetailProduct from './slideDetailProduct/SlideDetailProduct';
import PriceDeltailProduct from './priceDeltailProduct/PriceDeltailProduct';
import RightDeltailProduct from './rightDeltailProduct/RightDeltailProduct';

import styles from './productContent.module.scss';
const cx = classNames.bind(styles);

const ProductContent = () => {
    return (
        <div className={`row ${cx('product_content')}`}>
            <div className="col-5">
                <SlideDetailProduct />
            </div>

            <div className="col-4">
                <PriceDeltailProduct />
            </div>

            <div className="col-3">
                <RightDeltailProduct />
            </div>
        </div>
    );
};

export default ProductContent;
