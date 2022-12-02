import { NextPageWithLayout } from 'pages/_app';
import React, { ReactElement } from 'react';
import LayoutAdmin from '~/components/admin/layoutAdmin';
import ProductListView from '~/components/layout/admin/productListView';

const ProductListViewPages: NextPageWithLayout = () => {
    return <ProductListView />;
};

ProductListViewPages.getLayout = (page: ReactElement) => {
    return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default ProductListViewPages;
