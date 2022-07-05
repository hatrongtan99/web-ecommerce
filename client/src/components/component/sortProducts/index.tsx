import type {MouseEvent} from 'react';
import classNames from 'classnames/bind';
import styles from './sortProducts.module.scss';

import FilterInput from '~/components/custom/filterInput';

const cx = classNames.bind(styles)

interface SortProductProps {
  sortValue: string;
  setSortValue: (value: string) => void;
}

const SortProduct = ({sortValue, setSortValue}: SortProductProps) => {

  const handleCheckBox = (e: MouseEvent<HTMLElement>) => {
    if (sortValue == e.currentTarget.dataset.sort) {
      setSortValue('')
    } else {
      setSortValue(e.currentTarget.dataset.sort as string)
    }
  }

  return (
    <div className={cx('sort-wrapper')}>
      <h5>Sắp xếp: </h5>
      <div className={cx('sort-item')}>
        <FilterInput active={sortValue == 'asc'} title='Giá thấp đến cao' data-sort='asc' handleclick={handleCheckBox}/>
      </div>
      <div className={cx('sort-item')}>
        <FilterInput active={sortValue == 'desc'} title='Giá cao đến thấp' data-sort='desc' handleclick={handleCheckBox}/>
      </div>
    </div>
  )
}

export default SortProduct