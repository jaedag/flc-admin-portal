import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { BISH_DASHBOARD_COUNTS } from '../queries/CountQueries'
import { NavBar } from '../components/NavBar'
import { DashboardCard } from '../components/DashboardCard'
import { DashboardButton } from '../components/buttons/DashboardButton'
import { ChurchContext } from '../contexts/ChurchContext'

const BishopDashboard = () => {
  const {
    church,
    capitalise,
    plural,
    setFilters,
    clickCard,
    bishopId,
  } = useContext(ChurchContext)
  const { data, loading } = useQuery(BISH_DASHBOARD_COUNTS, {
    variables: { id: bishopId },
  })
  const history = useHistory()

  let bishopName,
    adminName,
    memberCount,
    pastorCount,
    campusTownCount,
    bacentaCount,
    sontaMemberCount
  const loadingText = 'Loading...'
  const errorText = 'Error!'

  if (loading) {
    bishopName = loadingText
    memberCount = loadingText
    pastorCount = loadingText
    campusTownCount = loadingText
    sontaMemberCount = loadingText
  } else if (data) {
    bishopName = `${data.displayMember?.firstName} ${data.displayMember?.lastName} 's Church`
    adminName = `Admin: ${data.displayMember?.hasAdmin?.firstName} ${data.displayMember?.hasAdmin?.lastName}`
    memberCount = `${data.bishopMemberCount} Members`
    pastorCount = `${data.bishopPastorCount} Pastors`
    campusTownCount = `${data.bishopCampusTownCount} ${capitalise(
      plural(church.church)
    )} | ${data.bishopCentreCount} Centres`
    bacentaCount = `${data.bishopBacentaCount} Bacentas`
    sontaMemberCount = `${data.bishopSontaMemberCount} Members in Ministries`
  } else {
    bishopName = errorText
    memberCount = errorText
    pastorCount = errorText
    campusTownCount = errorText
    sontaMemberCount = errorText
  }

  return (
    <>
      <NavBar />
      <div className="container ">
        <h4 className="pt-4">{bishopName}</h4>
        <p
          className="pb-4"
          onClick={() => {
            clickCard(data.displayMember?.hasAdmin)
            history.push('/member/displaydetails')
          }}
        >
          {data?.displayMember?.hasAdmin ? { adminName } : null}
        </p>
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
              name={capitalise(plural(church.church))}
              detail1={campusTownCount}
              detail2={bacentaCount}
              cardLink={`/${church.church}/displayall`}
            />
          </div>
          <div className="col-sm-12 col-md">
            <DashboardCard
              name="Ministries"
              detail1={sontaMemberCount}
              cardLink={`${church.church}/display-sontas`}
            />
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <div className="col-sm-12 col-md-auto">
            <DashboardButton
              btnText="Register Member"
              btnLink="/member/addmember"
            />
          </div>
          <div className="col-sm-12 col-md-auto">
            <DashboardButton
              btnText="Start a Bacenta"
              btnLink="/bacenta/addbacenta"
            />
          </div>
          <div className="col-sm-12 col-md-auto">
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
    </>
  )
}

export default BishopDashboard
