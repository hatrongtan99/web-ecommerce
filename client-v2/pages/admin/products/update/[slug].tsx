import { ReactElement } from "react";
import UpdateProduct from "~components/admin/updateProduct/UpdateProduct";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";

const UpdateIndex = () => {
    return <UpdateProduct />;
};

UpdateIndex.getLayout = (page: ReactElement) => {
    return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default UpdateIndex;
