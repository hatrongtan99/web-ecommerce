import { GetServerSideProps, NextPage } from 'next';
import {wrapper} from '~/redux/store';
import { useAppSelector } from '~/redux/hooks'; 

import MainLayout from '~/components/layout/MainLayout';
import ProductSpecial from '~/components/layout/productSpecial';
import SortProduct from '~/components/component/sortProducts';
import ProductList from '~/components/layout/productList';
import FilterProducts from '~/components/layout/filter';
import Breadcrumb from '~/components/component/breabcrumb';
import productionApi from '~/api/productions';

import type { BrandProductResult, ProductsByCategoryResult} from '~/types/index';
import { saveProductByCategory } from '~/redux/slice/productsSlice';
import ButtonLoadExtraProducts from '~/components/component/buttonLoadExtraProducts';


interface CategoryProps {
  data: ProductsByCategoryResult[];
  dataAllBrands: BrandProductResult[]
}

const Category: NextPage<CategoryProps> = ({data, dataAllBrands}) => {
  useAppSelector(state => console.log(state.products.dataByCategory))
  return (
    <MainLayout>
        <main className='container'>
          <Breadcrumb/>
          <div className='row'>
            <div className='col-9'>
              
              <ProductSpecial/>
              <SortProduct/>
              <ProductList/>

              <ButtonLoadExtraProducts/>
            </div>

            <div className="col-3">
            <FilterProducts dataAllBrands={dataAllBrands}/>
            </div>
          </div>
        </main>
    </MainLayout>
  )
}
export default Category;

export const getServerSideProps: GetServerSideProps<CategoryProps> = wrapper.getServerSideProps(store => async ({params, query}) => {
  let {page = '1', category, ...rest} = query;
  try {
    const getProductsByCategory = productionApi.getProductsByCategory(category as string, page as string, rest);
    const getAllBrands = productionApi.getAllBrands();

    const [dataProductByCategory, dataAllBrands] = await Promise.all([getProductsByCategory, getAllBrands]);
    store.dispatch(saveProductByCategory(dataProductByCategory.data))
    return {
      props: {
        data: dataProductByCategory.data,
        dataAllBrands: dataAllBrands.data
      }
    }
  } catch (error) {
    return {
      props: {
        data: [],
        dataAllBrands: []
      }
    }
  }
});