import {useState, useEffect} from 'react';
import classNames from "classnames/bind";
import type {MouseEvent} from 'react';

import styles from '../../filter/filterProducts.module.scss';

import FilterInput from '~/components/custom/filterInput';

const cx = classNames.bind(styles);

interface test {
    idBrand: string;
    brandName: string;
    brandThumb: string;
}

const FilterByBrand = () => {
    const [data, setData] = useState<test[] | null>([]);
    const [dataSet, setDataSet] = useState<string[]>([])

    const fetchData = async () => {
        const res = await (await fetch('http://localhost:5000/api/brands')).json()
        setData(res.data)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleClick = (e: MouseEvent<HTMLElement>) => {   
        const id = e.currentTarget.dataset.id as string;
        const exitsId = dataSet.find(d => d == id);
        if (exitsId) {
            setDataSet([...dataSet.filter(d => d !== exitsId)]);
        } else {
            setDataSet([...dataSet, id])
        }
    }
    
  return (
    <div className={cx('filter-group')}>
        <h4>CHỌN THEO HÃNG SẢN XUẤT</h4>
    
        <div className={`row ${cx('input-group')}`}>
            {data && data.map(item => (
                <div className='col-6' key={item.idBrand}>
                    <FilterInput 
                        active={dataSet.includes(item.idBrand.toString())}
                        image={`http://localhost:5000/public/images/${item.brandThumb}`} 
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