import classNames from "classnames/bind";
import Link from 'next/link';
import { useAppSelector } from "~/redux/hooks";

import styles from '../../priceDeltailProduct/priceDeltailProduct.module.scss';

const cx = classNames.bind(styles)

const PriceBox = () => {
  const data = useAppSelector(state => state.products.dataByCategoryAndSlug)
  return (
    <div className={cx('price-box')}>
      <div className={cx('price-box__product')}>
        <p>Giá bán: <strong>{(data.price).toLocaleString()} đ</strong> (đã bao gồm VAT)</p>
      </div>

      <div className={cx("price-box__item")}>
        <p>Hãng: <Link href="/">{data.brandName}</Link></p>
      </div>
      <div className={cx("price-box__item")}>
        <p>Mã sản phẩm: {data.sku}</p>
      </div>
      <div className={cx("price-box__item")}>
        <p>Bảo hành: {data.insurance}</p>
      </div>
      <div className={cx("price-box__item")}>
        <p>Tình trạng: {data.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}</p>
      </div>
    </div>
  )
}

export default PriceBox