import { ReactElement } from "react";
import ProductListView from "~components/admin/productListView/ProductListView";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";

const ProductsPage = () => {
  return <ProductListView />;
};

ProductsPage.getLayout = (page: ReactElement) => {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default ProductsPage;
