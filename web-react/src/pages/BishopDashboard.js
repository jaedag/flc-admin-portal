import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { BISH_DASHBOARD_COUNTS } from '../queries/CountQueries'
import { NavBar } from '../components/NavBar'
import { DashboardCard } from '../components/DashboardCard'
import { DashboardButton } from '../components/DashboardButton'
import { ChurchContext } from '../contexts/ChurchContext'

const BishopDashboard = () => {
  const { church, capitalise, plural, clickMember, bishopId } = useContext(
    ChurchContext
  )
  const { data, error, loading } = useQuery(BISH_DASHBOARD_COUNTS, {
    variables: { id: bishopId },
  })
  const history = useHistory()

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="container ">
          <h4 className="py-4">Loading...</h4>
          <div className="row row-cols-2 row-cols-lg-4">
            <div className="col">
              <DashboardCard
                name="Members"
                number="Loading..."
                cardLink="/members"
              />
            </div>
            <div className="col">
              <DashboardCard
                name="Pastors"
                number="Loading..."
                cardLink="/pastors"
              />
            </div>
            <div className="col">
              <DashboardCard
                name={capitalise(plural(church.church))}
                number="Loading..."
                cardLink={`/${church.church}/displayall`}
              />
            </div>
            <div className="col">
              <DashboardCard
                name="Ministries"
                number="Loading"
                cardLink={`${church.church}/sonta/displayall`}
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
  } else if (data) {
    return (
      <div>
        <NavBar />
        <div className="container ">
          <h4 className="pt-4">
            {`${data.displayMember?.firstName} ${data.displayMember?.lastName}`}
            &apos;s Church
          </h4>
          <p
            className="pb-4"
            onClick={() => {
              clickMember(data.displayMember?.hasAdmin)
              history.push('/member/displaydetails')
            }}
          >
            {data.displayMember?.hasAdmin
              ? `Admin: ${data.displayMember?.hasAdmin?.firstName} ${data.displayMember?.hasAdmin?.lastName}`
              : ''}
          </p>
          <div className="row row-cols-md-2 row-cols-lg-4">
            <div className="col-sm-12 col-md">
              <DashboardCard
                name="Members"
                number={data.bishopMemberCount}
                cardLink="/members"
              />
            </div>
            <div className="col-sm-12 col-md">
              <DashboardCard
                name="Pastors"
                number={data.bishopPastorCount}
                cardLink="/pastors"
              />
            </div>
            <div className="col-sm-12 col-md">
              <DashboardCard
                name={capitalise(plural(church.church))}
                number={`${data.bishopCampusTownCount} ${capitalise(
                  plural(church.church)
                )} | ${data.bishopCentreCount} Centres | ${
                  data.bishopBacentaCount
                } Bacentas`}
                cardLink={`/${church.church}/displayall`}
              />
            </div>
            <div className="col-sm-12 col-md">
              <DashboardCard
                name="Ministries"
                number={data.bishopSontaMemberCount}
                cardLink={`${church.church}/sonta/displayall`}
              />
            </div>
          </div>

          <div className="row justify-content-center mt-5">
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
            <div className="col-sm-12 col-md-auto">
              <DashboardButton
                btnText={`Add ${capitalise(church.church)}`}
                btnLink={`/${church.church}/add${church.church}`}
              />
            </div>
          </div>
        </div>
      </div>
    )
  } else if (error) {
    return (
      <div>
        <NavBar />
        <div className="container ">
          <h4 className="py-4">Loading...</h4>
          <div className="row row-cols-2 row-cols-lg-4">
            <div className="col">
              <DashboardCard
                name="Members"
                number="Loading..."
                cardLink="/members"
              />
            </div>
            <div className="col">
              <DashboardCard
                name="Pastors"
                number="Loading..."
                cardLink="/pastors"
              />
            </div>
            <div className="col">
              <DashboardCard
                name={capitalise(plural(church.church))}
                number="Loading..."
                cardLink={`/${church.church}/displayall`}
              />
            </div>
            <div className="col">
              <DashboardCard
                name="Ministries"
                number="Loading"
                cardLink={`${church.church}/sonta/displayall`}
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
}

export default BishopDashboard
