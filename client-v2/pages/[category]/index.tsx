import { GetServerSideProps } from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import FilterLayout from "~components/common/filter/FilterLayout";
import { getAllBrand } from "~api/brand.api";
import ProductList from "~components/layout/productList/ProductList";
import Breadcrumb from "~components/common/breabcrumb/Breabcrum";
import ProductSpecial from "~components/layout/productSpecial/ProductSpecial";
import SortProduct from "~components/common/product/sortProducts/SortProduct";
import { getProductByCategory } from "~api/product.api";

const Category = () => {
  const router = useRouter();
  const { category } = router.query;

  const { data, isSuccess } = useQuery(
    ["list-product-by-category", category, router.query],
    () => getProductByCategory(category as string, router.query),
    { refetchOnWindowFocus: false }
  );

  return (
    <main className="main-content">
      <Breadcrumb
        listPath={[
          {
            name: data?.data.name! ?? "",
            path: data?.data.slug! ?? "",
          },
        ]}
      />
      <div className="container">
        <div className="row">
          <div className="col-3">
            <FilterLayout />
          </div>
          <div className="col-9">
            <ProductSpecial />
            <SortProduct />
            {isSuccess ? <ProductList data={data?.data.products} /> : null}
          </div>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { category } = context.params!;

  await queryClient.prefetchQuery(["brands"], () => getAllBrand());

  await queryClient.prefetchQuery(
    ["list-product-by-category", category, context.query],
    () => getProductByCategory(category as string, context.query)
  );

  await queryClient.prefetchQuery(["list-product-special"], () =>
    getProductByCategory(category as string, {
      page: 1,
      limit: 8,
    })
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Category;
