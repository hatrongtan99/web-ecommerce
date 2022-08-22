import styles from './productList.module.scss';
import classNames from 'classnames/bind';

import ProductItem from "~/components/component/productItem";
import { useAppSelector } from '~/redux/hooks';

const cx = classNames.bind(styles);

const ProductList = () => {

  const productsByCategory = useAppSelector(state => state.products.dataByCategory.products);
  return (
    <div className={cx('product__list')}>
      <div className='row g-0'>
        {productsByCategory.map((product) => (
          <div key={product.id} className='col-3'>
            <ProductItem brandImg={true} data={product}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList