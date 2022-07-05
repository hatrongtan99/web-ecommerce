import classNames from "classnames/bind";
import { useState } from "react";

import {filterByPriceData} from '~/fakeData/filter';
import FilterInput from "~/components/custom/filterInput";
import styles from '../../filter/filterProducts.module.scss';
import type { MouseEvent } from "react";

const cx = classNames.bind(styles);

const FilterByPrice = () => {

    const [filterPrice, setFilterPrice] = useState<string[]>([])

    const handleclick = (e: MouseEvent<HTMLElement>) => {
        const datasetFilterPrice = e.currentTarget.dataset.filterprice as string;
        const existDataset = filterPrice.find(d => d == datasetFilterPrice);
        if (existDataset) {
            setFilterPrice(filterPrice.filter(d => d !== existDataset))
            return
        }
        setFilterPrice([...filterPrice, datasetFilterPrice])
    }

  return (
    <div className={cx('filter-group')}>
        <h4>GIÁ BÁN</h4>
    
        <div className={`row ${cx('input-group')}`}>
            {filterByPriceData.map(data => (
                <div className='col-6' key={data.id}>
                    <FilterInput active={filterPrice.includes(data.dataset)} title={data.title} handleclick={handleclick} data-filterprice={data.dataset}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default FilterByPrice