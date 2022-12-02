import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';
import LayoutAdmin from '~/components/admin/layoutAdmin';
import CreateProductForm from '~/components/layout/admin/createProductForm';

const CreateProduct: NextPageWithLayout = () => {
    return <CreateProductForm />;
};

CreateProduct.getLayout = function (page: ReactElement) {
    return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default CreateProduct;
