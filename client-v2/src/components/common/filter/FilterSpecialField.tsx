import classNames from 'classnames/bind';
import styles from './filter.module.scss';

import FilterInput from '~components/custom/filterInput/FilterInput';
import useSetActiveFilterLayout from '~hook/useSetActiveFilterLayout';
import pushQueryUrl from '~utils/pushQueryUrl';

const cx = classNames.bind(styles);

interface FilterSpecialFieldProps {
    title: string;
    data: any;
    queryField: string;
}

const FilterSpecialField = ({
    title,
    data,
    queryField,
}: FilterSpecialFieldProps) => {
    const { active, handleClick } = useSetActiveFilterLayout();
    pushQueryUrl(queryField, active);
    return (
        <div className={cx('filter-group')}>
            <h4>{title}</h4>

            <div className={`row ${cx('input-group')}`}>
                {data.map((item: any) => (
                    <div className="col-6 g-0" key={item._id || item.id}>
                        <FilterInput
                            active={active.includes(item.id.toString())}
                            data-id={item.id}
                            handleclick={handleClick}
                            title={item.title}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterSpecialField;
