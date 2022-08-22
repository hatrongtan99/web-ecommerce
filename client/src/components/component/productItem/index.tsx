import classNames from 'classnames/bind';
import styles  from './productItem.module.scss';
import Link from 'next/link';
import { ProductsByCategory } from '~/types/index';
import Image from 'next/image';

const cx = classNames.bind(styles);

interface ProductItemProps {
  brandImg: boolean;
  data: ProductsByCategory
}

const ProductItem = ({brandImg, data}: ProductItemProps) => {

  const isDiscount = data.discount
  return (
    <div className={cx('product__item')}>
      <Link href={`/${data.categorySlug}/${data.slug}`}>
        <a>
          <div className={cx('product__item__thumb')}>
            <Image layout='fill' objectFit='contain' alt='Ảnh nền.' src={`${process.env.NEXT_PUBLIC_DB_HOST}/public/images/${data.productThumb}`}/>
          </div>
          <h3>{data.productName}</h3>
        </a>
      </Link>
      {brandImg ? 
        <Link href={`/`}>
          <a className={cx('product__item__brand')}>
            <Image layout='fill' objectFit='cover' alt='Hãng.' src={`${process.env.NEXT_PUBLIC_DB_HOST}/public/images/${data.brandImg}`}/>
          </a>
        </Link> : null
      }
      <div className={cx('product__item__price')}>
        <strong>{(data.price).toLocaleString()} đ</strong>
        {isDiscount ? 
          <>
            <p className={cx('product__item__old__price')}>{(1440000).toLocaleString()} đ</p>
            <div className={cx('tag-discount')}>
              <p>{data.discount}</p>
              <span></span>
            </div>
          </> : null }
      </div>

    </div>
  )
}

export default ProductItem