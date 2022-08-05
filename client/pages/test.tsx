import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

import {Formik, Form, Field} from 'formik';
import Button from '~/components/custom/button';
const Test: NextPageWithLayout = () => {
  return (
    <div>
        form
        <Formik
            initialValues={{
                object: {
                    name: 'abc',
                    email: 'abc',
                }
            }}

            onSubmit={(values) => {
                console.log(values)
            }}
        >
            {() => (
                <Form>
                    <Field className='form-control' name='object.name'/>
                    <Field className='form-control' name='object.email'/>
                    <Button type='submit'>submit</Button>
                </Form>
            )}
        </Formik>
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