import React, { useEffect, useState } from 'react'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import { MemberContext, SearchContext } from './contexts/MemberContext'
import { ChurchContext } from './contexts/ChurchContext'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import ProtectedRouteHome from './auth/ProtectedRouteHome.jsx'
import ServantsDashboard from 'pages/dashboards/ServantsDashboard'
import ServantsChurchList from 'pages/dashboards/ServantsChurchList'
import { ServiceContext } from 'contexts/ServiceContext'
import ChurchDirectoryRoute from 'auth/ChurchDirectoryRoute'
import MembersDirectoryRoute from './pages/directory/MembersDirectoryRoute.jsx'
import Navigation from 'pages/dashboards/Navigation.jsx'
import ProtectedReports from 'pages/services/reports/ProtectedReports.jsx'
import { dashboards } from 'pages/routes/dashboardRoutes.js'
import {
  churchDirectory,
  directory,
  memberDirectory,
  memberGrids,
} from 'pages/routes/directoryRoutes.js'
import { reports, services } from 'pages/routes/servicesRoutes.js'
import { arrivals } from 'pages/routes/arrivalsRoutes.js'
import { campaigns } from 'pages/routes/campaignsRoutes.js'
import { reconciliation } from 'pages/routes/reconRoutes.js'
import PageNotFound from 'pages/page-not-found/PageNotFound'
import SetPermissions from 'auth/SetPermissions'

const PastorsAdmin = () => {
  const [church, setChurch] = useState(
    sessionStorage.getItem('church')
      ? JSON.parse(sessionStorage.getItem('church'))
      : { church: '', subChurch: '' }
  )
  const [gatheringServiceId, setGatheringServiceId] = useState(
    sessionStorage.getItem('gatheringServiceId')
      ? sessionStorage.getItem('gatheringServiceId')
      : ''
  )
  const [streamId, setStreamId] = useState(
    sessionStorage.getItem('streamId') ?? ''
  )

  const [councilId, setCouncilId] = useState(
    sessionStorage.getItem('councilId') ?? ''
  )
  const [constituencyId, setConstituencyId] = useState(
    sessionStorage.getItem('constituencyId') ?? ''
  )
  const [bacentaId, setBacentaId] = useState(
    sessionStorage.getItem('bacentaId') ?? ''
  )
  const [fellowshipId, setFellowshipId] = useState(
    sessionStorage.getItem('fellowshipId') ?? ''
  )
  const [serviceRecordId, setServiceRecordId] = useState(
    sessionStorage.getItem('serviceRecordsId') ?? ''
  )

  const [sontaId, setSontaId] = useState(
    sessionStorage.getItem('sontaId') ?? ''
  )
  const [ministryId, setMinistryId] = useState(
    sessionStorage.getItem('ministryId') ?? ''
  )
  const [memberId, setMemberId] = useState(
    sessionStorage.getItem('memberId') ?? ''
  )
  const [theme, setTheme] = useState('dark')
  const [currentUser, setCurrentUser] = useState({
    id: '',
    picture: '',
    firstName: '',
    lastName: '',
    fullName: '',
    bishop: '',
    church: {},
    email: '',
    constituency: '',
    roles: [''],
  })
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

  //Setting Up for Popup
  const [isOpen, setIsOpen] = useState(false)
  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const determineStream = (member) => {
    setChurch({ church: member.stream_name, subChurch: 'bacenta' })
    sessionStorage.setItem(
      'church',
      JSON.stringify({
        church: member.stream_name,
        subChurch: 'bacenta',
      })
    )

    if (member?.council?.id) {
      setCouncilId(member.council.id)
      sessionStorage.setItem('councilId', member.council.id)
    }

    if (member.stream?.id) {
      setStreamId(member.stream.id)
      sessionStorage.setItem('streamId', member.stream.id)
    }

    return
  }

  const clickCard = (card) => {
    determineStream(card)

    switch (card.__typename) {
      case 'Member':
        setMemberId(card.id)
        sessionStorage.setItem('memberId', card.id)
        break
      case 'Sonta':
        setSontaId(card.id)
        sessionStorage.setItem('sontaId', card.id)
        break
      case 'Fellowship':
        setFellowshipId(card.id)
        sessionStorage.setItem('fellowshipId', card.id)
        break
      case 'Bacenta':
        setBacentaId(card.id)
        sessionStorage.setItem('bacentaId', card.id)
        break
      case 'Constituency':
        setConstituencyId(card.id)
        sessionStorage.setItem('constituencyId', card.id)
        break
      case 'Council':
        setCouncilId(card.id)
        sessionStorage.setItem('councilId', card.id)
        break
      case 'Stream':
        setStreamId(card.id)
        sessionStorage.setItem('streamId', card.id)
        break
      case 'Basonta':
        setSontaId(card.sonta.id)
        sessionStorage.setItem('sontaId', card.sonta.id)
        break
      default:
        break
    }

    if (card.__typename === 'Basonta') {
      card.link = '/sonta/displaydetails'
    }

    if (card.link === '' || card.constituency === true) {
      card.link = `/${card.__typename.toLowerCase()}/displaydetails`
    }
  }

  useEffect(() => {
    if (theme === 'dark') document.body.style.backgroundColor = '#121212'
    else document.body.style.backgroundColor = '#FFFFFF'
  }, [theme])

  return (
    <Router>
      <ChurchContext.Provider
        value={{
          clickCard,
          determineStream,
          isOpen,
          togglePopup,
          filters,
          setFilters,
          church,
          setChurch,
          gatheringServiceId,
          setGatheringServiceId,
          streamId,
          setStreamId,
          councilId,
          setCouncilId,
          constituencyId,
          setConstituencyId,
          bacentaId,
          setBacentaId,
          fellowshipId,
          setFellowshipId,
          sontaId,
          setSontaId,
          ministryId,
          setMinistryId,
        }}
      >
        <MemberContext.Provider
          value={{
            memberId,
            setMemberId,
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
              value={{ setServiceRecordId, serviceRecordId }}
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
                            roles={route.roles}
                            placeholder={route.placeholder}
                          >
                            <route.element />
                          </ProtectedRoute>
                        }
                      />
                    ))}
                    {churchDirectory.map((route, i) => (
                      <Route
                        key={i}
                        path={route.path}
                        element={
                          <ChurchDirectoryRoute
                            roles={route.roles}
                            placeholder={route.placeholder}
                          >
                            <route.element />
                          </ChurchDirectoryRoute>
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
                          roles={[
                            'adminFederal',
                            'adminCouncil',
                            'adminConstituency',
                            'leaderFellowship',
                            'leaderBacenta',
                            'leaderConstituency',
                          ]}
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
                          roles={[
                            'adminFederal',
                            'adminCouncil',
                            'adminConstituency',
                            'leaderFellowship',
                            'leaderBacenta',
                            'leaderConstituency',
                          ]}
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
