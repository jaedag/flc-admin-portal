import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router'
import NavBar from 'components/nav/NavBar'
import ChurchGraph from 'components/ChurchGraph/ChurchGraph'
import './Dashboards.css'
import { MemberContext } from 'contexts/MemberContext'
import { useQuery } from '@apollo/client'
import { SERVANTS_DASHBOARD } from './DashboardQueries'
import LoadingScreen from 'components/LoadingScreen'
import ErrorScreen from 'components/ErrorScreen'
import RoleCard from './RoleCard'
import {
  getServiceGraphData,
  getMonthlyStatAverage,
} from '../reports/report-utils'
import { ChurchContext } from 'contexts/ChurchContext'
import StatDisplay from 'pages/reports/CompStatDisplay'

const ServantsDashboard = () => {
  const { memberId, currentUser } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const history = useHistory()
  const location = useLocation()
  const atHome = location.pathname === '/'

  const { data, loading } = useQuery(SERVANTS_DASHBOARD, {
    variables: { id: atHome ? currentUser.id : memberId },
  })

  if (loading) {
    return <LoadingScreen />
  } else if (data) {
    const servant = data.members[0]

    // What leadership roles does this person play?
    let roles = []
    let assessmentChurchData, assessmentChurch

    const getServantRoles = (servant) => {
      if (servant.leadsBacenta?.length) {
        const leadsOneChurch = servant.leadsBacenta.length === 1 ?? false
        roles.push({
          name: leadsOneChurch ? 'Bacenta' : 'Bacentas',
          number: servant.leadsBacenta.length,
          clickCard: () => {
            clickCard(servant.leadsBacenta[0])
          },
          link: leadsOneChurch ? '/bacenta/reports' : '/servants/bacenta-list',
        })
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
        })
        assessmentChurch = servant.leadsCentre[0]
      }
      if (servant.leadsTown?.length) {
        const leadsOneChurch = servant.leadsTown.length === 1 ?? false
        roles.push({
          name: leadsOneChurch ? 'Town' : 'Towns',
          number: servant.leadsTown.length,
          clickCard: () => {
            clickCard(servant.leadsTown[0])
          },
          link: leadsOneChurch ? '/town/reports' : '/servants/town-list',
        })
        assessmentChurch = servant.leadsTown[0]
      }
      if (servant.leadsCampus?.length) {
        const leadsOneChurch = servant.leadsCampus.length === 1 ?? false
        roles.push({
          name: leadsOneChurch ? 'Campus' : 'Campuses',
          number: servant.leadsCampus.length,
          clickCard: () => {
            clickCard(servant.leadsCampus[0])
          },
          link: leadsOneChurch ? '/campus/reports' : '/servants/campus-list',
        })
        assessmentChurch = servant.leadsCampus[0]
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
        const adminsOneChurch = servant.isCampusAdminFor.length === 1 ?? false
        roles.push({
          name: 'Admin',
          number: 'Campus Admin',
          clickCard: () => {
            clickCard(servant.isCampusAdminFor[0])
          },
          link: adminsOneChurch
            ? '/campus/displaydetails'
            : '/servants/campus-list',
        })
        assessmentChurch = servant.isCampusAdminFor[0]
      }
      if (servant.isTownAdminFor?.length) {
        const adminsOneChurch = servant.isTownAdminFor.length === 1 ?? false
        roles.push({
          name: 'Admin',
          number: 'Town Admin',
          clickCard: () => {
            clickCard(servant.isTownAdminFor[0])
          },
          link: adminsOneChurch
            ? '/town/displaydetails'
            : '/servants/town-list',
        })
        assessmentChurch = servant.isTownAdminFor[0]
      }

      //run the get graph function after all checking is done to avoid multiple unnecessary runs
      if (assessmentChurch) {
        return getServiceGraphData(assessmentChurch)
      }
      return
    }

    assessmentChurchData = getServantRoles(servant)

    return (
      <>
        <NavBar />
        <div className="container">
          <div className=" my-3">
            <p className="mb-0">{`Welcome to`}</p>
            <h5 className="font-weight-bold roboto">{`${servant.fullName}'s Dashboard`}</h5>
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
                  <StatDisplay
                    title="Avg Attendance"
                    statistic={getMonthlyStatAverage(
                      assessmentChurchData,
                      'attendance'
                    )}
                  />
                </div>

                <div className="col">
                  <StatDisplay
                    title="Avg Income (in GH₵)"
                    statistic={getMonthlyStatAverage(
                      assessmentChurchData,
                      'income'
                    )}
                  />
                </div>
              </div>
              <ChurchGraph
                stat1="attendance"
                stat2="income"
                churchData={assessmentChurchData}
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
