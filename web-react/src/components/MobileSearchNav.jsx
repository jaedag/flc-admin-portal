import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import FormikControl from './formik-components/FormikControl'
import { SearchContext } from '../contexts/MemberContext'
import './MobileSearchNav.css'
import { Col, Button, Container } from 'react-bootstrap'

const MobileSearchNav = () => {
  const { searchKey, setSearchKey } = useContext(SearchContext)

  const initialValues = {
    searchKeyVal: searchKey ?? '',
  }

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    setSearchKey(values.searchKeyVal)
    onSubmitProps.setSubmitting(false)
  }

  return (
    <Container>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form>
            <div className="form-row ">
              <Col className="col-auto px-0 d-flex align-items-center">
                <FormikControl
                  className="nav-search-box"
                  control="input"
                  name="searchKeyVal"
                  placeholder="Search for anything..."
                  aria-describedby="Global Search"
                />
                <Button className="nav-search-btn" type="submit">
                  Search
                </Button>
              </Col>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default MobileSearchNav
