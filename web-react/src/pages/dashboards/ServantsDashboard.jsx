import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import NavBar from 'components/nav/NavBar'
import ChurchGraph from 'components/ChurchGraph/ChurchGraph'
// import '../reports/BacentaReport.css'
import './Dashboards.css'
import { MemberContext } from 'contexts/MemberContext'
import { useQuery } from '@apollo/client'
import { SERVANTS_DASHBOARD } from './DashboardQueries'
import LoadingScreen from 'components/LoadingScreen'
import ErrorScreen from 'components/ErrorScreen'
import RoleCard from './RoleCard'
import { getServiceGraphData, monthlyStatAverage } from 'global-utils'
import { ChurchContext } from 'contexts/ChurchContext'

const ServantsDashboard = () => {
  const { memberId } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const history = useHistory()
  const { data, loading } = useQuery(SERVANTS_DASHBOARD, {
    variables: { id: memberId },
  })

  if (loading) {
    return <LoadingScreen />
  } else if (data) {
    const servant = data.members[0]
    const numberOfWeeks = 4
    // What leadership roles does this person play?
    let roles = []
    let assessmentChurchData, assessmentChurch

    if (servant.leadsBacenta?.length) {
      const leadsOneChurch = servant.leadsBacenta.length === 1 ?? false
      roles.push({
        name: leadsOneChurch ? 'Bacenta' : 'Bacentas',
        number: servant.leadsBacenta.length,
        clickCard: () => {
          clickCard(servant.leadsBacenta[0])
        },
        link: leadsOneChurch ? '/bacenta/reports' : '/servants/bacenta-list',
      }),
        (assessmentChurchData = getServiceGraphData(servant.leadsBacenta))
      assessmentChurch = servant.leadsBacenta[0]
    }
    if (servant.leadsCentre?.length) {
      const leadsOneChurch = servant.leadsCentre.length === 1 ?? false
      roles.push({
        name: leadsOneChurch ? 'Centre' : 'Centres',
        number: servant.leadsCentre.length,
        clickCard: () => {
          clickCard(servant.leadsCentre[0])
        },
        link: leadsOneChurch ? '/centre/reports' : '/servants/centre-list',
      }),
        (assessmentChurchData = getServiceGraphData(servant.leadsCentre))
      assessmentChurch = servant.leadsCentre[0]
    }
    if (servant.leadsTown?.length) {
      roles.push({ name: 'Towns', number: servant.leadsTown.length })
      assessmentChurchData = getServiceGraphData(servant.leadsTown)
    }
    if (servant.leadsCampus?.length) {
      roles.push({ name: 'Campus', number: servant.leadsCampus.length })
      assessmentChurchData = getServiceGraphData(servant.leadsCampus)
    }
    if (servant.leadsSonta?.length) {
      roles.push({ name: 'Sontas', number: servant.leadsSonta.length })
      assessmentChurchData = getServiceGraphData(servant.leadsBacenta)
    }
    if (servant.leadsBasonta?.length) {
      roles.push({ name: 'Basontas', number: servant.leadsBasonta.length })
    }
    if (servant.leadsMinistry?.length) {
      roles.push({ name: 'Ministries', number: servant.leadsMinistry.length })
    }
    if (servant.townBishop?.length) {
      roles.push({ name: 'Campus Bishop', number: 'Bishop' })
    }
    if (servant.campusBishop?.length) {
      roles.push({ name: 'Town Bishop', number: 'Bishop' })
    }
    if (servant.isBishopAdminFor?.length) {
      roles.push({ name: 'Admin', number: 'Bishops Admin' })
    }
    if (servant.isCampusAdminFor?.length) {
      roles.push({ name: 'Admin', number: 'Campus Admin' })
    }
    if (servant.isTownAdminFor?.length) {
      roles.push({ name: 'Admin', number: 'Town Admin' })
    }

    return (
      <>
        <NavBar />
        <div className="container">
          <div className=" my-3">
            <p className="mb-0">{`Welcome!`}</p>
            <h5 className="font-weight-bold roboto">{`${servant.fullName}`}</h5>
          </div>

          <div className="card-button-row">
            <table>
              <tbody>
                <tr>
                  {roles &&
                    roles.map((role, i) => {
                      return (
                        <td
                          className="col-auto pl-0"
                          key={i}
                          onClick={() => {
                            role.clickCard()
                            history.push(role.link)
                          }}
                        >
                          <RoleCard number={role.number} role={role.name} />
                        </td>
                      )
                    })}
                </tr>
              </tbody>
            </table>
          </div>

          {assessmentChurchData && (
            <>
              <div className="row mt-3">
                <div className="col">
                  <p className="dashboard-title">Avg Attendance</p>
                  <p className="info-text">
                    {monthlyStatAverage(
                      assessmentChurchData,
                      'attendance',
                      numberOfWeeks
                    )}
                  </p>
                </div>

                <div className="col">
                  <p className="dashboard-title">Avg Income (in GH₵)</p>
                  <p className="info-text">
                    {monthlyStatAverage(
                      assessmentChurchData,
                      'income',
                      numberOfWeeks
                    )}
                  </p>
                </div>
              </div>
              <ChurchGraph
                churchData={servant.leadsBacenta}
                stat1="attendance"
                stat2="income"
                serviceData={assessmentChurchData}
                secondaryTitle={`${assessmentChurch.name} ${assessmentChurch.__typename}`}
              />
            </>
          )}
        </div>
      </>
    )
  } else {
    return <ErrorScreen />
  }
}

export default ServantsDashboard
