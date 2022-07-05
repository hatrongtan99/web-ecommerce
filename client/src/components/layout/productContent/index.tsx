import classNames from "classnames/bind";
import SlideDetailProduct from "~/components/component/slideShow/slideDetailProduct";
import PriceDeltailProduct from "../priceDeltailProduct";
import RightDeltailProduct from "../rightDeltailProduct";

import styles from './productContent.module.scss';
const cx = classNames.bind(styles);

const ProductContent = () => {
  return (
    <div className={`row ${cx('product_content')}`}>
        <div className="col-5">
          <SlideDetailProduct />
        </div>

        <div className="col-4">
          <PriceDeltailProduct/>
        </div>

        <div className="col-3">
          <RightDeltailProduct/>
        </div>
    </div>
  )
}

export default ProductContent