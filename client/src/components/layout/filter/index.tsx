import classNames from 'classnames/bind';
import styles from './filterProducts.module.scss';

import FilterByBrand from './filterByBrand';
import FilterByPrice from './filterByPrice';

const cx = classNames.bind(styles);

const FilterProducts = () => {
    return (
        <div className={cx('filter-wrapper')}>
            <FilterByBrand/>
            <FilterByPrice/>
        </div>
    )
}

export default FilterProducts