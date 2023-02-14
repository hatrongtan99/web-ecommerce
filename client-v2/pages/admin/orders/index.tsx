import React, { ReactElement } from "react";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";

const ListOrdersPage = () => {
  return <>list order page</>;
};

ListOrdersPage.getLayout = (page: ReactElement) => {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default ListOrdersPage;
