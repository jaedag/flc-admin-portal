import React from 'react'
import NavBar from '../../components/nav/NavBar'
// import { ChurchContext } from '../../contexts/ChurchContext'
import './BacentaLeaderDashboard.css'
import {
  ResponsiveContainer,
  XAxis,
  Tooltip,
  BarChart,
  Bar,
  LabelList,
} from 'recharts'
import { useQuery } from '@apollo/client'
import { BACENTA_LEADER_DASHBOARD } from '../../queries/DashboardQueries'
import LoadingScreen from '../../components/LoadingScreen'
import ErrorScreen from '../../components/ErrorScreen'
import { parseNeoDate } from '../../global-utils'

export const BacentaLeaderDashboard = () => {
  // const { bacentaId } = useContext(ChurchContext)
  const bacentaId = '5bc29bf0-0a17-4537-a60c-7668f79d403c'
  const { data, loading, error } = useQuery(BACENTA_LEADER_DASHBOARD, {
    variables: { bacentaId: bacentaId },
  })

  if (loading) {
    return <LoadingScreen />
  } else if (error) {
    return <ErrorScreen />
  }

  const { bacentas, bacentaMemberCount } = data

  const serviceData = bacentas[0].services[0].serviceRecords.map((service) => {
    return {
      date: parseNeoDate(service.serviceDate.date),
      income: service.income,
    }
  })

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
              <div className="card-body">
                <h5 className="card-title text-secondary">Membership</h5>
                <div className="display-2 text-center">
                  {bacentaMemberCount}
                </div>
              </div>
            </div>
          </div>
          <div className="col align-self-center">
            <button className="btn-primary btn-rounded p-3 btn-pill">
              Fill Attendance Data
            </button>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <h6 className="text-center">{`${bacentas[0].name} Bacenta`}</h6>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={serviceData}>
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#690c13" stopOpacity="0.4" />
                    <stop offset="75%" stopColor="#690c13" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                <Bar dataKey="income" barSize={30} fill="#690c13">
                  <LabelList dataKey="income" position="top" fill="#FFF" />
                </Bar>
                <XAxis dataKey="date" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  )
}

export default BacentaLeaderDashboard
