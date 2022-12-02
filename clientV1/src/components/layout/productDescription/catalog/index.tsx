import classNames from "classnames/bind";
import { useAppSelector } from "~/redux/hooks";

import styles from './catalog.module.scss';
const cx = classNames.bind(styles);

const Catalog = () => {
  const catalogList = useAppSelector(state => state.products.dataByCategoryAndSlug.catalog);

  return (
    <div className={cx('catalog')}>
      <h3 className={cx('catalog__title')}>THÔNG SỐ KỸ THUẬT</h3>
      <ul className={cx('catalog__list')}>
        {catalogList.map((catalog) => (
          <li className={cx('catalog__item')} key={catalog.catalogId}>
            <p>{catalog.titleCatalog}:</p>
            <span>{catalog.contentCatalog}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Catalog