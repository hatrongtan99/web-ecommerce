import { MouseEvent, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './sortProducts.module.scss';
import useInitStateFilter from '~hook/useInitStateFilter';
import FilterInput from '~components/custom/filterInput/FilterInput';
import pushQueryUrl from '~utils/pushQueryUrl';

const cx = classNames.bind(styles);

const SortProduct = () => {
    const initialStateSortValue = useInitStateFilter('sort');

    const [sortValue, setSortValue] = useState<string[]>(initialStateSortValue);

    const handleCheckBox = (e: MouseEvent<HTMLElement>) => {
        if (sortValue.includes(e.currentTarget.dataset.sort as string)) {
            setSortValue([]);
        } else {
            setSortValue([e.currentTarget.dataset.sort as string]);
        }
    };

    pushQueryUrl('sort', sortValue);

    return (
        <div className={cx('sort-wrapper')}>
            <div className="d-flex justify-content-center align-items-center">
                <h6>Sắp xếp: </h6>
                <div className={cx('sort-item')}>
                    <FilterInput
                        active={sortValue.includes('asc')}
                        title="Giá thấp đến cao"
                        data-sort="asc"
                        handleclick={handleCheckBox}
                    />
                </div>
                <div className={cx('sort-item')}>
                    <FilterInput
                        active={sortValue.includes('desc')}
                        title="Giá cao đến thấp"
                        data-sort="desc"
                        handleclick={handleCheckBox}
                    />
                </div>
            </div>
        </div>
    );
};

export default SortProduct;
