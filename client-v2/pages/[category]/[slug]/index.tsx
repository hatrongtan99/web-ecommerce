import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import axiosClient from "~api/axiosConfig";
import { getDetailsProduct } from "~api/product.api";
import Breadcrumb from "~components/common/breabcrumb";
import TitleDeltailProduct from "~components/common/product/titleDeltalProduct/TitleDeltailProduct";
import Spinner from "~components/common/spiner/Spiner";
import ProductContent from "~components/layout/detailProduct/productContent/ProductContent";
import ProductDescription from "~components/layout/detailProduct/productDescription";

const ProductDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, isLoading } = useQuery(["detail-product", slug], () =>
    getDetailsProduct(axiosClient, slug as string)
  );
  return (
    <main className="main-content">
      <div className="container">
        <Breadcrumb />

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TitleDeltailProduct product={data?.product!} />

            <ProductContent product={data?.product!} />

            <ProductDescription
              description={""}
              catalog={data?.product.catalog!}
            />
          </>
        )}
      </div>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          category: "may-khoan-pin",
          slug: "may-khoan-van-vit-dung-pin-bosch-gsb-180-li",
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params!;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["detail-product", slug], () =>
    getDetailsProduct(axiosClient, slug as string)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProductDetail;
