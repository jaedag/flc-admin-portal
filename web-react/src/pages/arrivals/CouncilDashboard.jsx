import { useMutation, useQuery } from '@apollo/client'
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
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { COUNCIL_ARRIVALS_DASHBOARD } from './arrivalsQueries'
import { useNavigate } from 'react-router'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import RoleView from 'auth/RoleView'
import { permitAdminAndThoseAbove, throwErrorMsg } from 'global-utils'
import { MAKE_COUNCILARRIVALS_ADMIN } from './arrivalsMutations'

const CouncilDashboard = () => {
  const { isOpen, togglePopup, councilId } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(COUNCIL_ARRIVALS_DASHBOARD, {
    variables: { id: councilId },
  })
  const [MakeCouncilArrivalsAdmin] = useMutation(MAKE_COUNCILARRIVALS_ADMIN)
  const council = data?.councils[0]

  const initialValues = {
    adminName: council?.arrivvalsAdmin
      ? `${council?.arrivvalsAdmin?.firstName} ${council?.arrivvalsAdmin?.lastName}`
      : '',
    adminSelect: council?.arrivvalsAdmin?.id ?? '',
  }
  const validationSchema = Yup.object({
    adminSelect: Yup.string().required(
      'Please select an Admin from the dropdown'
    ),
  })

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)

    MakeCouncilArrivalsAdmin({
      variables: {
        councilId: councilId,
        newAdminId: values.adminSelect,
        oldAdminId: initialValues.adminSelect || 'no-old-admin',
      },
    })
      .then(() => {
        togglePopup()
        onSubmitProps.setSubmitting(false)
        alert('Council Arrivals Admin has been changed successfully')
      })
      .catch((e) => throwErrorMsg(e))
  }

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary loading={loading}>
          {council?.name} Council Arrivals
        </HeadingPrimary>
        {isOpen && (
          <Popup handleClose={togglePopup}>
            <b>Change Arrivals Admin</b>
            <p>Please enter the name of the new arrivals rep</p>

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

        <Card>
          <Card.Header>Arrivals Summary</Card.Header>
        </Card>
        {/* <div className="d-grid gap-2">
          <RoleView roles={permitAdminAndThoseAbove('Council')}>
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => togglePopup()}
            >
              Change Arrivals Admin
            </Button>
          </RoleView>
          <MenuButton
            title="Bacentas Yet to Submit"
            onClick={() => navigate('/arrivals/bacentas-not-arrived')}
            icon
            iconBg
            noCaption
          />
          <MenuButton
            title="Bacentas That Have Submitted"
            onClick={() => navigate('/arrivals/bacentas-that-submitted')}
            icon
            iconBg
            noCaption
          />
          <MenuButton
            title="Bacentas That Have Been Counted"
            onClick={() => navigate('/arrivals/bacentas-have-been-counted')}
            icon
            iconBg
            noCaption
          />
        </div> */}
      </Container>
    </BaseComponent>
  )
}

export default CouncilDashboard
