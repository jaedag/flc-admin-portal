import { useMutation, useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'
import {
  MAKE_GATHERINGSERVICEARRIVALS_ADMIN,
  SET_SWELL_DATE,
} from './arrivalsMutations'
import { GATHERINGSERVICE_ARRIVALS_DASHBOARD } from './arrivalsQueries'
import { alertMsg, throwErrorMsg } from 'global-utils'
import BaseComponent from 'components/base-component/BaseComponent'
import { Col, Container, Row, Button } from 'react-bootstrap'
import Popup from 'components/Popup/Popup'
import { Form, Formik } from 'formik'
import FormikControl from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'
import RoleView from 'auth/RoleView'
import { permitAdmin } from 'permission-utils'
import MenuButton from 'components/buttons/MenuButton'
import HeadingSecondary from 'components/HeadingSecondary'
import { getHumanReadableDate } from 'date-utils'

const GatheringServiceDashboard = () => {
  const { isOpen, togglePopup, gatheringServiceId } = useContext(ChurchContext)
  const navigate = useNavigate()
  const today = new Date().toISOString().slice(0, 10)
  const { data, loading, error } = useQuery(
    GATHERINGSERVICE_ARRIVALS_DASHBOARD,
    {
      variables: { id: gatheringServiceId, date: today },
    }
  )
  const [SetSwellDate] = useMutation(SET_SWELL_DATE)
  const [MakeGatheringServiceArrivalsAdmin] = useMutation(
    MAKE_GATHERINGSERVICEARRIVALS_ADMIN
  )
  const gatheringService = data?.gatheringServices[0]

  const initialValues = {
    adminName: gatheringService?.arrivalsAdmin
      ? `${gatheringService?.arrivalsAdmin?.firstName} ${gatheringService?.arrivalsAdmin?.lastName}`
      : '',
    adminSelect: gatheringService?.arrivalsAdmin?.id ?? '',
  }
  const validationSchema = Yup.object({
    adminSelect: Yup.string().required(
      'Please select an Admin from the dropdown'
    ),
  })

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)

    MakeGatheringServiceArrivalsAdmin({
      variables: {
        gatheringServiceId: gatheringServiceId,
        newAdminId: values.adminSelect,
        oldAdminId: initialValues.adminSelect || 'no-old-admin',
      },
    })
      .then(() => {
        togglePopup()
        onSubmitProps.setSubmitting(false)
        alert('Gathering Service Arrivals Admin has been changed successfully')
      })
      .catch((e) => throwErrorMsg(e))
  }

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary loading={loading}>
          {gatheringService?.name} Gathering Service Arrivals Summary
        </HeadingPrimary>
        <HeadingSecondary loading={loading}>
          Arrivals Admin: {gatheringService?.arrivalsAdmin?.fullName}
        </HeadingSecondary>
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

        <h4>{getHumanReadableDate(data?.timeGraphs[0].date, 'weekday')}</h4>
        <h5>{data?.timeGraphs[0].swell && `Swollen Weekend!`}</h5>

        <div className="d-grid gap-2">
          <RoleView roles={permitAdmin('GatheringService')}>
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => togglePopup()}
            >
              Change Arrivals Admin
            </Button>
          </RoleView>
          {data?.timeGraphs[0].swell ?? (
            <Button
              onClick={() => {
                const confirmBox = window.confirm(
                  'Do you want to set today as a swell day?'
                )

                if (confirmBox === true) {
                  SetSwellDate({
                    variables: { date: today },
                  }).then(() => alertMsg('Swell Date Set Succesffully'))
                }
              }}
            >
              Set Today as Swell
            </Button>
          )}
          <MenuButton
            title="Bacentas Yet to Submit"
            onClick={() => navigate('/arrivals/bacentas-no-activity')}
            icon
            iconBg
            noCaption
          />
          <MenuButton
            title="Bacentas That Have Submitted"
            onClick={() => navigate('/arrivals/bacentas-on-the-way')}
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

export default GatheringServiceDashboard
