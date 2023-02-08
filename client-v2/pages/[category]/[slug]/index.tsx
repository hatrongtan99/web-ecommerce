import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { getDetailsProduct } from "~api/product.api";
import Breadcrumb from "~components/common/breabcrumb/Breabcrum";
import TitleDeltailProduct from "~components/common/product/titleDeltalProduct/TitleDeltailProduct";
import Spinner from "~components/common/spiner/Spiner";
import ProductContent from "~components/layout/detailProduct/productContent/ProductContent";
import ProductDescription from "~components/layout/detailProduct/productDescription/ProductDescription";
import ProductsRelatedSlide from "~components/layout/productsRelatedSlide/ProductsRelatedSlide";
import Comment from "~components/layout/comment/Comment";
import Rating from "~components/layout/rating/Rating";
import { ToastContainer } from "react-toastify";

const ProductDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading } = useQuery(["detail-product", slug], () =>
    getDetailsProduct(slug as string)
  );

  return (
    <main className="main-content">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Breadcrumb
            listPath={[
              {
                name: data?.product.categories[0]?.name!,
                path: data?.product.categories[0]?.slug!,
              },
              {
                name: data?.product.name_product!,
                path: data?.product.slug!,
              },
            ]}
          />
          <div className="container">
            <TitleDeltailProduct product={data?.product!} />

            <ProductContent product={data?.product!} />

            <ProductDescription
              description={data?.product.desc}
              catalog={data?.product.catalog!}
            />

            <div className="col-8">
              <Rating
                id={data?.product._id!}
                productName={data?.product.name_product!}
              />

              <ProductsRelatedSlide
                title="Sản phẩm liên quan"
                relate={{
                  id: data?.product._id,
                  relate: data?.product.specialField,
                  category: data?.product.categories[0],
                }}
              />

              <Comment id={data?.product._id!} />
            </div>
          </div>
        </>
      )}
      <ToastContainer />
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
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { category, slug } = context.params!;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["detail-product", slug], () =>
    getDetailsProduct(slug as string)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProductDetail;
