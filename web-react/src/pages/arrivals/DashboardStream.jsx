import { useMutation, useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'
import { MAKE_STREAMARRIVALS_ADMIN } from './arrivalsMutations'
import { STREAM_ARRIVALS_DASHBOARD } from './arrivalsQueries'
import { throwErrorMsg } from 'global-utils'
import BaseComponent from 'components/base-component/BaseComponent'
import { Col, Container, Row, Button } from 'react-bootstrap'
import Popup from 'components/Popup/Popup'
import { Form, Formik } from 'formik'
import FormikControl from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'
import RoleView from 'auth/RoleView'
import {
  permitAdmin,
  permitArrivals,
  permitArrivalsHelper,
} from 'permission-utils'
import MenuButton from 'components/buttons/MenuButton'
import DefaulterInfoCard from 'pages/services/defaulters/DefaulterInfoCard'
import { MemberContext } from 'contexts/MemberContext'
import { CheckAll } from 'react-bootstrap-icons'

const StreamDashboard = () => {
  const { isOpen, togglePopup } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(STREAM_ARRIVALS_DASHBOARD, {
    variables: { id: currentUser?.currentChurch.id },
  })
  const [MakeStreamArrivalsAdmin] = useMutation(MAKE_STREAMARRIVALS_ADMIN)
  const stream = data?.streams[0]

  const initialValues = {
    adminName: stream?.arrivalsAdmin
      ? `${stream?.arrivalsAdmin?.firstName} ${stream?.arrivalsAdmin?.lastName}`
      : '',
    adminSelect: stream?.arrivalsAdmin?.id ?? '',
  }
  const validationSchema = Yup.object({
    adminSelect: Yup.string().required(
      'Please select an Admin from the dropdown'
    ),
  })

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)

    MakeStreamArrivalsAdmin({
      variables: {
        streamId: currentUser?.currentChurch.id,
        newAdminId: values.adminSelect,
        oldAdminId: initialValues.adminSelect || 'no-old-admin',
      },
    })
      .then(() => {
        togglePopup()
        onSubmitProps.setSubmitting(false)
        alert('stream Arrivals Admin has been changed successfully')
      })
      .catch((e) => throwErrorMsg(e))
  }

  const aggregates = {
    title: 'Councils',
    data: stream?.councilCount,
    link: `/arrivals/stream-by-council`,
  }

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary loading={loading}>
          {stream?.name} Stream Arrivals Summary
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
            roles={[...permitAdmin('Stream'), ...permitArrivals('Stream')]}
          >
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => togglePopup()}
            >
              Change Arrivals Admin
            </Button>
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => navigate('/stream/arrivals-helpers')}
            >
              Arrivals Helpers
            </Button>
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => navigate('/stream/arrival-times')}
            >
              Arrivals Times
            </Button>
          </RoleView>

          <DefaulterInfoCard defaulter={aggregates} />
          <MenuButton
            title="Bacentas With No Activity"
            onClick={() => navigate('/arrivals/bacentas-no-activity')}
            number={stream?.bacentasNoActivityCount.toString()}
            color="red"
            iconBg
            noCaption
          />
          <MenuButton
            title="Bacentas Mobilising"
            onClick={() => navigate('/arrivals/bacentas-mobilising')}
            number={stream?.bacentasMobilisingCount.toString()}
            color="orange"
            iconBg
            noCaption
          />
          <MenuButton
            title="Bacentas On The Way"
            onClick={() => navigate('/arrivals/bacentas-on-the-way')}
            number={stream?.bacentasOnTheWayCount.toString()}
            color="yellow"
            iconBg
            noCaption
          />
          <RoleView roles={permitArrivalsHelper('Stream')}>
            <MenuButton
              title="Bacentas To Be Counted"
              onClick={() => navigate('/arrivals/bacentas-to-count')}
              number={stream?.bacentasNotCountedCount.toString()}
              color="yellow"
              iconBg
              noCaption
            />
          </RoleView>
          <MenuButton
            title="Confirm Bacenta Arrival"
            onClick={() => navigate('/arrivals/confirm-bacenta-arrival')}
            iconComponent={CheckAll}
            iconBg
            noCaption
          />

          <MenuButton
            title="Bacentas That Have Arrived"
            onClick={() => navigate('/arrivals/bacentas-have-arrived')}
            number={stream?.bacentasHaveArrivedCount.toString()}
            iconBg
            color="green"
            noCaption
          />

          <div className="mt-5 d-grid gap-2">
            <MenuButton
              title="Members On The Way"
              number={stream?.bussingMembersOnTheWayCount.toString()}
              color="yellow"
              iconBg
              noCaption
            />
            <MenuButton
              title="Members That Have Arrived"
              number={stream?.bussingMembersHaveArrivedCount.toString()}
              color="green"
              iconBg
              noCaption
            />
          </div>
        </div>
      </Container>
    </BaseComponent>
  )
}

export default StreamDashboard
