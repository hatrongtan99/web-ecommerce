import ProductItem from "~components/common/product/productItem/ProductItem";

const ProductList = ({ data }: { data: any }) => {
  return (
    <div style={{ width: "100%" }}>
      <div className="row g-0">
        {data.map((product: any) => (
          <div className="col-3" key={product._id}>
            <ProductItem brandImg={true} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
