import ProductItem from "~components/common/product/productItem/ProductItem";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getProductByCategory } from "~api/product.api";
import axiosClient from "~api/axiosConfig";

const ProductList = () => {
  const router = useRouter();
  const { category } = router.query;

  const { data, isSuccess } = useQuery(
    ["list-product-by-category", category],
    () => getProductByCategory(axiosClient, category as string)
  );

  return (
    <div style={{ width: "100%" }}>
      <div className="row g-0">
        {(isSuccess &&
          data.data &&
          data.data.products.map((product) => (
            <div className="col-3" key={product._id}>
              <ProductItem brandImg={true} product={product} />
            </div>
          ))) ||
          (isSuccess && <h1>Không có sản phẩm nào hiển thị</h1>)}
      </div>
    </div>
  );
};

export default ProductList;
