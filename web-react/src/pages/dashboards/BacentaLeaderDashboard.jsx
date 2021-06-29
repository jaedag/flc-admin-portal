import React, { useContext, useState } from 'react'
import NavBar from '../../components/nav/NavBar'
import { ChurchContext } from '../../contexts/ChurchContext'
import './BacentaLeaderDashboard.css'
import { useQuery } from '@apollo/client'
import { BACENTA_LEADER_DASHBOARD } from '../../queries/DashboardQueries'
import LoadingScreen from '../../components/LoadingScreen'
import ErrorScreen from '../../components/ErrorScreen'
import { capitalise, compareValues, parseNeoDate } from '../../global-utils'
import { Link } from 'react-router-dom'
import DashboardButton from '../../components/buttons/DashboardButton'
import ChurchGraph from '../../components/ChurchGraph'

export const BacentaLeaderDashboard = () => {
  const { bacentaId } = useContext(ChurchContext)

  const [stats, setStats] = useState('attendance')
  const { data, loading } = useQuery(BACENTA_LEADER_DASHBOARD, {
    variables: { bacentaId: bacentaId },
  })

  const switchAttendanceIncome = (stats) => {
    if (stats === 'income') {
      setStats('attendance')
    } else if (stats === 'attendance') {
      setStats('income')
    }
  }

  const getOtherStat = (stats) => {
    if (stats === 'income') {
      return 'attendance'
    } else if (stats === 'attendance') {
      return 'income'
    }
  }

  if (loading) {
    return <LoadingScreen />
  } else if (data) {
    const { bacentas, bacentaMemberCount } = data
    const serviceData = []

    bacentas[0].services.map((service) => {
      service.serviceRecords.map((record) => {
        serviceData.push({
          date: parseNeoDate(record.serviceDate.date),
          [`${stats}`]: record[`${stats}`],
        })
      })
    })

    serviceData.sort(compareValues('date'))

    return (
      <>
        <NavBar />
        <div className="container">
          <div className="container my-4">
            <p className="text-center mb-0">Welcome!</p>
            <h4 className="text-center">{`${bacentas[0].leader.fullName}`}</h4>
          </div>

          <div className="row">
            <div className="col-auto">
              <div className="card rounded-corners">
                <Link to="/bacenta/members" className="card-body">
                  <h5 className="card-title text-secondary">Membership</h5>
                  <div className="display-3 text-center font-weight-bold">
                    {bacentaMemberCount}
                  </div>
                </Link>
              </div>
            </div>
            <div className="col align-self-center">
              <div className="row">
                <DashboardButton btnLink="/bacenta/record-service">
                  Fill Service Data
                </DashboardButton>
                <button
                  className="btn-primary p-2 btn-pill"
                  onClick={() => switchAttendanceIncome(stats)}
                >{`Show ${capitalise(getOtherStat(stats))}`}</button>
              </div>
            </div>
          </div>
          <ChurchGraph
            churchData={bacentas}
            stat={stats}
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
