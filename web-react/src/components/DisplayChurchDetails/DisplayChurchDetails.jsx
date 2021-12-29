import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DetailsCard from '../card/DetailsCard'
import { MemberContext } from '../../contexts/MemberContext'
import { ChurchContext } from '../../contexts/ChurchContext'
import Timeline from '../Timeline/Timeline'
import EditButton from '../buttons/EditButton'
import MemberDisplayCard from '../card/MemberDisplayCard'
import ChurchButton from '../buttons/ChurchButton/ChurchButton'
import './DisplayChurchDetails.css'
import RoleView from '../../auth/RoleView'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Popup from '../Popup/Popup'
import { useMutation } from '@apollo/client'
import { MAKE_CONSTITUENCY_ADMIN } from './AdminMutations'
import FormikControl from '../formik-components/FormikControl'
import { plural, throwErrorMsg } from '../../global-utils'
import Breadcrumb from './Breadcrumb'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import PlaceholderCustom from 'components/Placeholder'
import { Geo, PencilSquare } from 'react-bootstrap-icons'
import ViewAll from 'components/buttons/ViewAll'

const DisplayChurchDetails = (props) => {
  const navigate = useNavigate()
  let needsAdmin

  let roles = []

  switch (props.churchType) {
    case 'Constituency':
      needsAdmin = true
      roles = ['adminFederal', 'adminStream', 'adminCouncil']
      break
    case 'Council':
      needsAdmin = true
      roles = ['adminFederal', 'adminStream']
      break
    case 'Stream':
      needsAdmin = true
      roles = ['adminFederal']
      break
    default:
      needsAdmin = false
      break
  }

  const { setMemberId, theme, setCurrentUser, currentUser } =
    useContext(MemberContext)
  const [submitting, setSubmitting] = useState(false)
  const { clickCard, togglePopup, isOpen, constituencyId } =
    useContext(ChurchContext)

  //Change Admin Initialised
  const [MakeConstituencyAdmin] = useMutation(MAKE_CONSTITUENCY_ADMIN)

  const initialValues = {
    adminName: props.admin
      ? `${props.admin?.firstName} ${props.admin.lastName}`
      : '',
    adminSelect: props.admin?.id ?? '',
  }
  const validationSchema = Yup.object({
    adminSelect: Yup.string().required(
      'Please select an Admin from the dropdown'
    ),
  })

  const onSubmit = (values, onSubmitProps) => {
    setSubmitting(true)

    MakeConstituencyAdmin({
      variables: {
        constituencyId: constituencyId,
        newAdminId: values.adminSelect,
        oldAdminId: initialValues.adminSelect ?? 'no-old-admin',
      },
    })
      .then(() => {
        togglePopup()
        setSubmitting(false)
        alert('Constituency Admin has been changed successfully')
      })
      .catch((e) => throwErrorMsg(e))

    onSubmitProps.resetForm()
  }
  //End of Admin Change

  return (
    <>
      <div className="py-2 top-heading title-bar">
        <Container>
          <Breadcrumb breadcrumb={props.breadcrumb} />
          <hr />
          <PlaceholderCustom as="h3" loading={!props.name} xs={12}>
            <h3 className="mx-3 mt-3 font-weight-bold">
              {`${props.name} ${props.churchType}`}
              <RoleView roles={props.editPermitted}>
                <EditButton link={props.editlink} />
              </RoleView>
            </h3>
          </PlaceholderCustom>

          {props.admin && (
            <Link
              to="/member/displaydetails"
              onClick={() => {
                clickCard(props.admin)
              }}
              className="mx-3 mb-2 text-muted font-weight-bold"
            >
              {`Admin:`} {props.admin.firstName} {props.admin.lastName}
            </Link>
          )}

          {needsAdmin && (
            <RoleView roles={roles}>
              <span
                className={`text-nowrap`}
                value="Change Admin"
                onClick={togglePopup}
              >
                <PencilSquare />
              </span>
            </RoleView>
          )}

          {isOpen && (
            <Popup handleClose={togglePopup}>
              <b>Change {`${props.churchType}`} Admin</b>
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

                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      className={`btn-main ${theme}`}
                      disabled={
                        !formik.isValid || formik.isSubmitting || submitting
                      }
                    >
                      {formik.isSubmitting || submitting ? (
                        <>
                          <Spinner animation="grow" size="sm" />
                          <span> Submitting</span>
                        </>
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Popup>
          )}
        </Container>
      </div>

      <Container>
        <Link
          to="/member/displaydetails"
          onClick={() => {
            setMemberId(props.leader?.id)
          }}
        >
          <DetailsCard
            loading={props.loading}
            heading={props.leaderTitle}
            detail={props.leader?.fullName}
            img={props.leader?.pictureUrl}
            bgNone
          />
        </Link>
        <Row>
          <Col>
            <DetailsCard
              onClick={() =>
                navigate(`/${props.subChurch.toLowerCase()}/displayall`)
              }
              heading={props.churchHeading}
              detail={!props.loading && (props.churchCount || '0')}
            />
          </Col>

          <Col className={!props.loading && `col-auto`}>
            <DetailsCard
              onClick={() =>
                navigate(`/${props.churchType?.toLowerCase()}/members`)
              }
              heading="Members"
              detail={!props.loading && (props.membership || '0')}
            />
          </Col>
        </Row>

        {props.details?.length && (
          <Row>
            {props.details.map((detail, i) => (
              <Col key={i} xs={detail.width ?? 6}>
                <DetailsCard
                  onClick={() => navigate(detail.link)}
                  heading={detail.title}
                  detail={!props.loading && (detail.number || '0')}
                />
              </Col>
            ))}
          </Row>
        )}

        <hr />
        <div className="d-grid gap-2">
          <Button
            className={`btn-trends ${theme}`}
            onClick={() => {
              navigate(`/${props.churchType.toLowerCase()}/reports`)
            }}
          >
            View Trends
          </Button>

          <Button
            className={`btn-trends ${theme}`}
            onClick={() => {
              setCurrentUser({
                ...currentUser,
                currentChurch: {
                  id: props.churchId,
                  name: props.name,
                  __typename: props.churchType,
                },
              })
              navigate(`/services/${props.churchType.toLowerCase()}`)
            }}
          >
            Service Forms
          </Button>
        </div>

        {props?.location && props.location?.latitude !== 0 && (
          <Container className="mt-4 text-center">
            <h3>LOCATION</h3>
            <p>Click here for directions</p>
            <a
              className="btn p-3"
              href={`https://www.google.com/maps/search/?api=1&query=${props?.location?.latitude}%2C${props?.location?.longitude}`}
            >
              <Geo size="75" />
            </a>
          </Container>
        )}

        {props.last3Weeks && props.details[0].number === 'Active' && (
          <>
            <h3 className="mt-4">FORMS</h3>
            {props.last3Weeks.map((week, i) => (
              <Container key={i} className="mt-4">
                <div className="text-secondary">{`WEEK ${week.number}`}</div>
                <p className="mb-0">
                  Income Form -{' '}
                  <span
                    className={`${week.filled ? 'filled' : 'not-filled'}`}
                  >{`${week.filled ? 'Filled' : 'Not Filled'}`}</span>
                </p>
                {week.banked && (
                  <p>
                    Banking Slip -{' '}
                    <span
                      className={`${week.banked ? 'filled' : 'not-filled'}`}
                    >{`${week.banked ? 'Submitted' : 'Not Submitted'}`}</span>
                  </p>
                )}
              </Container>
            ))}
          </>
        )}
      </Container>

      {props.subChurch && props.buttons?.length ? (
        <>
          <Container>
            <hr className="hr-line" />

            <div className="row justify-content-between">
              <div className="col">
                <p className="text-secondary">{`${props.subChurch} Locations`}</p>
              </div>
              <div className="col-auto">
                <Link
                  className="card text-secondary px-1"
                  to={`/${props.subChurch.toLowerCase()}/displayall`}
                >
                  {`View All ${plural(props.subChurch)}`}
                </Link>
              </div>
            </div>
          </Container>

          <div className="container mb-4 card-button-row">
            <table>
              <tbody>
                <tr>
                  {props.buttons.map((church, index) => {
                    if (index > 4) {
                      return null
                    }
                    return (
                      <td className="col-auto" key={index}>
                        <ChurchButton church={church} />{' '}
                      </td>
                    )
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Link
          className="card text-secondary px-1"
          to={`/${props.subChurch.toLowerCase()}/add${props.subChurch.toLowerCase()}`}
        >
          {`Add New ${props.subChurch}`}
        </Link>
      )}

      {props.subChurchBasonta === 'Sonta' ? (
        <>
          <div className="container">
            <hr className="hr-line" />

            <div className="row justify-content-between">
              <div className="col">
                <p className="text-secondary">{`${props.subChurchBasonta} Locations`}</p>
              </div>
              <div className="col-auto">
                <Link
                  className="card text-secondary px-1"
                  to={`/${props.subChurchBasonta.toLowerCase()}/displayall`}
                >
                  {`View All ${plural(props.subChurchBasonta)}`}
                </Link>
              </div>
            </div>
          </div>

          <div className="container mb-4 card-button-row">
            <table>
              <tbody>
                <tr>
                  {props.buttonsSecondRow?.map((church, index) => {
                    if (index > 4) {
                      return null
                    }
                    return (
                      <td className="col-auto" key={index}>
                        <ChurchButton church={church} />{' '}
                      </td>
                    )
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      {props.subChurch && props.basontaLeaders?.length ? (
        <>
          <div className="container">
            <hr className="hr-line" />

            <div className="row justify-content-between">
              <div className="col">
                <p className="text-secondary">{`${props.subChurch}`}</p>
              </div>
              <div className="col-auto">
                <Link
                  className="card text-secondary px-1"
                  to={`/${props.subChurch.toLowerCase()}/displayall`}
                >
                  View All
                </Link>
              </div>
            </div>
          </div>
          <div className="container card-button-row">
            <table>
              <tbody>
                <tr>
                  {props.basontaLeaders &&
                    props.basontaLeaders.map((leader, index) => {
                      return (
                        <td className="col-auto" key={index}>
                          <MemberDisplayCard member={leader} />
                        </td>
                      )
                    })}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      {props.history?.length && (
        <Container className="mt-5">
          <Row>
            <Col>
              <h3>CHURCH HISTORY</h3>
            </Col>
            <Col className="col-auto">
              <ViewAll to={`/${props.churchType.toLowerCase()}/history`} />
            </Col>
          </Row>

          <Timeline record={props.history} modifier="church" limit={5} />
        </Container>
      )}
    </>
  )
}

export default DisplayChurchDetails
