import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import {
  APOSTLE_MEMBER_COUNT,
  APOSTLE_PASTOR_COUNT,
  APOSTLE_CAMPUSTOWN_COUNT,
} from '../queries/CountQueries'
import { DISPLAY_APOSTLE_NAME } from '../queries/DisplayQueries'
import { NavBar } from '../components/NavBar'
import { DashboardCard } from '../components/DashboardCard'
import { DashboardButton } from '../components/DashboardButton'
import { ApostleContext, ChurchContext } from '../context/ChurchContext'

const ApostleDashboard = () => {
  const { apostleID } = useContext(ApostleContext)
  const { church, capitalise } = useContext(ChurchContext)
  const {
    data: member,
    error: memberCountError,
    loading: memberCountLoading,
  } = useQuery(APOSTLE_MEMBER_COUNT, {
    variables: { apostleID: apostleID },
  })
  const {
    data: apostle,
    error: apostleError,
    loading: apostleLoading,
  } = useQuery(DISPLAY_APOSTLE_NAME, {
    variables: { memberID: apostleID },
  })
  const {
    data: pastor,
    error: pastorCountError,
    loading: pastorCountLoading,
  } = useQuery(APOSTLE_PASTOR_COUNT, {
    variables: { apostleID: apostleID },
  })
  const {
    data: churchCount,
    error: churchCountError,
    loading: churchCountLoading,
  } = useQuery(APOSTLE_CAMPUSTOWN_COUNT, {
    variables: { apostleID: apostleID },
  })

  if (
    memberCountLoading ||
    pastorCountLoading ||
    churchCountLoading ||
    apostleLoading
  ) {
    return (
      <div>
        <NavBar />
        <div className="container body-container">
          <div className="row row-cols-2 row-cols-lg-4">
            <div className="col">
              <DashboardCard name="Members" number="Loading..." />
            </div>
            <div className="col">
              <DashboardCard name="Pastors" number="Loading..." cardLink="#" />
            </div>

            <div className="col">
              <DashboardCard
                name={
                  church.church === 'town'
                    ? capitalise(church.church) + 's'
                    : capitalise(church.church)
                }
                number="Loading..."
                cardLink={`/${church.church}/displayall`}
              />
            </div>
            <div className="col">
              <DashboardCard
                name="Ministries"
                number="Loading..."
                cardLink="/sonta/displayall"
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col">
              <DashboardButton
                btnText="Register Member"
                btnLink="/members/addmember"
              />
            </div>
            <div className="col">
              <DashboardButton btnText="Close a Centre" />
            </div>
            <div className="col">
              <DashboardButton
                btnText="Start a Centre"
                btnLink="centre/addcentre"
              />
            </div>
            <div className="col ">
              <DashboardButton
                btnText={`Add ${capitalise(church.church)}`}
                btnLink="/town/addtown"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (
    memberCountError ||
    pastorCountError ||
    churchCountError ||
    apostleError
  ) {
    // console.log(memberCountError, pastorCountError, churchCountError, sontaCountError)
    return (
      <div>
        <NavBar />
        <div className="container body-container">
          <div className="row row-cols-2 row-cols-lg-4">
            <div className="col">
              <DashboardCard name="Members" />
            </div>
            <div className="col">
              <DashboardCard name="Pastors" cardLink="#" />
            </div>

            <div className="col">
              <DashboardCard
                name={
                  church.church === 'town'
                    ? capitalise(church.church) + 's'
                    : capitalise(church.church)
                }
                cardLink={`/${church.church}/displayall`}
              />
            </div>
            <div className="col">
              <DashboardCard name="Ministries" cardLink="/sonta/displayall" />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col">
              <DashboardButton
                btnText="Register Member"
                btnLink="/members/addmember"
              />
            </div>
            <div className="col">
              <DashboardButton
                btnText="Start a Centre"
                btnLink="centre/addcentre"
              />
            </div>
            <div className="col ">
              <DashboardButton
                btnText={`Add ${capitalise(church.church)}`}
                btnLink="/town/addtown"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <NavBar />
      <div className="container body-container">
        <h4 className="py-4">
          {`${apostle.displayMember.firstName} ${apostle.displayMember.lastName}`}
          &apos;s Church
        </h4>
        <div className="row row-cols-2 row-cols-lg-4">
          <div className="col">
            <DashboardCard
              name="Members"
              number={member.apostleMemberCount}
              cardLink="/members"
            />
          </div>
          <div className="col">
            <DashboardCard
              name="Pastors"
              number={pastor.apostlePastorCount}
              cardLink="#"
            />
          </div>
          <div className="col">
            <DashboardCard
              name={
                church.church === 'town'
                  ? capitalise(church.church) + 's'
                  : capitalise(church.church)
              }
              number={churchCount.apostleCampusTownCount}
              cardLink={`/${church.church}/displayall`}
            />
          </div>
          <div className="col">
            <DashboardCard
              name="Ministries"
              number="0"
              cardLink="/sonta/displayall"
            />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-sm-12 col-md">
            <DashboardButton
              btnText="Register Member"
              btnLink="/members/addmember"
            />
          </div>
          <div className="col-sm-12 col-md">
            <DashboardButton
              btnText="Start a Centre"
              btnLink="/centre/addcentre"
            />
          </div>
          <div className="col-sm-12 col-md">
            <DashboardButton
              btnText={`Add ${capitalise(church.church)}`}
              btnLink={`/${church.church}/add${church.church}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApostleDashboard
