import { NextPageWithLayout } from 'pages/_app'
import { ReactElement } from 'react'

import LayoutAdmin from '~/components/admin/layoutAdmin'
import UpdateProduct from '~/components/layout/admin/updateProduct'

const EditProductByCategoryAndId: NextPageWithLayout = () => {
  return (
    <UpdateProduct/>
  )
}

EditProductByCategoryAndId.getLayout = (page: ReactElement) => {
    return (
        <LayoutAdmin>
            {page}
        </LayoutAdmin>
    )
}

export default EditProductByCategoryAndId