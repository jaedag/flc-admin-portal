import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
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
import DashboardButton from '../buttons/DashboardButton'

const DisplayChurchDetails = (props) => {
  const {
    name,
    leaderTitle,
    leaderName,
    leaderId,
    admin,
    subChurch,
    subChurchBasonta,
    churchType,
    membership,
    buttons,
    buttonsSecondRow,
    basontaLeaders,
    editlink,
    history,
    breadcrumb,
  } = props
  const isConstituency = churchType === 'Campus' || churchType === 'Town'
  const { setMemberId } = useContext(MemberContext)
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
    adminName: admin ? `${admin?.firstName} ${admin.lastName}` : '',
    adminSelect: admin?.id ?? '',
  }
  const validationSchema = Yup.object({
    adminSelect: Yup.string().required(
      'Please select an Admin from the dropdown'
    ),
  })
  const onSubmit = (values, onSubmitProps) => {
    if (
      churchType === 'Town'
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
      churchType === 'Campus'
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
    <>
      <div className=" py-2 top-heading title-bar mt-4">
        <div className="container ">
          <Breadcrumb breadcrumb={breadcrumb} />
          <h3 className="mx-3 mt-3 font-weight-bold">
            {`${name} ${churchType}`}
            <RoleView roles={props.editPermitted}>
              <EditButton link={editlink} />
            </RoleView>
          </h3>
          {admin && (
            <Link
              to="/member/displaydetails"
              onClick={() => {
                clickCard(admin)
              }}
              className="mx-3 mb-2 text-muted font-weight-bold"
            >
              {`Admin:`} {admin.firstName} {admin.lastName}
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
              <b>Change {`${churchType}`} Admin</b>
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
        </div>
      </div>

      <div className="container">
        <div className="row detail-top-margin ml-2 text-secondary">Details</div>
        <div className="row row-cols-3 detail-bottom-margin">
          <Link
            className="col-9 col-md-6 col-lg-4"
            to={`/${churchType.toLowerCase()}/members`}
          >
            <DetailsCard heading="Membership" detail={membership} />
          </Link>
          <Link
            to="/member/displaydetails"
            onClick={() => {
              setMemberId(leaderId)
            }}
            className="col-9 col-md-6 col-lg-4"
          >
            <DetailsCard heading={leaderTitle} detail={leaderName} />
          </Link>
          <div className="col-9 col-md-6 col-lg-4">
            <DetailsCard
              heading={props.churchHeading}
              detail={props.churchCount}
              heading2={props.church2Heading}
              detail2={props.church2Count}
            />
          </div>
          <div className="col-9 col-md-6 col-lg-4 pl-3">
            <DashboardButton btnLink={`/${churchType.toLowerCase()}/reports`}>
              View Records
            </DashboardButton>
            {!props.alreadyFilled && (
              <DashboardButton
                btnLink={`/${churchType.toLowerCase()}/record-service`}
              >
                Fill Service Form
              </DashboardButton>
            )}
          </div>
        </div>
      </div>

      {subChurch && buttons[0] ? (
        <>
          <div className="container">
            <hr className="hr-line" />

            <div className="row justify-content-between">
              <div className="col">
                <p className="text-secondary">{`${subChurch} Locations`}</p>
              </div>
              <div className="col-auto">
                <Link
                  className="card text-secondary px-1"
                  to={`/${subChurch.toLowerCase()}/displayall`}
                >
                  {`View All ${plural(subChurch)}`}
                </Link>
              </div>
            </div>
          </div>

          <div className="container mb-4 card-button-row">
            <table>
              <tbody>
                <tr>
                  {buttons.map((church, index) => {
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

      {subChurchBasonta === 'Sonta' ? (
        <>
          <div className="container">
            <hr className="hr-line" />

            <div className="row justify-content-between">
              <div className="col">
                <p className="text-secondary">{`${subChurchBasonta} Locations`}</p>
              </div>
              <div className="col-auto">
                <Link
                  className="card text-secondary px-1"
                  to={`/${subChurchBasonta.toLowerCase()}/displayall`}
                >
                  {`View All ${plural(subChurchBasonta)}`}
                </Link>
              </div>
            </div>
          </div>

          <div className="container mb-4 card-button-row">
            <table>
              <tbody>
                <tr>
                  {buttonsSecondRow.map((church, index) => {
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

      {subChurch && basontaLeaders?.length ? (
        <>
          <div className="container">
            <hr className="hr-line" />

            <div className="row justify-content-between">
              <div className="col">
                <p className="text-secondary">{`${subChurch}`}</p>
              </div>
              <div className="col-auto">
                <Link
                  className="card text-secondary px-1"
                  to={`/${subChurch.toLowerCase()}/displayall`}
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
                  {basontaLeaders &&
                    basontaLeaders.map((leader, index) => {
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

      {history && (
        <div className="container px-3">
          <h5>Church History</h5>
          <Timeline record={history} modifier="church" limit={5} />
        </div>
      )}
    </>
  )
}

export default DisplayChurchDetails
