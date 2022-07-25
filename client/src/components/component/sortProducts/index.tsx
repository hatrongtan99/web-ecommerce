import {MouseEvent, useState} from 'react';
import classNames from 'classnames/bind';
import styles from './sortProducts.module.scss';

import FilterInput from '~/components/custom/filterInput';
import addQueryFilterInUrl from '~/utils/addQueryFilterInUrl';
import useInitialStateInFilters from '~/hook/useInitialStateInFilters';

const cx = classNames.bind(styles)

const SortProduct = () => {
  const initialStateSortValue = useInitialStateInFilters('sort')
  const [sortValue, setSortValue] = useState<string[]>(initialStateSortValue);

  const handleCheckBox = (e: MouseEvent<HTMLElement>) => {
    if (sortValue.includes(e.currentTarget.dataset.sort as string)) {
      setSortValue([])
    } else {
      setSortValue([e.currentTarget.dataset.sort as string])
    }
  }

  addQueryFilterInUrl({keyQuery: 'sort', value: sortValue})

  return (
    <div className={cx('sort-wrapper')}>
      <h5>Sắp xếp: </h5>
      <div className={cx('sort-item')}>
        <FilterInput active={sortValue.includes('asc')} title='Giá thấp đến cao' data-sort='asc' handleclick={handleCheckBox}/>
      </div>
      <div className={cx('sort-item')}>
        <FilterInput active={sortValue.includes('desc')} title='Giá cao đến thấp' data-sort='desc' handleclick={handleCheckBox}/>
      </div>
    </div>
  )
}

export default SortProduct