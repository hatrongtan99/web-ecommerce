import {useState} from 'react';
import classNames from "classnames/bind";
import type {MouseEvent} from 'react';

import styles from '../../filter/filterProducts.module.scss';

import FilterInput from '~/components/custom/filterInput';
import { BrandProductResult } from '~/types/index';
import addQueryFilterInUrl from '~/utils/addQueryFilterInUrl';
import useInitialStateInFilters from '~/hook/useInitialStateInFilters';

const cx = classNames.bind(styles);

interface FilterProductsProps {
    dataAllBrands: BrandProductResult[]
}

const FilterByBrand = ({dataAllBrands}: FilterProductsProps) => {

    const initialStateDataSet = useInitialStateInFilters('brand_ID');

    const [dataSet, setDataSet] = useState<string[]>(initialStateDataSet);

    const handleClick = (e: MouseEvent<HTMLElement>) => {   
        const id = e.currentTarget.dataset.id as string;
        const exitsId = dataSet.find(d => d == id);
        if (exitsId) {
            setDataSet([...dataSet.filter(d => d !== exitsId)]);
        } else {
            setDataSet([...dataSet, id])
        }
    }

    addQueryFilterInUrl({keyQuery: 'brand_ID', value: dataSet});
    
  return (
    <div className={cx('filter-group')}>
        <h4>CHỌN THEO HÃNG SẢN XUẤT</h4>
    
        <div className={`row ${cx('input-group')}`}>
            {dataAllBrands && dataAllBrands.map(item => (
                <div className='col-6' key={item.idBrand} >
                    <FilterInput 
                        active={dataSet.includes(item.idBrand.toString())}
                        image={`${process.env.NEXT_PUBLIC_DB_HOST}/public/images/${item.brandThumb}`} 
                        data-id={item.idBrand}
                        handleclick={handleClick}
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default FilterByBrand