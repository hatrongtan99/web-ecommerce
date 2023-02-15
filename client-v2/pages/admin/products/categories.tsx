import { ReactElement } from "react";
import Categories from "~components/admin/categories/Categories";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";

const CategoriesPage = () => {
  return <Categories />;
};

CategoriesPage.getLayout = (page: ReactElement) => {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default CategoriesPage;
