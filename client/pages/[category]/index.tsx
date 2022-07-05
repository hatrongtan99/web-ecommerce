import {useState} from 'react';
import { NextPage } from 'next';

import MainLayout from '~/components/layout/MainLayout';
import Button from '~/components/custom/button';
import ProductSpecial from '~/components/layout/productSpecial';
import SortProduct from '~/components/component/sortProducts';
import ProductList from '~/components/layout/productList';
import FilterProducts from '~/components/layout/filter';

const Category: NextPage = () => {
  const [sortValue, setSortValue] = useState<string>('')
  return (
    <MainLayout>
      <main className='container d-flex'>
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
      </main>
    </MainLayout>
  )
}

export default Category