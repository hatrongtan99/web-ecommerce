import { ReactElement } from "react";
import DetailOrderAdmin from "~components/admin/orders/detailOrder/DetailOrderAdmin";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";

const DetailOrderPageAdmin = () => {
    return <DetailOrderAdmin />;
};

DetailOrderPageAdmin.getLayout = (page: ReactElement) => {
    return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default DetailOrderPageAdmin;
