import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const Test: NextPageWithLayout = () => {
  return (
    <div className='row'>
    </div>
  )
}

Test.getLayout = (page: ReactElement) => {
    return (
        <div>
            {page}
        </div>
    )
}
export default Test