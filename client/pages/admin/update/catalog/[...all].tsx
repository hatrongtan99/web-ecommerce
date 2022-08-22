import { NextPageWithLayout } from 'pages/_app'
import { ReactElement } from 'react'

import LayoutAdmin from '~/components/admin/layoutAdmin'
import CreateOrUpdateCatalog from '~/components/layout/admin/updateProduct/CreateOrUpdateCatalog'

const EditProductByCategoryAndId: NextPageWithLayout = () => {
  return (
    <CreateOrUpdateCatalog/>
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