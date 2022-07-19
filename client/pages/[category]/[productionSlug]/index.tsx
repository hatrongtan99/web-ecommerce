import React from 'react';
import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {useAppDispatch, useAppSelector} from '~/redux/hooks';
import { wrapper } from '~/redux/store';

import MainLayout from '~/components/layout/MainLayout';
import TitleDeltailProduct from '~/components/component/titleDeltalProduct';
import ProductContent from '~/components/layout/productContent';
import ProductDescription from '~/components/layout/productDescription';
import ProductsRelatedSlide from '~/components/component/slideShow/productsRelatedSlide';
import CommentBox from '~/components/layout/commentBox';
import Breadcrumb from '~/components/component/breabcrumb';

import productionApi from '~/api/productions';
import type {ProductBycategoryAndSlugResult, ProductsByCategoryResult} from '~/types/index';
import { saveProductByCategoryAndSlug } from '~/redux/slice/productsSlice';

interface ProductionProps {
  data: ProductBycategoryAndSlugResult;
}

const ProductionSlug: NextPage<ProductionProps> = ({data}) => {
  return (
    <MainLayout>
      <main className="main-content">
        <div className='container'>
          {/* <Breadcrumb/> */}

          {/* <TitleDeltailProduct/> */}

          <ProductContent/>

          {/* <ProductDescription/> */}

          <div className='col-8' style={{paddingBottom: '16px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd'}}>
            {/* <ProductsRelatedSlide title='SẢN PHẨM LIÊN QUAN'/> */}
            {/* <ProductsRelatedSlide title='SẢN PHẨM ĐÃ XEM'/> */}

          </div>
          <div className='col-8'>
            {/* <CommentBox/> */}
          </div>
        </div>
      </main>
    </MainLayout>
  )
}

export default ProductionSlug

interface CategoryResponse {
  categoryId: number;
  categoryName: string;
  categorySlug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: {params: {category: string, productionSlug: string}}[] = []
    const categories = await productionApi.getCategories();

    Promise.all(categories.data.map((categoryResponse: CategoryResponse) => productionApi.getProductsByCategory(categoryResponse.categorySlug, '1')))
    .then(results => {
      results.forEach(result => {
        const firtProductByCategory: ProductsByCategoryResult = result.data[0];
        paths.push({params: {category: firtProductByCategory.categorySlug, productionSlug: firtProductByCategory.slug}});
      })
    })

  return {
    paths : paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<ProductionProps> = wrapper.getStaticProps(store => async ({params}) => {
  const {category, productionSlug} = params!;
  try {
    const productBycategoryAndSlug = await productionApi.getProductBycategoryAndSlug(category as string, productionSlug as string);
    store.dispatch(saveProductByCategoryAndSlug(productBycategoryAndSlug.data));
    return {
      props: {
        data: productBycategoryAndSlug.data
      },
      revalidate: 10
    }
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: {}
      },
      redirect: {
        destination: '/'
      }
    }
  }
})