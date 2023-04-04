import React, { ReactElement } from "react";
import ListOrderAdmin from "~components/admin/orders/ListOrderAdmin";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";

const ListOrdersPage = () => {
    return <ListOrderAdmin />;
};

ListOrdersPage.getLayout = (page: ReactElement) => {
    return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default ListOrdersPage;
