import React from 'react'
import { Formik, Form } from 'formik'
import FormikControl from './formik-components/FormikControl'
import * as Yup from 'yup'

function SearchBox() {
  const initialValues = {
    searchKey: '',
  }
  const validationSchema = Yup.object({
    searchKey: Yup.string().required(''),
  })

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.resetForm()
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className=" d-none d-md-block">
          <div className="form-row">
            <div className="col-auto px-0 d-flex align-items-center mt-2">
              <FormikControl
                control="searchbox"
                name="searchKey"
                // label="Centre"
                placeholder="Search for anything..."
                setFieldValue={formik.setFieldValue}
                dataset="globalSearch"
                aria-describedby="Global Search"
              />

              <button
                className="btn btn-primary nav-search-button m-0"
                type="submit"
              >
                <i className="fas fa-search icon-color" />
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SearchBox
