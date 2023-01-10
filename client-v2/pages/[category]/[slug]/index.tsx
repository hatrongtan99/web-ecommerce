import React from 'react';
import Breadcrumb from '~components/common/breabcrumb';
import TitleDeltailProduct from '~components/common/product/titleDeltalProduct/TitleDeltailProduct';
import ProductContent from '~components/layout/detailProduct/productContent/ProductContent';
import ProductDescription from '~components/layout/detailProduct/productDescription';

const ProductDetail = () => {
    return (
        <main className="main-content">
            <div className="container">
                <Breadcrumb />

                <TitleDeltailProduct />

                <ProductContent />

                <ProductDescription />
            </div>
        </main>
    );
};

export default ProductDetail;
