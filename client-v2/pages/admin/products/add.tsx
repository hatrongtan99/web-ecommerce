import { ReactElement } from "react";
import CreateProductForm from "~components/admin/createProductForm/CreateProductForm";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";

const AddProductPage = () => {
  return <CreateProductForm />;
};

AddProductPage.getLayout = (page: ReactElement) => {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default AddProductPage;
