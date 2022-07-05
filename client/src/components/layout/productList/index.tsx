import styles from './productList.module.scss';
import classNames from 'classnames/bind';

import ProductItem from "~/components/component/productItem";

const cx = classNames.bind(styles);

const ProductList = () => {
  return (
    <div className={cx('product__list')}>
      <div className='row g-0'>
        <div className='col-3'>
          <ProductItem brandImg={true}/>
        </div>
        <div className='col-3'>
          <ProductItem brandImg={true}/>
        </div>
        <div className='col-3'>
          <ProductItem brandImg={true}/>
        </div>
        <div className='col-3'>
          <ProductItem brandImg={true}/>
        </div>
        <div className='col-3'>
          <ProductItem brandImg={true}/>
        </div>
      </div>
    </div>
  )
}

export default ProductList