import classNames from 'classnames/bind';
import styles from './filterProducts.module.scss';
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from 'react';

import FilterByBrand from './filterByBrand';
import FilterByPrice from './filterByPrice';
import { BrandProductResult } from '~/types/index';
import { loadProductByCategory } from '~/utils/loadProduct';

const cx = classNames.bind(styles);

interface FilterProductsProps {
    dataAllBrands: BrandProductResult[]
}

const FilterProducts = ({dataAllBrands}: FilterProductsProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {page, category, ...rest} = router.query;

    useEffect(() => {
        loadProductByCategory(dispatch, category as string, page as string || '1', rest)
    }, [rest, category, dispatch, page]);

    return (
        <div className={cx('filter-wrapper')}>
            <FilterByBrand dataAllBrands={dataAllBrands}/>
            <FilterByPrice/>
        </div>
    )
}

export default FilterProducts