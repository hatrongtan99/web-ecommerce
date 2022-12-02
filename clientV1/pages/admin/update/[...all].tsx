import { NextPageWithLayout } from 'pages/_app'
import { ReactElement } from 'react'

import LayoutAdmin from '~/components/admin/layoutAdmin'
import UpdateProductCore from '~/components/layout/admin/updateProduct/UpdateProductCore'

const EditProductByCategoryAndId: NextPageWithLayout = () => {
  return (
    <UpdateProductCore/>
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