import { NextPageWithLayout } from 'pages/_app'
import { ReactElement } from 'react'

import LayoutAdmin from '~/components/admin/layoutAdmin'
import CreateOrUpdateDescription from '~/components/layout/admin/updateProduct/createOrUpdateDesc'

const EditProductByCategoryAndId: NextPageWithLayout = () => {
  return (
    <CreateOrUpdateDescription/>
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