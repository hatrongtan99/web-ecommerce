import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

import LayoutAdmin from '~/components/admin/layoutAdmin';

const Admin: NextPageWithLayout = () => {
    return <h1>header</h1>;
};

Admin.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default Admin;
