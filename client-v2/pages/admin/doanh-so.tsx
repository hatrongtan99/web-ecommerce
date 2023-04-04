import { ReactElement } from "react";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";

const DoanhSoPage = () => {
    return <div>aabcbcb</div>;
};

DoanhSoPage.getLayout = (page: ReactElement) => {
    return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default DoanhSoPage;
