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
import { CONSTITUENCY_ARRIVALS_DASHBOARD } from './arrivalsQueries'
import { useNavigate } from 'react-router'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import RoleView from 'auth/RoleView'
import { throwErrorMsg } from 'global-utils'
import { MAKE_CONSTITUENCYARRIVALS_ADMIN } from './arrivalsMutations'
import { permitAdmin, permitArrivals } from 'permission-utils'
import HeadingSecondary from 'components/HeadingSecondary'
import { MemberContext } from 'contexts/MemberContext'

const ConstituencyDashboard = () => {
  const { isOpen, togglePopup } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(CONSTITUENCY_ARRIVALS_DASHBOARD, {
    variables: { id: currentUser?.currentChurch.id },
  })
  const [MakeConstituencyArrivalsAdmin] = useMutation(
    MAKE_CONSTITUENCYARRIVALS_ADMIN
  )
  const constituency = data?.constituencies[0]

  const initialValues = {
    adminName: constituency?.arrivalsAdmin
      ? `${constituency?.arrivalsAdmin?.fullName}`
      : '',
    adminSelect: constituency?.arrivalsAdmin?.id ?? '',
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
        constituencyId: currentUser?.currentChurch.id,
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
          {constituency?.name} Constituency Arrivals Summary
        </HeadingPrimary>
        <HeadingSecondary>{`Arrivals Rep: ${
          constituency?.arrivalsAdmin?.fullName ?? 'None'
        }`}</HeadingSecondary>
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
              variant="outline-secondary my-3"
              onClick={() => togglePopup()}
            >
              Change Arrivals Admin
            </Button>
          </RoleView>
          <MenuButton
            title="Bacentas With No Activity"
            onClick={() => navigate('/arrivals/bacentas-no-activity')}
            number={constituency?.bacentasNoActivityCount.toString()}
            color="red"
            iconBg
            noCaption
          />
          <MenuButton
            title="Bacentas Mobilising"
            onClick={() => navigate('/arrivals/bacentas-mobilising')}
            number={constituency?.bacentasMobilisingCount.toString()}
            color="orange"
            iconBg
            noCaption
          />
          <MenuButton
            title="Bacentas On The Way"
            onClick={() => navigate('/arrivals/bacentas-on-the-way')}
            number={constituency?.bacentasOnTheWayCount.toString()}
            color="yellow"
            iconBg
            noCaption
          />

          <MenuButton
            title="Bacentas That Have Arrived"
            onClick={() => navigate('/arrivals/bacentas-have-arrived')}
            number={constituency?.bacentasHaveArrivedCount.toString()}
            color="green"
            iconBg
            noCaption
          />
          <div className="mt-5 d-grid gap-2">
            <MenuButton
              title="Members On The Way"
              number={constituency?.bussingMembersOnTheWayCount.toString()}
              color="yellow"
              iconBg
              noCaption
            />
            <MenuButton
              title="Members That Have Arrived"
              number={constituency?.bussingMembersHaveArrivedCount.toString()}
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

export default ConstituencyDashboard
