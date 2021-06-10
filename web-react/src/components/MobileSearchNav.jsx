import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import FormikControl from './formik-components/FormikControl'
import { SearchContext } from '../contexts/MemberContext'
import './MobileSearchNav.css'

const MobileSearchNav = () => {
  let history = useHistory()
  const { searchKey, setSearchKey } = useContext(SearchContext)

  const initialValues = {
    searchKey: searchKey || '',
  }

  const onSubmit = (values) => {
    setSearchKey(values.searchKey)
  }

  return (
    <nav className="navbar navbar-dark navbar-expand fixed-top mobile-search-nav">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form>
            <div className="form-row ">
              <div
                className="col-auto px-0 d-flex align-items-center"
                onClick={() => {
                  history.goBack()
                }}
              >
                <i className="fas fa-chevron-left fa-2x pr-3 text-secondary" />
              </div>
              <div className="col-auto px-0 d-flex align-items-center">
                <FormikControl
                  className="mobile-search-box m-0"
                  control="input"
                  name="searchKey"
                  placeholder="Search for anything..."
                  aria-describedby="Global Search"
                />
                <button
                  className="btn btn-primary nav-search-button mobile-search-button m-0"
                  type="submit"
                >
                  <i className="fas fa-search icon-color" />
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </nav>
  )
}

export default MobileSearchNav
