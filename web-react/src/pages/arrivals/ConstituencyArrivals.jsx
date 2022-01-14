import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MenuButton from 'components/buttons/MenuButton'
import FormikControl from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'
import Popup from 'components/Popup/Popup'
import { ChurchContext } from 'contexts/ChurchContext'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { CONSTIUENCY_ARRIVALS_DASHBOARD } from './arrivalsQueries'
import { useNavigate } from 'react-router'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'

const ConstituencyArrivals = () => {
  const { isOpen, togglePopup, constituencyId } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(CONSTIUENCY_ARRIVALS_DASHBOARD, {
    variables: { id: constituencyId },
  })

  const constituency = data?.constituencies[0]

  const initialValues = {
    adminName: constituency?.admin
      ? `${constituency?.admin?.firstName} ${constituency?.admin?.lastName}`
      : '',
    adminSelect: constituency?.admin?.id ?? '',
  }
  const validationSchema = Yup.object({
    adminSelect: Yup.string().required(
      'Please select an Admin from the dropdown'
    ),
  })

  const onSubmit = (onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    // console.log(values)
    onSubmitProps.setSubmitting(false)
  }

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary loading={loading}>
          {constituency?.name} Constituency Arrivals
        </HeadingPrimary>
        {isOpen && (
          <Popup handleClose={togglePopup}>
            <b>Change Arrivals Admin</b>
            <p>Please enter the name of the new administrator</p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <Row className="form-row">
                    <Col>
                      <FormikControl
                        control="memberSearch"
                        name="adminSelect"
                        initialValue={initialValues?.adminName}
                        placeholder="Select an Admin"
                        setFieldValue={formik.setFieldValue}
                        aria-describedby="Member Search"
                        className="form-control"
                        error={formik.errors.admin}
                      />
                    </Col>
                  </Row>

                  <SubmitButton formik={formik} />
                </Form>
              )}
            </Formik>
          </Popup>
        )}

        <div className="d-grid gap-2">
          <Button
            variant="outline-secondary"
            size="lg"
            onClick={() => togglePopup()}
          >
            Change Arrivals Admin
          </Button>
          <MenuButton
            title="Bacentas Yet to Arrive"
            onClick={() => navigate('/arrivals/bacentas-not-arrived')}
            icon
            iconBg
            noCaption
          />
        </div>
      </Container>
    </BaseComponent>
  )
}

export default ConstituencyArrivals
