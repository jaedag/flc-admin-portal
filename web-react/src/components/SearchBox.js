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
    console.log('Form data', values)
    onSubmitProps.resetForm()
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="form-inline d-none d-md-block">
          <div className="form-row">
            <div className="col-auto px-0 ">
              <FormikControl
                control="searchbox"
                name="searchKey"
                // label="Centre"
                placeholder="Search for anything..."
                setFieldValue={formik.setFieldValue}
                dataset="globalSearch"
                aria-describedby="Global Search"
              />
            </div>
            <div className="col p-0">
              <button
                className="btn btn-primary nav-search-button"
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
