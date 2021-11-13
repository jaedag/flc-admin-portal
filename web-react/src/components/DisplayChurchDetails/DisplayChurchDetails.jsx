import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import DetailsCard from '../card/DetailsCard'
import { MemberContext } from '../../contexts/MemberContext'
import { ChurchContext } from '../../contexts/ChurchContext'
import Timeline from '../Timeline/Timeline'
import EditButton from '../buttons/EditButton'
import MemberDisplayCard from '../card/MemberDisplayCard'
import ChurchButton from '../buttons/ChurchButton'
import './DisplayChurchDetails.css'
import RoleView from '../../auth/RoleView'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Popup from '../Popup/Popup'
import { BISHOP_MEMBER_DROPDOWN } from '../../queries/ListQueries'
import { useMutation } from '@apollo/client'
import { MAKE_TOWN_ADMIN, MAKE_CAMPUS_ADMIN } from './AdminMutations'
import FormikControl from '../formik-components/FormikControl'
import { plural } from '../../global-utils'
import Breadcrumb from './Breadcrumb'
import { Button, Col, Container, Row } from 'react-bootstrap'
import PlaceholderCustom from 'components/Placeholder'
import { Geo } from 'react-bootstrap-icons'
import ViewAll from 'components/buttons/ViewAll'

const DisplayChurchDetails = (props) => {
  const history = useHistory()
  const isConstituency =
    props.churchType === 'Campus' || props.churchType === 'Town'
  const { setMemberId, theme } = useContext(MemberContext)
  const {
    clickCard,
    togglePopup,
    isOpen,
    campusId,
    townId,
    bishopId,
  } = useContext(ChurchContext)

  //Change Admin Initialised

  const [MakeTownAdmin] = useMutation(MAKE_TOWN_ADMIN)
  const [MakeCampusAdmin] = useMutation(MAKE_CAMPUS_ADMIN)

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
    if (
      props.churchType === 'Town'
      // &&
      // initialValues.adminSelect !== values.adminSelect
    ) {
      MakeTownAdmin({
        variables: {
          townId: townId,
          newAdminId: values.adminSelect,
          oldAdminId: initialValues.adminSelect,
        },
      })
        .then(() => alert('Town Admin has been changed successfully'))
        .catch((e) => alert(e))
    } else if (
      props.churchType === 'Campus'
      // &&
      // initialValues.adminSelect !== values.adminSelect
    ) {
      MakeCampusAdmin({
        variables: {
          campusId: campusId,
          newAdminId: values.adminSelect,
          oldAdminId: initialValues.adminSelect,
        },
      })
        .then(() => alert('Campus Admin has been changed successfully'))
        .catch((e) => alert(e))
    }

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    togglePopup()
  }
  //End of Admin Change

  return (
    <div className="scroll-bottom">
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
          {isConstituency && (
            <RoleView roles={['adminFederal', 'adminBishop']}>
              <input
                type="button"
                className={`btn btn-primary text-nowrap`}
                value="Change Admin"
                onClick={togglePopup}
              />
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
                    <div className="form-row">
                      <div className="col-9">
                        <FormikControl
                          control="combobox2"
                          name="adminSelect"
                          initialValue={initialValues?.adminName}
                          placeholder="Select an Admin"
                          setFieldValue={formik.setFieldValue}
                          optionsQuery={BISHOP_MEMBER_DROPDOWN}
                          queryVariable1="id"
                          variable1={bishopId}
                          queryVariable2="nameSearch"
                          suggestionText="name"
                          suggestionID="id"
                          dataset="bishopMemberDropdown"
                          aria-describedby="Bishop Member List"
                          className="form-control"
                          error={formik.errors.admin}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!formik.isValid || formik.isSubmitting}
                      className={`btn btn-primary text-nowrap px-4`}
                    >
                      Confirm Change
                    </button>
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
              heading={props.churchHeading}
              detail={props.churchCount}
            />
          </Col>
          <Col className="col-auto">
            <DetailsCard
              onClick={() =>
                history.push(`/${props.churchType.toLowerCase()}/members`)
              }
              heading="Members"
              detail={props.membership}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DetailsCard heading="Status" detail="Active" />
          </Col>
          <Col className="col-auto">
            <DetailsCard heading="Type" detail="Bacenta" />
          </Col>
          <Col>
            <DetailsCard heading="Code" detail="0202" />
          </Col>
        </Row>

        <hr />
        <div className="d-grid gap-2">
          <Button
            className={`btn-trends ${theme}`}
            onClick={() => {
              history.push(`/${props.churchType.toLowerCase()}/reports`)
            }}
          >
            View Trends
          </Button>
        </div>

        {location?.latitude && (
          <Container className="mt-4 text-center">
            <h3>LOCATION</h3>
            <p>Click here for directions</p>
            <a
              className="btn p-3"
              href={`https://www.google.com/maps/search/?api=1&query=${props.location?.latitude}%2C${props.location?.longitude}`}
            >
              <Geo size="75" />
            </a>
          </Container>
        )}
        <Container className="mt-4">
          <h3>FORMS</h3>
          {props.last3Weeks &&
            props.last3Weeks.map((week, i) => (
              <>
                <div key={i} className="text-secondary">
                  {`WEEK ${week.number}`}
                </div>
                <p>
                  Income Form -{' '}
                  <span
                    className={`${week.filled ? 'filled' : 'not-filled'}`}
                  >{`${week.filled ? 'Filled' : 'Not Filled'}`}</span>
                </p>
              </>
            ))}
        </Container>
      </Container>
      {props.subChurch && props.buttons[0] ? (
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
      ) : null}
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
                  {props.buttonsSecondRow.map((church, index) => {
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
      {props.history && (
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
    </div>
  )
}

export default DisplayChurchDetails
