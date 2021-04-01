import React, { useContext, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import FormikControl from '../components/formik-components/FormikControl'
import { GET_MINISTRIES } from '../queries/ListQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const SideBar = () => {
  const { setFilters } = useContext(ChurchContext)

  const initialValues = {
    gender: '',
    maritalStatus: '',
    occupation: '',
    leaderTitle: [],
    leaderRank: [],
    ministry: '',
  }

  useEffect(() => {
    setFilters({
      gender: '',
      maritalStatus: '',
      occupation: '',
      leaderTitle: [],
      leaderRank: [],
      ministry: '',
    })
    // eslint-disable-next-line
  }, [])

  const genderOptions = [
    { key: 'Male', value: 'Male' },
    { key: 'Female', value: 'Female' },
  ]
  const maritalStatusOptions = [
    { key: 'Single', value: 'Single' },
    { key: 'Married', value: 'Married' },
  ]

  const leaderOptions = [
    { key: 'CO', value: 'CO' },
    { key: 'Centre Leader', value: 'Centre Leader' },
    { key: 'Sonta Leader', value: 'Sonta Leader' },
    { key: 'Bacenta Leader', value: 'Bacenta Leader' },
    { key: 'Basonta Leader', value: 'Basonta Leader' },
  ]

  const leaderTitleOptions = [
    { key: 'Pastors', value: 'Pastors' },
    { key: 'Reverends', value: 'Reverends' },
    { key: 'Bishops', value: 'Bishops' },
  ]

  const location = useLocation()
  const history = useHistory()
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    setFilters(values)
    onSubmitProps.setSubmitting(false)

    location.pathname === '/filter-members' && history.push('/mb-members')
  }

  return (
    <nav id="sidebarMenu" className="sidebar filter-mobile">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => (
          <div className="container">
            <Form>
              <div className="form-group ">
                <div className="row pt-3">
                  <div className="col">
                    <h3>Filters</h3>
                  </div>
                  <div className="col-auto">
                    <button
                      type="submit"
                      disabled={!formik.isValid || formik.isSubmitting}
                      className="btn btn-primary"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>

                <div className="container-fluid infobar">Basic Info</div>
                <div className="row row-cols-1  ">
                  {/* <!-- Basic Info Div --> */}
                  <div className="col pb-2">
                    <FormikControl
                      label="Gender"
                      className="form-control"
                      control="radio"
                      name="gender"
                      options={genderOptions}
                    />
                  </div>
                  <div className="col pb-2">
                    <FormikControl
                      label="Marital Status"
                      className="form-control"
                      control="radio"
                      name="maritalStatus"
                      options={maritalStatusOptions}
                    />
                  </div>
                  {/* <div className="col pb-2">
                    <FormikControl
                      control="combobox"
                      name="occupation"
                      label="Occupation"
                      placeholder="Occupation"
                      setFieldValue={formik.setFieldValue}
                      optionsQuery={OCCUPATION_LIST}
                      queryVariable="searchKey"
                      suggestionText="occupation"
                      suggestionID="occupation"
                      dataset="occupationList"
                      aria-describedby="Occupation Options"
                    />
                  </div> */}
                  <div className="col">
                    <span className=" font-weight-bold" htmlFor="ministry">
                      Ministry
                    </span>
                    <FormikControl
                      className="form-control"
                      control="selectWithQuery"
                      name="ministry"
                      modifier="filter"
                      optionsQuery={GET_MINISTRIES}
                      queryVariable="id"
                      dataset="ministryList"
                      defaultOption="Select a Ministry"
                    />
                  </div>

                  <div className="col pb-2">
                    <span className=" font-weight-bold" htmlFor="leaderRank">
                      Leader Rank
                    </span>
                    <FormikControl
                      className="form-control"
                      name="leaderRank"
                      control="checkbox"
                      options={leaderOptions}
                    />
                  </div>
                  <div className="col pb-2">
                    <span className="font-weight-bold" htmlFor="leaderTitle">
                      Leader Title
                    </span>
                    <FormikControl
                      className="form-control"
                      name="leaderTitle"
                      control="checkbox"
                      options={leaderTitleOptions}
                    />
                  </div>
                </div>
                <div className="row row-cols-2 row-cols-md-1 mt-3">
                  <div className="col d-flex justify-content-center">
                    <button
                      type="submit"
                      disabled={!formik.isValid || formik.isSubmitting}
                      className="btn btn-primary px-4 py-3"
                    >
                      Apply Filters
                    </button>
                  </div>
                  <div className="col d-flex justify-content-center">
                    <button
                      type="reset"
                      className="btn btn-primary px-4 py-3"
                      onClick={() => {
                        setFilters({
                          gender: '',
                          maritalStatus: '',
                          occupation: '',
                          leaderTitle: [],
                          leaderRank: [],
                          ministry: '',
                        })
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </nav>
  )
}
