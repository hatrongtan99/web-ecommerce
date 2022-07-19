import {useState} from 'react';
import { GetServerSideProps, NextPage } from 'next';
import {wrapper} from '~/redux/store';

import Button from '~/components/custom/button';
import MainLayout from '~/components/layout/MainLayout';
import ProductSpecial from '~/components/layout/productSpecial';
import SortProduct from '~/components/component/sortProducts';
import ProductList from '~/components/layout/productList';
import FilterProducts from '~/components/layout/filter';
import Breadcrumb from '~/components/component/breabcrumb';
import productionApi from '~/api/productions';

import type { ProductsByCategoryResult} from '~/types/index';
import { saveProductByCategory } from '~/redux/slice/productsSlice';


interface CategoryProps {
  data: ProductsByCategoryResult[]
}

const Category: NextPage<CategoryProps> = ({data}) => {
  const [sortValue, setSortValue] = useState<string>('');
  return (
    <MainLayout>
        {/* <main className='container'>
          <Breadcrumb/>
          <div className='row'>
            <div className='col-9'>
              
              <ProductSpecial/>
              <SortProduct sortValue={sortValue} setSortValue={setSortValue}/>
              <ProductList/>

              <div className='d-flex justify-content-center' style={{margin: '10px 0'}}>
                <Button size='lg'>
                  Xem thêm ... 
                </Button>
              </div>
            </div>

            <div className="col-3">
            <FilterProducts/>
            </div>
          </div>
        </main> */}
    </MainLayout>
  )
}
export default Category;

export const getServerSideProps: GetServerSideProps<CategoryProps> = wrapper.getServerSideProps(store => async ({params, query}) => {
  const {category} = params!
  let {page} = query
  try {
    const getProductsByCategory = await productionApi.getProductsByCategory(category as string, page = '1');

    store.dispatch(saveProductByCategory(getProductsByCategory.data))

    return {
      props: {
        data: getProductsByCategory.data
      }
    }
  } catch (error) {
    return {
      props: {data: []}
    }
  }
});