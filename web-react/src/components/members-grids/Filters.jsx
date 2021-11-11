import { ChurchContext } from 'contexts/ChurchContext'
import {
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  TITLE_OPTIONS,
} from 'global-utils'
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Formik, Form } from 'formik'
import FormikControl from 'components/formik-components/FormikControl'
import { GET_MINISTRIES } from 'queries/ListQueries'
import { Col, Row, Button } from 'react-bootstrap'

const Filters = ({ ToggleAccordion }) => {
  const { setFilters, filters } = useContext(ChurchContext)
  const location = useLocation()
  const atPastors = location.pathname === '/pastors'

  const initialValues = {
    gender: filters.gender || [],
    maritalStatus: filters.maritalStatus || [],
    occupation: filters.occupation || '',
    leaderTitle: atPastors ? ['Pastor'] : filters.leaderTitle || [],
    leaderRank: filters.leaderRank || [],
    ministry: filters.ministry || [],
  }

  const LEADER_OPTIONS = [
    { key: 'CO', value: 'CO' },
    { key: 'Centre Leader', value: 'Centre Leader' },
    { key: 'Sonta Leader', value: 'Sonta Leader' },
    { key: 'Bacenta Leader', value: 'Bacenta Leader' },
    { key: 'Basonta Leader', value: 'Basonta Leader' },
    { key: 'Admin', value: 'Admin' },
  ]

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    setFilters(values)
    onSubmitProps.setSubmitting(false)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => (
        <Form>
          <div className="form-group ">
            <Row xs={1} md={2} className="mb-5">
              {/* <!-- Basic Info Div --> */}
              <Col className="pb-2">
                <FormikControl
                  label="Gender"
                  className="form-control"
                  control="checkbox"
                  name="gender"
                  options={GENDER_OPTIONS}
                />
              </Col>
              <Col className="col pb-2">
                <FormikControl
                  label="Marital Status"
                  className="form-control"
                  control="checkbox"
                  name="maritalStatus"
                  options={MARITAL_STATUS_OPTIONS}
                />
              </Col>

              <Col>
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
                  dataset="ministries"
                  defaultOption="Select a Ministry"
                />
              </Col>

              <Col className="pb-2">
                <FormikControl
                  label="Leader Rank"
                  className="form-control"
                  name="leaderRank"
                  control="checkbox"
                  options={LEADER_OPTIONS}
                />
              </Col>
              <Col className="pb-2">
                <FormikControl
                  label="Leader Title"
                  className="form-control"
                  name="leaderTitle"
                  control="checkbox"
                  options={TITLE_OPTIONS}
                />
              </Col>
            </Row>
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                type="reset"
                onClick={() => {
                  setFilters({
                    gender: [],
                    maritalStatus: [],
                    occupation: '',
                    leaderTitle: [],
                    leaderRank: [],
                    ministry: [],
                  })
                }}
              >
                Reset Filters
              </Button>

              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                <ToggleAccordion>Apply Filters</ToggleAccordion>
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Filters
