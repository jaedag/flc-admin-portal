import React, { useEffect, useState } from 'react'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import { MemberContext, SearchContext } from './contexts/MemberContext'
import { ChurchContext } from './contexts/ChurchContext'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import ProtectedRouteHome from './auth/ProtectedRouteHome.jsx'
import ServantsDashboard from 'pages/dashboards/ServantsDashboard'
import ServantsChurchList from 'pages/dashboards/ServantsChurchList'
import { ServiceContext } from 'contexts/ServiceContext'
import MembersDirectoryRoute from './pages/directory/MembersDirectoryRoute.jsx'
import Navigation from 'pages/dashboards/Navigation.jsx'
import ProtectedReports from 'pages/services/reports/ProtectedReports.jsx'
import { dashboards } from 'pages/dashboards/dashboardRoutes.js'
import {
  directory,
  memberDirectory,
  memberGrids,
} from 'pages/directory/directoryRoutes.js'
import { reports, services } from 'pages/services/servicesRoutes.js'
import { arrivals } from 'pages/arrivals/arrivalsRoutes.js'
import { campaigns } from 'pages/campaigns/campaignsRoutes.js'
import { reconciliation } from 'pages/reconciliation/reconRoutes.js'
import PageNotFound from 'pages/page-not-found/PageNotFound'
import SetPermissions from 'auth/SetPermissions'
import { permitMe } from 'permission-utils'
import useClickCard from 'hooks/useClickCard'

const PastorsAdmin = () => {
  const {
    clickCard,
    church,
    memberId,
    gatheringServiceId,
    streamId,
    councilId,
    constituencyId,
    bacentaId,
    fellowshipId,
    sontaId,
    ministryId,
    bussingRecordId,
    serviceRecordId,
  } = useClickCard()
  const [theme, setTheme] = useState('dark')

  const [currentUser, setCurrentUser] = useState(
    sessionStorage.getItem('currentUser')
      ? JSON.parse(sessionStorage.getItem('currentUser'))
      : {
          id: '',
          picture: '',
          firstName: '',
          lastName: '',
          fullName: '',
          bishop: '',
          church: {},
          email: '',
          constituency: '',
          roles: [],
        }
  )

  const [userJobs, setUserJobs] = useState()

  const [searchKey, setSearchKey] = useState('')
  const [filters, setFilters] = useState({
    gender: [],
    maritalStatus: [],
    occupation: '',
    leaderTitle: [],
    leaderRank: [],
    ministry: [],
  })

  useEffect(() => {
    if (theme === 'dark') document.body.style.backgroundColor = '#121212'
    else document.body.style.backgroundColor = '#FFFFFF'
  }, [theme])

  return (
    <Router>
      <ChurchContext.Provider
        value={{
          clickCard,
          filters,
          setFilters,
          church,
          memberId,
          gatheringServiceId,
          streamId,
          councilId,
          constituencyId,
          bacentaId,
          fellowshipId,
          sontaId,
          ministryId,
        }}
      >
        <MemberContext.Provider
          value={{
            memberId,
            currentUser,
            setCurrentUser,
            theme,
            setTheme,
            userJobs,
            setUserJobs,
          }}
        >
          <SearchContext.Provider value={{ searchKey, setSearchKey }}>
            <ServiceContext.Provider
              value={{
                serviceRecordId,
                bussingRecordId,
              }}
            >
              <SetPermissions>
                <Navigation />
                <div className={`bg ${theme}`}>
                  <Routes>
                    {[
                      ...dashboards,
                      ...directory,
                      ...services,
                      ...arrivals,
                      ...campaigns,
                      ...reconciliation,
                      ...reports,
                    ].map((route, i) => (
                      <Route
                        key={i}
                        path={route.path}
                        element={
                          <ProtectedRoute
                            roles={route.roles ?? ['all']}
                            placeholder={route.placeholder}
                          >
                            <route.element />
                          </ProtectedRoute>
                        }
                      />
                    ))}
                    {[...memberDirectory, ...memberGrids].map((route, i) => (
                      <Route
                        key={i}
                        path={route.path}
                        element={
                          <MembersDirectoryRoute
                            roles={route.roles}
                            placeholder={route.placeholder}
                          >
                            <route.element />
                          </MembersDirectoryRoute>
                        }
                      />
                    ))}

                    <Route
                      path="/services/trends"
                      element={
                        <ProtectedReports roles={['all']} placeholder exact />
                      }
                    />
                    <Route
                      path="/dashboard/servants"
                      element={
                        <ProtectedRouteHome
                          roles={permitMe('Fellowship')}
                          placeholder
                        >
                          <ServantsDashboard />
                        </ProtectedRouteHome>
                      }
                    />
                    <Route
                      path="/servants/church-list"
                      element={
                        <ProtectedRoute
                          roles={permitMe('Fellowship')}
                          placeholder
                        >
                          <ServantsChurchList />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </div>
              </SetPermissions>
            </ServiceContext.Provider>
          </SearchContext.Provider>
        </MemberContext.Provider>
      </ChurchContext.Provider>
    </Router>
  )
}

export default PastorsAdmin
