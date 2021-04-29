import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { BISH_DASHBOARD_COUNTS } from '../queries/CountQueries'
import { NavBar } from '../components/nav/NavBar.jsx'
import { DashboardCard } from '../components/card/DashboardCard.jsx'
import { DashboardButton } from '../components/buttons/DashboardButton.jsx'
import DropdoownButton from '../components/buttons/DropdownButton'
import { ChurchContext } from '../contexts/ChurchContext'
import { capitalise, plural } from '../global-utils'

const BishopDashboard = () => {
  const { church, setFilters, clickCard, bishopId } = useContext(ChurchContext)
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
  const churchStream = church.church
  const listItems = [
    {
      link: '/member/addmember',
      buttonText: 'Register Member',
    },
    {
      link: '/bacenta/addbacenta',
      buttonText: 'Start a Bacenta',
    },
    {
      link: '/centre/addcentre',
      buttonText: 'Start a Centre',
    },
    {
      link: `/${churchStream}/add${churchStream}`,
      buttonText: `Add ${capitalise(churchStream)}`,
    },
  ]

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
      plural(churchStream)
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
      <div className="container px-4">
        <h4 className="pt-4">{bishopName}</h4>
        <p
          onClick={() => {
            clickCard(data.displayMember?.hasAdmin)
            history.push('/member/displaydetails')
          }}
        >
          {data?.displayMember?.hasAdmin ? { adminName } : null}
        </p>
        <div className="row justify-content-end pb-4">
          <div className="col-auto mr-1 d-md-none">
            <DropdoownButton items={listItems} />
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
              detail1={campusTownCount}
              detail2={bacentaCount}
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
                <DashboardButton
                  btnText={item.buttonText}
                  btnLink={item.link}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BishopDashboard
