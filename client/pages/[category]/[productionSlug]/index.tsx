import React from 'react';
import {NextPage} from 'next';
import MainLayout from '~/components/layout/MainLayout';
import TitleDeltailProduct from '~/components/layout/titleDeltalProduct';
import ProductContent from '~/components/layout/productContent';
import ProductDescription from '~/components/layout/productDescription';


const ProductionSlug: NextPage = () => {

  return (
    <MainLayout>
      <main className='container'>
        <p>breadcrumbContent</p>

        <TitleDeltailProduct/>

        <ProductContent/>

        <ProductDescription/>
      </main>

    </MainLayout>
  )
}

export default ProductionSlug