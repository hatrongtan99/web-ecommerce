import classNames from 'classnames/bind';
import FilterByBrand from './FilterByBrand';

import styles from './filter.module.scss';
import FilterSpecialField from './FilterSpecialField';
import filter from '~data/filter';

const cx = classNames.bind(styles);

const FilterLayout = () => {
    return (
        <div className={cx('filter-container')}>
            {/* filter brand */}
            <FilterByBrand />

            {/* filter price */}
            <FilterSpecialField
                title="GIÁ BÁN"
                data={filter.price}
                queryField="price"
            />

            {/* filter type */}
            <FilterSpecialField
                title="LOẠI MÁY KHOAN"
                data={filter.filter.specialField.type}
                queryField="type"
            />

            {/* filter powerType*/}
            <FilterSpecialField
                title="LOẠI NĂNG LƯỢNG"
                data={filter.filter.specialField.powerType}
                queryField="powerType"
            />

            {/* filter wattage*/}
            <FilterSpecialField
                title="CÔNG SUẤT MÁY KHOAN"
                data={filter.filter.specialField.wattage}
                queryField="wattage"
            />

            {/* filter battery*/}
            <FilterSpecialField
                title="ĐIỆN THẾ PIN"
                data={filter.filter.specialField.battery}
                queryField="battery"
            />
        </div>
    );
};

export default FilterLayout;
