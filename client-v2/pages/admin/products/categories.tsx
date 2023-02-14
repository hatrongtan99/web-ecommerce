import { ReactElement } from "react";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";

const CategoriesPage = () => {
  return <>categoripage</>;
};

CategoriesPage.getLayout = (page: ReactElement) => {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default CategoriesPage;
