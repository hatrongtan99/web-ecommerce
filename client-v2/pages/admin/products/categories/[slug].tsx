import React, { ReactElement } from "react";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";

const UpdateCategoryPage = () => {
    return <div>UpdateCategoryPage</div>;
};

UpdateCategoryPage.getLayout = (page: ReactElement) => {
    return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default UpdateCategoryPage;
