import classNames from "classnames/bind";
import {BsCheckLg} from 'react-icons/bs';

import styles from './rightDeltailProduct.module.scss';

const cx = classNames.bind(styles);

const RightDeltailProduct = () => {
  return (
    <>
      <div className={cx("policy-box")}>
        <h3>LỢI ÍCH KHI MUA</h3>
        <div className={cx("policy-item")}>
          <BsCheckLg color='#007f00'/>
          <p>Sản phẩm chính hãng 100%</p>
        </div>
        <div className={cx("policy-item")}>
          <BsCheckLg color='#007f00'/>
          <p>Giá luôn tốt nhất</p>
        </div>
        <div className={cx("policy-item")}>
          <BsCheckLg color='#007f00'/>
          <p>Tư vấn chuyên nghiệp</p>
        </div>
        <div className={cx("policy-item")}>
          <BsCheckLg color='#007f00'/>
          <p>Giao hàng toàn quốc</p>
        </div>
        <div className={cx("policy-item")}>
          <BsCheckLg color='#007f00'/>
          <p>Bảo hành &amp; sửa chữa tận tâm</p>
        </div>
      </div>

      <div className={cx("store-info")}>
    
      </div>
    </>
  )
}

export default RightDeltailProduct