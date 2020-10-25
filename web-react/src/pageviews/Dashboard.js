import React from 'react'
import { useQuery } from '@apollo/client'
import {
  members,
  pastors,
  communityCount,
  sontaCount,
} from '../queries/CountQueries'
import { NavBar } from '../components/NavBar'
import { DashboardCard } from '../components/DashboardCard'
import { DashboardButton } from '../components/DashboardButton'

const Dashboard = () => {
  const {
    data: member,
    error: memberCountError,
    loading: memberCountLoading,
  } = useQuery(members)

  const {
    data: pastor,
    error: pastorCountError,
    loading: pastorCountLoading,
  } = useQuery(pastors)
  const {
    data: community,
    error: communityCountError,
    loading: communityCountLoading,
  } = useQuery(communityCount)
  const {
    data: sonta,
    error: sontaCountError,
    loading: sontaCountLoading,
  } = useQuery(sontaCount)

  if (
    memberCountLoading ||
    pastorCountLoading ||
    communityCountLoading ||
    sontaCountLoading
  ) {
    return (
      <div>
        <NavBar />
        <div className="container body-container">
          <div className="row row-cols-2 row-cols-lg-4">
            <DashboardCard name="Pastors" number="Loading...">
              <div className="spinner-border full-center" role="status" />
            </DashboardCard>
            <DashboardCard name="Towns" number="Loading..." />
            <DashboardCard
              name="Ministries"
              number="Loading..."
              cardLink="/sonta/displayall"
            />
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
            <div className="col">
              <DashboardButton
                btnText="Add Community"
                btnLink="community/addcommunity"
              />
            </div>
            <div className="col ">
              <DashboardButton btnText="Add Town" btnLink="/town/addtown" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (
    memberCountError ||
    pastorCountError ||
    communityCountError ||
    sontaCountError
  ) {
    console.log(
      memberCountError,
      pastorCountError,
      communityCountError,
      sontaCountError
    )
    return (
      <div>
        <NavBar />
        <div className="container body-container">
          <div className="row row-cols-2 row-cols-lg-4">
            <div className="col">
              <DashboardCard name="Members" />
            </div>
            <div className="col">
              <DashboardCard name="Pastors" cardLink="members/displaymember" />
            </div>
            <div className="col">
              <DashboardCard name="Towns" cardLink="town/displayall" />
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
              <DashboardButton btnText="Close a Centre" />
            </div>
            <div className="col">
              <DashboardButton
                btnText="Start a Centre"
                btnLink="centre/addcentre"
              />
            </div>
            <div className="col">
              <DashboardButton
                btnText="Add Community"
                btnLink="community/addcommunity"
              />
            </div>
            <div className="col ">
              <DashboardButton btnText="Add Town" btnLink="/town/addtown" />
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
        <div className="row row-cols-2 row-cols-lg-4">
          <div className="col">
            <DashboardCard
              name="Members"
              number={member.memberCount}
              cardLink="/members"
            />
          </div>
          <div className="col">
            <DashboardCard name="Pastors" number={pastor.pastorCount} />
          </div>
          <div className="col">
            <DashboardCard
              name="Towns"
              number={community.communityCount}
              cardLink="/town/displayall"
            />
          </div>
          <div className="col">
            <DashboardCard
              name="Ministries"
              number={sonta.sontaCount}
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
              btnLink="/centre/addcentre"
            />
          </div>
          <div className="col">
            <DashboardButton
              btnText="Add Community"
              btnLink="/community/addcommunity"
            />
          </div>
          <div className="col ">
            <DashboardButton btnText="Add Town" btnLink="/town/addtown" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
