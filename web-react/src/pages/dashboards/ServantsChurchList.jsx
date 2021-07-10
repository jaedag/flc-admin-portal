import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { useQuery } from '@apollo/client'
import ErrorScreen from 'components/ErrorScreen'
import LoadingScreen from 'components/LoadingScreen'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { SERVANTS_DASHBOARD } from './DashboardQueries'
import {
  getMonthlyStatAverage,
  getServiceGraphData,
} from 'pages/reports/report-utils'
import NavBar from 'components/nav/NavBar'

const ServantsChurchList = () => {
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
    let churches = []

    const getServantChurches = (servant) => {
      if (servant.leadsBacenta?.length) {
        servant.leadsBacenta.map((bacenta) => {
          const serviceData = getServiceGraphData(bacenta)
          churches.push({
            name: bacenta.name,
            leader: servant.fullName,
            leaderPic: servant.pictureUrl,
            attendance: getMonthlyStatAverage(serviceData, 'attendance'),
            income: getMonthlyStatAverage(serviceData, 'income'),
            clickCard: () => {
              clickCard(bacenta)
            },
            link: '/bacenta/reports',
          })
        })
      }
      if (servant.leadsCentre?.length) {
        // console.log('muga')
      }
      if (servant.leadsTown?.length) {
        churches.push({ name: 'Towns', number: servant.leadsTown.length })
      }
      if (servant.leadsCampus?.length) {
        churches.push({ name: 'Campus', number: servant.leadsCampus.length })
      }
      if (servant.leadsSonta?.length) {
        churches.push({ name: 'Sontas', number: servant.leadsSonta.length })
      }
      if (servant.leadsBasonta?.length) {
        churches.push({ name: 'Basontas', number: servant.leadsBasonta.length })
      }
      if (servant.leadsMinistry?.length) {
        churches.push({
          name: 'Ministries',
          number: servant.leadsMinistry.length,
        })
      }
      if (servant.townBishop?.length) {
        churches.push({ name: 'Campus Bishop', number: 'Bishop' })
      }
      if (servant.campusBishop?.length) {
        churches.push({ name: 'Town Bishop', number: 'Bishop' })
      }
      if (servant.isBishopAdminFor?.length) {
        churches.push({ name: 'Admin', number: 'Bishops Admin' })
      }
      if (servant.isCampusAdminFor?.length) {
        churches.push({ name: 'Admin', number: 'Campus Admin' })
      }
      if (servant.isTownAdminFor?.length) {
        churches.push({ name: 'Admin', number: 'Town Admin' })
      }

      //run the get graph function after all checking is done to avoid multiple unnecessary runs
      return
    }

    getServantChurches(servant)
    return (
      <>
        <NavBar />
        <div className="container mt-4">
          <h3>Bacentas</h3>
          <table>
            <tbody>
              <tr className="row no-gutters">
                <th className="col">Image</th>
                <th className="col text-truncate small text-secondary font-weight-bold">
                  Leader
                </th>
                <th className="col text-truncate small text-secondary font-weight-bold">
                  Centre
                </th>
                <th className="col text-truncate small text-secondary font-weight-bold">
                  Attendance
                </th>
                <th className="col text-truncate small text-secondary font-weight-bold">
                  Income
                </th>
              </tr>
              {churches.map((church, i) => {
                return (
                  <tr
                    key={i}
                    onClick={() => {
                      church.clickCard()
                      history.push(church.link)
                    }}
                    className="row no-gutters"
                  >
                    <td className="col-auto pr-2">
                      <img
                        className="leader-img"
                        src={church.leaderPic}
                        // alt={church.leader}
                      />
                    </td>
                    <td className="col small">{church.leader}</td>
                    <td className="col small">{church.name}</td>
                    <td className="col-auto small pr-2">{church.attendance}</td>
                    <td className="col-auto small pr-2">{church.income}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </>
    )
  } else {
    return <ErrorScreen />
  }
}

export default ServantsChurchList
