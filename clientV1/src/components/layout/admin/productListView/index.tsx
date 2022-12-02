import {useState, useEffect, useRef} from 'react';
import classNames from "classnames/bind";
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { useRouter } from 'next/router';

import styles from './productListView.module.scss';
import InputCategoriesFillter from "~/components/component/inputCategoriesFillter";
import ButtonLoadExtraProducts from '~/components/component/buttonLoadExtraProducts';
import ProductList from './ProductList';
import { loadProductByCategory } from '~/utils/loadProduct';

const cx = classNames.bind(styles)

const ProductListView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const dataProducts = useAppSelector(state => state.products.dataByCategory)

    const categoryValueRef = useRef<string>('may-khoan-bua-be-tong');
    const [categoryValue, setCategoryValue] = useState<string>(categoryValueRef.current);
    

    useEffect(() => {
        categoryValueRef.current = categoryValue
    }, [categoryValue]);

    // fetch data
    useEffect(() => {
        loadProductByCategory(dispatch, categoryValue, router.query.page as string || '1')
    }, [categoryValue, dispatch, router.query.page])

  return (
    <div className='offset-2'>
        <h1 className={cx('title')}>Danh sách sản phẩm</h1>
        <div className={cx('wrapper')}>
            <div className='col-4 my-2'>
                <InputCategoriesFillter setCategoryValue={setCategoryValue}/>
            </div>
            {dataProducts?.metaData && dataProducts?.products &&
                <>
                    <div className={cx('product-list')}>
                        <ProductList 
                            products={dataProducts.products}
                        />
                    </div>
                    <ButtonLoadExtraProducts metaData={dataProducts.metaData} categoryProps={categoryValue}/>
                </>
            }
        </div>
    </div>
  )
}

export default ProductListView