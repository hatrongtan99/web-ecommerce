import { ReactElement } from "react";
import Brands from "~components/admin/brands/Brands";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";

const BrandsPageAdmin = () => {
    return <Brands />;
};

BrandsPageAdmin.getLayout = (page: ReactElement) => {
    return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default BrandsPageAdmin;
