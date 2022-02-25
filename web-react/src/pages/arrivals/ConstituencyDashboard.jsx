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
import { Button, Col, Container, Row } from 'react-bootstrap'
import { CONSTIUENCY_ARRIVALS_DASHBOARD } from './arrivalsQueries'
import { useNavigate } from 'react-router'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import RoleView from 'auth/RoleView'
import { throwErrorMsg } from 'global-utils'
import { MAKE_CONSTITUENCYARRIVALS_ADMIN } from './arrivalsMutations'
import { permitAdmin, permitArrivals } from 'permission-utils'

const ConstituencyDashboard = () => {
  const { isOpen, togglePopup, constituencyId } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(CONSTIUENCY_ARRIVALS_DASHBOARD, {
    variables: { id: constituencyId },
  })
  const [MakeConstituencyArrivalsAdmin] = useMutation(
    MAKE_CONSTITUENCYARRIVALS_ADMIN
  )
  const constituency = data?.constituencies[0]

  const initialValues = {
    adminName: constituency?.arrivvalsAdmin
      ? `${constituency?.arrivvalsAdmin?.firstName} ${constituency?.arrivvalsAdmin?.lastName}`
      : '',
    adminSelect: constituency?.arrivvalsAdmin?.id ?? '',
  }
  const validationSchema = Yup.object({
    adminSelect: Yup.string().required(
      'Please select an Admin from the dropdown'
    ),
  })

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)

    MakeConstituencyArrivalsAdmin({
      variables: {
        constituencyId: constituencyId,
        newAdminId: values.adminSelect,
        oldAdminId: initialValues.adminSelect || 'no-old-admin',
      },
    })
      .then(() => {
        togglePopup()
        onSubmitProps.setSubmitting(false)
        alert('Constituency Arrivals Admin has been changed successfully')
      })
      .catch((e) => throwErrorMsg(e))
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
          <RoleView
            roles={[
              ...permitAdmin('Constituency'),
              ...permitArrivals('Council'),
            ]}
          >
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
        </div>
      </Container>
    </BaseComponent>
  )
}

export default ConstituencyDashboard
