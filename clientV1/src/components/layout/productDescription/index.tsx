import classNames from "classnames/bind";
import Catalog from "./catalog";
import Description from "./description";

import styles from './productDescription.module.scss';
import RatingBox from "./ratingBox";

const cx = classNames.bind(styles);

const ProductDescription = () => {
  return (
    <div className={`row ${cx('product-desc')}`}>
      <div className='col-8'>
        {/* main description */}
        <Description/>
        
        {/* rating Box */}
        <RatingBox/>
      </div>

      <div className={`col-4 ${cx('sticky')}`}>
        <Catalog/>
      </div>
    </div>
  )
}

export default ProductDescription