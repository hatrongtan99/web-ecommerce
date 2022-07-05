import classNames from "classnames/bind";
import Link from 'next/link';

import styles from '../../priceDeltailProduct/priceDeltailProduct.module.scss';

const cx = classNames.bind(styles)

const PriceBox = () => {
  return (
    <div className={cx('price-box')}>
      <div className={cx('price-box__product')}>
        <p>Giá bán: <strong>{(3500000).toLocaleString()} đ</strong> (đã bao gồm VAT)</p>
      </div>

      <div className={cx("price-box__item")}>
        <p>Hãng: <Link href="/">MAKITA</Link></p>
      </div>
      <div className={cx("price-box__item")}>
        <p>Mã sản phẩm: M12 FPD-0C (Bare)</p>
      </div>
      <div className={cx("price-box__item")}>
        <p>Bảo hành: 12 tháng</p>
      </div>
      <div className={cx("price-box__item")}>
        <p>Tình trạng: Còn hàng</p>
      </div>
    </div>
  )
}

export default PriceBox