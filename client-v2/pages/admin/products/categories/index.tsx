import { ReactElement } from "react";
import Categories from "~components/admin/categories/Categories";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";

const CategoriesPageAdmin = () => {
  return <Categories />;
};

CategoriesPageAdmin.getLayout = (page: ReactElement) => {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default CategoriesPageAdmin;
