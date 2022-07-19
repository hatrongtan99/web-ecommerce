import classNames from "classnames/bind";

import styles from './catalog.module.scss';
const cx = classNames.bind(styles);

const Catalog = () => {
  return (
    <div className={cx('catalog')}>
      <h3 className={cx('catalog__title')}>THÔNG SỐ KỸ THUẬT</h3>
      <ul className={cx('catalog__list')}>
        <li className={cx('catalog__item')}>
          <p>Mô-men xoắn, tối đa (cứng/mềm):</p>
          <span>28 / 11 Nm</span>
        </li>

        <li className={cx('catalog__item')}>
          <p>Mô-men xoắn, tối đa (cứng/mềm):</p>
          <span>28 / 11 Nm</span>
        </li>
        <li className={cx('catalog__item')}>
          <p>Mô-men xoắn, tối đa (cứng/mềm):</p>
          <span>28 / 11 Nm</span>
        </li>

        <li className={cx('catalog__item')}>
          <p>Mô-men xoắn, tối đa (cứng/mềm):</p>
          <span>28 / 11 Nm</span>
        </li>
      </ul>
    </div>
  )
}

export default Catalog