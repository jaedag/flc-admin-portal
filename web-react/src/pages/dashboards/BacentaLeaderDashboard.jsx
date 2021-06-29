import React, { useContext, useState } from 'react'
import NavBar from '../../components/nav/NavBar'
import { ChurchContext } from '../../contexts/ChurchContext'
import './BacentaLeaderDashboard.css'
import { useQuery } from '@apollo/client'
import { BACENTA_LEADER_DASHBOARD } from '../../queries/DashboardQueries'
import LoadingScreen from '../../components/LoadingScreen'
import ErrorScreen from '../../components/ErrorScreen'
import { compareValues, parseNeoDate } from '../../global-utils'
import { Link } from 'react-router-dom'
import ChurchGraph from '../../components/ChurchGraph/ChurchGraph'

export const BacentaLeaderDashboard = () => {
  const { bacentaId } = useContext(ChurchContext)

  const [stats] = useState('attendance')
  const { data, loading } = useQuery(BACENTA_LEADER_DASHBOARD, {
    variables: { bacentaId: bacentaId },
  })

  // const switchAttendanceIncome = (stats) => {
  //   if (stats === 'income') {
  //     setStats('attendance')
  //   } else if (stats === 'attendance') {
  //     setStats('income')
  //   }
  // }

  // const getOtherStat = (stats) => {
  //   if (stats === 'income') {
  //     return 'attendance'
  //   } else if (stats === 'attendance') {
  //     return 'income'
  //   }
  // }

  if (loading) {
    return <LoadingScreen />
  } else if (data) {
    const { bacentas, bacentaMemberCount } = data
    const serviceData = []

    bacentas[0].services.map((service) => {
      service.serviceRecords.map((record, index) => {
        if (index >= 6) {
          return
        }
        serviceData.push({
          date: parseNeoDate(record.serviceDate.date),
          attendance: record.attendance,
          income: record.income,
          [`${stats}`]: record[`${stats}`],
        })
      })
    })

    serviceData.sort(compareValues('date'))

    return (
      <>
        <NavBar />
        <div className="container">
          <div className=" my-3">
            <p className="mb-0">Welcome!</p>
            <h5>{`${bacentas[0].leader.fullName}`}</h5>
          </div>

          <div className="row">
            <div className="col">
              <div className="card rounded-corners membership-card">
                <Link to="/bacenta/members" className="card-body  ">
                  <span className="fas fa-users fa-2x  px-1 membership-icon" />
                  <p className="card-title dashboard-title mb-0">Membership</p>
                  <div className="info-text">{bacentaMemberCount}</div>
                </Link>
              </div>
            </div>
            {/* <div className="col align-self-center">
              <div className="row">
                <DashboardButton btnLink="/bacenta/record-service">
                  Fill Service Data
                </DashboardButton>
                <button
                  className="btn-primary p-2 btn-pill"
                  onClick={() => switchAttendanceIncome(stats)}
                >{`Show ${capitalise(getOtherStat(stats))}`}</button>
              </div>
            </div> */}
          </div>
          <div className="row mt-3">
            <div className="col">
              <p className="dashboard-title">Avg Attendance</p>
              <p className="info-text">400</p>
            </div>

            <div className="col">
              <p className="dashboard-title">Avg Income</p>
              <p className="info-text">400</p>
            </div>
          </div>
          <ChurchGraph
            churchData={bacentas}
            stat1="attendance"
            stat2="income"
            serviceData={serviceData}
          />
        </div>
      </>
    )
  } else {
    return <ErrorScreen />
  }
}

export default BacentaLeaderDashboard
