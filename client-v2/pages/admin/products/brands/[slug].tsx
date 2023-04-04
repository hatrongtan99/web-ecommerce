import React, { ReactElement } from "react";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";

const UpdateBrandsPage = () => {
    return <div>UpdateBrandsPage</div>;
};

UpdateBrandsPage.getLayout = (page: ReactElement) => {
    return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default UpdateBrandsPage;
