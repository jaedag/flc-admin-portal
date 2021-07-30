import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import {
  BISH_DASHBOARD_COUNTS,
  MAKE_BISHOP_ADMIN,
  REMOVE_BISHOP_ADMIN,
} from './DashboardQueries'
import NavBar from '../../components/nav/NavBar'
import DashboardCard from '../../components/card/DashboardCard'
import DashboardButton from '../../components/buttons/DashboardButton'
import DropdownButton from '../../components/buttons/DropdownButton'
import { ChurchContext } from '../../contexts/ChurchContext'
import {
  capitalise,
  isAuthorised,
  plural,
  throwErrorMsg,
} from '../../global-utils'
import { MemberContext } from '../../contexts/MemberContext'
import Popup from '../../components/Popup/Popup'
import RoleView from '../../auth/RoleView'
import { BISHOP_MEMBER_DROPDOWN } from '../../queries/ListQueries'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../components/formik-components/FormikControl'

const BishopDashboard = () => {
  const {
    church,
    togglePopup,
    isOpen,
    setFilters,
    clickCard,
    bishopId,
    setBishopId,
  } = useContext(ChurchContext)

  const { currentUser } = useContext(MemberContext)
  const { data, loading } = useQuery(BISH_DASHBOARD_COUNTS, {
    variables: { id: bishopId },
  })
  const bishop = data?.members[0]

  //Change Admin Initialised

  const [MakeBishopAdmin] = useMutation(MAKE_BISHOP_ADMIN)
  const [RemoveBishopAdmin] = useMutation(REMOVE_BISHOP_ADMIN)

  const initialValues = {
    adminName: bishop?.hasAdmin
      ? `${bishop?.hasAdmin?.firstName} ${bishop?.hasAdmin?.lastName}`
      : '',
    adminSelect: bishop?.hasAdmin?.id ?? '',
  }

  const validationSchema = Yup.object({
    adminSelect: Yup.string().required(
      'Please select an Admin from the dropdown'
    ),
  })
  const onSubmit = (values, onSubmitProps) => {
    RemoveBishopAdmin({
      variables: {
        bishopId: bishopId,
        adminId: initialValues.adminSelect,
      },
    }).catch((err) =>
      throwErrorMsg('THere was a problem removing bishops admin', err)
    )
    MakeBishopAdmin({
      variables: {
        bishopId: bishopId,
        adminId: values.adminSelect,
      },
    }).catch((err) =>
      throwErrorMsg('There was a problem adding bishop admin', err)
    )

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    togglePopup()
  }
  //End of Admin Change

  const history = useHistory()

  let bishopName,
    adminName,
    memberCount,
    pastorCount,
    churchesCount,
    sontaMemberCount
  const loadingText = 'Loading...'
  const errorText = 'Error!'
  const churchStream = church.church
  const listItems = [
    {
      link: '/member/addmember',
      buttonText: 'Register Member',
      roles: ['all'],
    },
    {
      link: '/bacenta/addbacenta',
      buttonText: 'Start a Bacenta',
      roles: ['adminFederal', 'adminBishop', 'adminCampus', 'adminTown'],
    },
    {
      link: '/centre/addcentre',
      buttonText: 'Start a Centre',
      roles: ['adminFederal', 'adminBishop', 'adminCampus', 'adminTown'],
    },
    {
      link: '/sonta/addsonta',
      buttonText: 'Start a Sonta',
      roles: ['adminFederal', 'adminBishop', 'adminCampus', 'adminTown'],
    },
    {
      link: `/${churchStream}/add${churchStream}`,
      buttonText: `Start a ${capitalise(churchStream)}`,
      roles: ['adminFederal', 'adminBishop'],
    },
  ]

  if (loading) {
    bishopName = loadingText
    memberCount = loadingText
    pastorCount = loadingText
    churchesCount = loadingText
    sontaMemberCount = loadingText
  } else if (data) {
    bishopName = `${bishop?.firstName} ${bishop?.lastName}`
    adminName = `Admin: ${bishop?.hasAdmin?.firstName} ${bishop?.hasAdmin?.lastName}`
    memberCount = `${data.bishopMemberCount} Members`
    pastorCount = `${data.bishopPastorCount} Pastors`
    churchesCount = `${data.bishopCampusTownCount} ${capitalise(
      plural(churchStream)
    )} | ${data.bishopCentreCount} Centres | ${
      data.bishopBacentaCount
    } Bacentas`
    sontaMemberCount = `${data.bishopSontaMemberCount} Members in Ministries`
  } else {
    bishopName = errorText
    memberCount = errorText
    pastorCount = errorText
    churchesCount = errorText
    sontaMemberCount = errorText
  }

  return (
    <>
      <NavBar />
      <div className="container px-4">
        <div className="row justify-content-between py-3">
          <div className="col">
            <h4>{`${bishopName}'s`} Church</h4>
            <p
              onClick={() => {
                clickCard(bishop?.hasAdmin)
                setBishopId(bishop?.id)
                history.push('/member/displaydetails')
              }}
            >
              {bishop?.hasAdmin ? adminName : null}
            </p>
            <RoleView roles={['adminFederal']}>
              <input
                type="button"
                className={`btn btn-primary text-nowrap`}
                value="Change Admin"
                onClick={togglePopup}
              />
            </RoleView>
            {isOpen && (
              <Popup handleClose={togglePopup}>
                <b>{`Change Bishop ${bishopName}'s Admin`}</b>
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
              </Popup>
            )}
          </div>
          <div className="col-auto align-self-center mr-1 d-md-none">
            <DropdownButton items={listItems} />
          </div>
        </div>
        <div className="row row-cols-md-2 row-cols-lg-4">
          <div className="col-sm-12 col-md">
            <DashboardCard
              name="Members"
              detail1={memberCount}
              cardLink="/members"
            />
          </div>
          <div className="col-sm-12 col-md">
            <DashboardCard
              name="Pastors"
              detail1={pastorCount}
              cardLink="/pastors"
              onClick={() => {
                setFilters({
                  gender: '',
                  maritalStatus: '',
                  occupation: '',
                  leaderTitle: ['Pastor'],
                  leaderRank: [],
                  ministry: '',
                })
              }}
            />
          </div>
          <div className="col-sm-12 col-md">
            <DashboardCard
              name={capitalise(plural(churchStream))}
              detail1={churchesCount}
              cardLink={`/${churchStream}/displayall`}
            />
          </div>
          <div className="col-sm-12 col-md">
            <DashboardCard
              name="Ministries"
              detail1={sontaMemberCount}
              cardLink={`${churchStream}/display-sontas`}
            />
          </div>
        </div>
        <div className="d-none d-md-block">
          <div className="row justify-content-center mt-5">
            {listItems.map((item, index) => (
              <div key={index} className="col-sm-12 col-lg-auto">
                {isAuthorised(item.roles, currentUser.roles) && (
                  <DashboardButton btnLink={item.link}>
                    {item.buttonText}
                  </DashboardButton>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BishopDashboard
