import {memo} from 'react';
import classNames from 'classnames/bind';

import styles from './productSpecial.module.scss';
import SlideSpecialProduct from '~/components/component/slideShow/slideSpecialProduct';

const cx = classNames.bind(styles);

const ProductSpecial = () => {
  return (
    <div className={cx('special-wrapper')}>
      <div className={cx('special__title')}>
        <h2>Máy Khoan Nổi Bật</h2>
        <span></span>
      </div>
      <div className={cx('special__slice')}>
          <SlideSpecialProduct/>
      </div>
    </div>
  )
}

export default memo(ProductSpecial)