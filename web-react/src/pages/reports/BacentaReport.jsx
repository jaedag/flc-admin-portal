import React, { useContext, useState } from 'react'
import NavBar from '../../components/nav/NavBar'
import { ChurchContext } from '../../contexts/ChurchContext'
import './BacentaReport.css'
import { useQuery } from '@apollo/client'

import LoadingScreen from '../../components/LoadingScreen'
import ErrorScreen from '../../components/ErrorScreen'
import { average, sortingFunction, parseNeoDate } from '../../global-utils'
import { Link } from 'react-router-dom'
import ChurchGraph from '../../components/ChurchGraph/ChurchGraph'
import { BACENTA_REPORT } from './ReportQueries'

export const BacentaReport = () => {
  const { bacentaId } = useContext(ChurchContext)

  const [stats] = useState('attendance')
  const { data, loading } = useQuery(BACENTA_REPORT, {
    variables: { bacentaId: bacentaId },
  })

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

    serviceData.sort(sortingFunction('date'))

    const monthlyStatAverage = (data, stat) => {
      const statArray = data.map((service) => service[`${stat}`])
      //Calculate average of the last four weeks of service
      return average(statArray.slice(-4)).toFixed(2)
    }

    return (
      <>
        <NavBar />
        <div className="container">
          <div className=" my-3">
            <h5 className="mb-0">{`${bacentas[0].name} Bacenta`}</h5>{' '}
            <p>
              <span className="text-secondary font-weight-bold">Leader: </span>
              {`${bacentas[0].leader.fullName}`}
            </p>
          </div>

          <div className="row">
            <div className="col">
              <div className="card rounded-corners membership-card">
                <Link to="/bacenta/members" className="card-body white">
                  <span className="fas fa-users fa-2x px-1 membership-icon" />
                  <p className="card-title dashboard-title mb-0">Membership</p>
                  <div className="info-text">{bacentaMemberCount}</div>
                </Link>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <p className="dashboard-title">Avg Attendance</p>
              <p className="info-text">
                {monthlyStatAverage(serviceData, 'attendance')}
              </p>
            </div>

            <div className="col">
              <p className="dashboard-title">Avg Income (in GH₵)</p>
              <p className="info-text">
                {`${monthlyStatAverage(serviceData, 'income')}`}
              </p>
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

export default BacentaReport
