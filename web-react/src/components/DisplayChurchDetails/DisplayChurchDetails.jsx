import React, { useContext, useState } from 'react'
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
import {
  MAKE_TOWN_ADMIN,
  MAKE_CAMPUS_ADMIN,
  REMOVE_TOWN_ADMIN,
  REMOVE_CAMPUS_ADMIN,
} from '../../queries/AdminMutations'
import FormikControl from '../formik-components/FormikControl'

const DisplayChurchDetails = (props) => {
  const {
    name,
    leaderTitle,
    leaderName,
    leaderId,
    admin,
    churchHeading,
    subChurch,
    churchType,
    churchNo,
    membership,
    buttons,
    basontaLeaders,
    editlink,
    history,
    breadcrumb,
  } = props

  const { setMemberId } = useContext(MemberContext)
  const { clickCard, campusId, townId, bishopId } = useContext(ChurchContext)
  //Change Admin Initialised

  const [MergeMemberIsTownAdminFor] = useMutation(MAKE_TOWN_ADMIN)
  const [RemoveMemberIsTownAdminFor] = useMutation(REMOVE_TOWN_ADMIN)
  const [MergeMemberIsCampusAdminFor] = useMutation(MAKE_CAMPUS_ADMIN)
  const [RemoveMemberIsCampusAdminFor] = useMutation(REMOVE_CAMPUS_ADMIN)
  const [isOpen, setIsOpen] = useState(false)
  const togglePopup = () => {
    setIsOpen(!isOpen)
  }
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
    if (churchType === 'Town') {
      RemoveMemberIsTownAdminFor({
        variables: {
          townId: townId,
          adminId: initialValues.adminSelect,
        },
      })

      MergeMemberIsTownAdminFor({
        variables: {
          townId: townId,
          adminId: values.adminSelect,
        },
      })
    } else if (churchType === 'Campus') {
      RemoveMemberIsCampusAdminFor({
        variables: {
          campusId: campusId,
          adminId: initialValues.adminSelect,
        },
      })

      MergeMemberIsCampusAdminFor({
        variables: {
          campusId: campusId,
          adminId: values.adminSelect,
        },
      })
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
          {breadcrumb
            ? breadcrumb.map((bread, i) => {
                let breadname
                if (bread.__typename === 'Sonta') {
                  bread.campus &&
                    (breadname = bread.name.replace(bread.campus.name, ''))
                  bread.town &&
                    (breadname = bread.name.replace(bread.town.name, ''))
                } else {
                  breadname = bread.name
                }
                if (i === breadcrumb.length - 1) {
                  return (
                    <small
                      key={i}
                      to={
                        bread?.firstName
                          ? `/dashboard`
                          : `/${bread?.__typename.toLowerCase()}/displaydetails`
                      }
                      className="label text-secondary"
                    >
                      {bread?.name
                        ? `${breadname} ${bread?.__typename}`
                        : `Bishop ${bread?.firstName} ${bread?.lastName}`}
                    </small>
                  )
                } else {
                  return (
                    <Link
                      key={i}
                      to={
                        bread?.firstName
                          ? `/dashboard`
                          : `/${bread?.__typename.toLowerCase()}/displaydetails`
                      }
                      className=" label text-secondary"
                      onClick={() => {
                        clickCard(bread)
                      }}
                    >
                      {bread?.name
                        ? `${bread?.name} ${bread?.__typename}`
                        : `Bishop ${bread?.firstName} ${bread?.lastName}`}
                      {' >'}{' '}
                    </Link>
                  )
                }
              })
            : null}
          <h3 className="mx-3 mt-3 font-weight-bold">
            {`${name} ${churchType}`}
            <RoleView
              roles={['federalAdmin', 'bishopAdmin', 'constituencyAdmin']}
            >
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
          <RoleView roles={['federalAdmin', 'bishopAdmin']}>
            <input
              type="button"
              className={`btn btn-primary text-nowrap`}
              value="Change Admin"
              onClick={togglePopup}
            />
          </RoleView>
          {isOpen && (
            <Popup
              content={
                <>
                  <b>Change {`${churchHeading}'s`} Admin</b>
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
                              initialValue={initialValues.adminName}
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
                </>
              }
              handleClose={togglePopup}
            />
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
            <DetailsCard heading={churchHeading} detail={churchNo} />
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
                  View All
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
