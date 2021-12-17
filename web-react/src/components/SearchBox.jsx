import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import FormikControl from './formik-components/FormikControl'
import * as Yup from 'yup'
import { Col, Button, Nav } from 'react-bootstrap'
import './SearchBox.css'
import { SearchContext } from 'contexts/MemberContext'
import { useHistory } from 'react-router'

function SearchBox() {
  const { setSearchKey } = useContext(SearchContext)
  const history = useHistory()
  const initialValues = {
    searchKeyVal: '',
  }
  const validationSchema = Yup.object({
    searchKeyVal: Yup.string().required(''),
  })

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    setSearchKey(values.searchKeyVal)
    onSubmitProps.setSubmitting(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="form-row">
          <Col className="d-flex mt-2">
            <FormikControl
              control="input"
              className="nav-search-box"
              name="searchKeyVal"
              placeholder="Search for anything..."
              aria-describedby="Global Search"
            />

            <Nav.Link className="m-0 p-0" as="div" eventKey={10}>
              <Button
                className="nav-search-btn"
                type="submit"
                onClick={() => {
                  setSearchKey(formik.values.searchKey)
                  history.push('/search-results')
                }}
              >
                Search
              </Button>
            </Nav.Link>
          </Col>
        </Form>
      )}
    </Formik>
  )
}

export default SearchBox
