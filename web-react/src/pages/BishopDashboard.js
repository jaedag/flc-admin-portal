import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import {
  BISHOP_MEMBER_COUNT,
  BISHOP_PASTOR_COUNT,
  BISHOP_CAMPUSTOWN_COUNT,
  BISHOP_SONTA_MEMBER_COUNT,
} from '../queries/CountQueries'
import { DISPLAY_BISHOP_NAME } from '../queries/DisplayQueries'
import { NavBar } from '../components/NavBar'
import { DashboardCard } from '../components/DashboardCard'
import { DashboardButton } from '../components/DashboardButton'
import { ChurchContext } from '../contexts/ChurchContext'

const BishopDashboard = () => {
  const { church, capitalise, bishopID } = useContext(ChurchContext)
  const {
    data: member,
    error: memberCountError,
    loading: memberCountLoading,
  } = useQuery(BISHOP_MEMBER_COUNT, {
    variables: { id: bishopID },
  })
  const { data: bishop, error: bishopError, loading: bishopLoading } = useQuery(
    DISPLAY_BISHOP_NAME,
    {
      variables: { id: bishopID },
    }
  )
  const {
    data: pastor,
    error: pastorCountError,
    loading: pastorCountLoading,
  } = useQuery(BISHOP_PASTOR_COUNT, {
    variables: { id: bishopID },
  })
  const {
    data: churchCount,
    error: churchCountError,
    loading: churchCountLoading,
  } = useQuery(BISHOP_CAMPUSTOWN_COUNT, {
    variables: { id: bishopID },
  })
  const {
    data: sontaMemberCount,
    error: bishopSontaError,
    loading: bishopSontaLoading,
  } = useQuery(BISHOP_SONTA_MEMBER_COUNT, {
    variables: { id: bishopID },
  })

  if (
    memberCountLoading ||
    pastorCountLoading ||
    churchCountLoading ||
    bishopLoading ||
    bishopSontaLoading
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
            <div className="col-sm-12 col-md">
              <DashboardButton
                btnText="Register Member"
                btnLink="/member/addmember"
              />
            </div>
            <div className="col-sm-12 col-md">
              <DashboardButton
                btnText="Start a Bacenta"
                btnLink="/bacenta/addbacenta"
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
  if (
    memberCountError ||
    pastorCountError ||
    churchCountError ||
    bishopError ||
    bishopSontaError
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
            <div className="col-sm-12 col-md">
              <DashboardButton
                btnText="Register Member"
                btnLink="/member/addmember"
              />
            </div>
            <div className="col-sm-12 col-md">
              <DashboardButton
                btnText="Start a Bacenta"
                btnLink="/bacenta/addbacenta"
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

  return (
    <div>
      <NavBar />
      <div className="container body-container">
        <h4 className="py-4">
          {`${bishop.displayMember.firstName} ${bishop.displayMember.lastName}`}
          &apos;s Church
        </h4>
        <div className="row row-cols-2 row-cols-lg-4">
          <div className="col">
            <DashboardCard
              name="Members"
              number={member.bishopMemberCount}
              cardLink="/members"
            />
          </div>
          <div className="col">
            <DashboardCard
              name="Pastors"
              number={pastor.bishopPastorCount}
              cardLink="/pastors"
            />
          </div>
          <div className="col">
            <DashboardCard
              name={
                church.church === 'town'
                  ? capitalise(church.church) + 's'
                  : capitalise(church.church)
              }
              number={churchCount.bishopsCampusTownCount}
              cardLink={`/${church.church}/displayall`}
            />
          </div>
          <div className="col">
            <DashboardCard
              name="Ministries"
              number={sontaMemberCount.bishopSontaMemberCount}
              cardLink="/sonta/displayall"
            />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-sm-12 col-md">
            <DashboardButton
              btnText="Register Member"
              btnLink="/member/addmember"
            />
          </div>
          <div className="col-sm-12 col-md">
            <DashboardButton
              btnText="Start a Bacenta"
              btnLink="/bacenta/addbacenta"
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

export default BishopDashboard
