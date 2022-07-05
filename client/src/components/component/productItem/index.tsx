import classNames from 'classnames/bind';
import styles  from './productItem.module.scss';
import Link from 'next/link';

const cx = classNames.bind(styles);

interface Img {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface ProductItemProps {
  brandImg: boolean;
  data?: Img
}

const ProductItem = ({brandImg, data}: ProductItemProps) => {
  
  const isDiscount = 4 > 0
  return (
    <div className={cx('product__item')}>
      <Link href='/'>
        <a>
          <img className={cx('product__item__thumb')} src='https://maydochuyendung.com/img/uploads/cache_image/500x-may-khoan-bua-milwaukee-m18-chx-0x0-bare-3-1605858202.png'/>
          <h3>Máy khoan búa Milwaukee M18 CHX-0X0 (bare)</h3>
        </a>
      </Link>
      {brandImg ? 
        <Link href='/'>
          <a>
            <img className={cx('product__item__brand')} src='https://maydochuyendung.com/img/uploads/cache_image/x35-milwaukee-logo-1584090720.png'/>
          </a>
        </Link> : null
      }
      <div className={cx('product__item__price')}>
        <strong>{(7000000).toLocaleString()} đ</strong>
        {isDiscount ? 
          <>
          <p className={cx('product__item__old__price')}>{(1440000).toLocaleString()} đ</p>
            <div className={cx('tag-discount')}>
              <p>-4%</p>
              <span></span>
            </div>
          </> : null }
      </div>

    </div>
  )
}

export default ProductItem