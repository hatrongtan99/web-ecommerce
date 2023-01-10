import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import FilterLayout from '~components/common/filter/FilterLayout';
import { getAllBrand } from '~api/brand.api';
import axiosClient from '~api/axiosConfig';
import ProductList from '~components/layout/productList/ProductList';
import Breadcrumb from '~components/common/breabcrumb';
import ProductSpecial from '~components/layout/productSpecial/ProductSpecial';
import SortProduct from '~components/common/product/sortProducts/SortProduct';
import { getProductByCategory } from '~api/product.api';

const Category = () => {
    return (
        <div className="container">
            <Breadcrumb />
            <div className="row">
                <div className="col-3">
                    <FilterLayout />
                </div>
                <div className="col-9">
                    {/* <ProductSpecial /> */}
                    <SortProduct />

                    <ProductList />
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();
    const { category } = context.params!;
    await queryClient.prefetchQuery(['brands'], () => getAllBrand(axiosClient));

    await queryClient.prefetchQuery(
        ['list-product-by-category', category],
        () => getProductByCategory(axiosClient, category as string)
    );

    return {
        props: { dehydratedState: dehydrate(queryClient) },
    };
};

export default Category;
