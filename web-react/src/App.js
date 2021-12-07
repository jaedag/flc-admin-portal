import React, { useEffect, useState } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import BishopDashboard from './pages/dashboards/BishopDashboard.jsx'
import CouncilMembers from './pages/grids/CouncilMembers.jsx'
import CampusTownMembers from './pages/grids/CampusTownMembers.jsx'
import BacentaMembers from './pages/grids/BacentaMembers.jsx'
import FellowshipMembers from './pages/grids/FellowshipMembers.jsx'
import SontaMembers from './pages/grids/SontaMembers.jsx'
import SearchPageMobile from './pages/mobile/SearchPage'
import DisplayMemberDetails from './pages/display/DetailsMember'
import CreateMember from './pages/create/CreateMember'
import UpdateMember from './pages/update/UpdateMember.jsx'
import CreateFellowship from './pages/create/CreateFellowship'
import CreateBacenta from './pages/create/CreateBacenta.jsx'
import CreateTownCampus from './pages/create/CreateTownCampus'
import UpdateTownCampus from './pages/update/UpdateTownCampus.jsx'
import DetailsFellowship from './pages/display/DetailsFellowship'
import DisplayBacentaDetails from './pages/display/DetailsBacenta'
import DisplayCampusTownDetails from './pages/display/DetailsCampusTown.jsx'
import DisplaySontaDetails from './pages/display/DetailsSonta.jsx'
import { MemberContext, SearchContext } from './contexts/MemberContext'
import { ChurchContext } from './contexts/ChurchContext'
import DisplayAllFellowships from './pages/display/AllFellowships'
import DisplayAllBacentas from './pages/display/AllBacentas'
import DisplayAllSontas from './pages/display/AllSontas'
import DisplayAllTownCampuses from './pages/display/AllTownCampuses'
import UpdateBacenta from './pages/update/UpdateBacenta'
import DisplaySontasByCampusTown from './pages/display/SontasByCampusTown'
import UpdateFellowship from './pages/update/UpdateFellowship'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import ProtectedRouteHome from './auth/ProtectedRouteHome.jsx'
import ProtectedMembersRoute from './pages/directory/MembersDirectoryRoute.jsx'
import MemberFiltersMobile from './pages/mobile/MemberFilters'
import UserProfileDisplayPage from './pages/user-profile/DisplayPage'
import UserProfileEditPage from './pages/user-profile/EditPage'
import CreateSonta from './pages/create/CreateSonta'
import FellowshipService from './pages/record-service/FellowshipService'
import FellowshipReport from './pages/reports/FellowshipReport'
import ServantsDashboard from 'pages/dashboards/ServantsDashboard'
import BacentaReport from 'pages/reports/BacentaReport'
import ServantsChurchList from 'pages/dashboards/ServantsChurchList'
import BacentaService from 'pages/record-service/BacentaService'
import FellowshipServiceDetails from 'pages/record-service/FellowshipServiceDetails'
import { ServiceContext } from 'contexts/ServiceContext'
import BacentaServiceDetails from 'pages/record-service/BacentaServiceDetails'
import TownService from 'pages/record-service/TownService'
import TownServiceDetails from 'pages/record-service/TownServiceDetails'
import CampusService from 'pages/record-service/CampusService'
import CampusServiceDetails from 'pages/record-service/CampusServiceDetails'
import CampusReport from 'pages/reports/CampusReport'
import SontaReport from 'pages/reports/SontaReport'
import SontaService from 'pages/record-service/SontaService'
import UpdateSonta from 'pages/update/UpdateSonta'
import TownReport from 'pages/reports/TownReport'
import SontaServiceDetails from 'pages/record-service/SontaServiceDetails'
import FellowshipServiceCancelled from 'pages/record-service/FellowshipServiceCancelled'
import Directory from 'pages/dashboards/Directory'
import Services from 'pages/services/ServicesMenu'
import Arrivals from 'pages/dashboards/Arrivals'
import Campaigns from 'pages/dashboards/Campaigns'
import Reconciliation from 'pages/dashboards/Reconciliation'
import Churches from 'pages/directory/Churches'
import Members from 'pages/directory/Members'
import ChurchDirectoryRoute from 'auth/ChurchDirectoryRoute'
import MembersDirectoryRoute from './pages/directory/MembersDirectoryRoute.jsx'
import UserDashboard from 'pages/dashboards/UserDashboard'
import Navigation from 'pages/dashboards/Navigation.jsx'
import ServicesChurchList from 'pages/services/ServicesChurchList'
import ProtectedReports from 'pages/reports/ProtectedReports.jsx'
import BankingSlipView from 'pages/services/BankingSlipView.jsx'
import BankingSlipSubmission from 'pages/services/BankingSlipSubmission.jsx'
import DetailsCouncil from 'pages/display/DetailsCouncil.jsx'
import CouncilReport from 'pages/reports/CouncilReport.jsx'
import Fellowship from 'pages/services/Fellowship.jsx'
import ConstituencyJoint from 'pages/services/ConstituencyJoint.jsx'
import BacentaJoint from 'pages/services/BacentaJoint.jsx'
import DetailsStream from 'pages/display/DetailsStream.jsx'

const PastorsAdmin = () => {
  const [church, setChurch] = useState(
    sessionStorage.getItem('church')
      ? JSON.parse(sessionStorage.getItem('church'))
      : { church: '', subChurch: '' }
  )
  const [streamId, setStreamId] = useState(
    sessionStorage.getItem('streamId') ? sessionStorage.getItem('streamId') : ''
  )
  const [councilId, setCouncilId] = useState(
    sessionStorage.getItem('councilId')
      ? sessionStorage.getItem('councilId')
      : ''
  )
  const [townId, setTownId] = useState(
    sessionStorage.getItem('townId') ? sessionStorage.getItem('townId') : ''
  )
  const [campusId, setCampusId] = useState(
    sessionStorage.getItem('campusId') ? sessionStorage.getItem('campusId') : ''
  )
  const [fellowshipId, setFellowshipId] = useState(
    sessionStorage.getItem('fellowshipId')
      ? sessionStorage.getItem('fellowshipId')
      : ''
  )
  const [serviceRecordId, setServiceRecordId] = useState(
    sessionStorage.getItem('serviceRecordsId')
      ? sessionStorage.getItem('serviceRecordsId')
      : ''
  )
  const [bacentaId, setBacentaId] = useState(
    sessionStorage.getItem('bacentaId')
      ? sessionStorage.getItem('bacentaId')
      : ''
  )
  const [sontaId, setSontaId] = useState(
    sessionStorage.getItem('sontaId') ? sessionStorage.getItem('sontaId') : ''
  )
  const [ministryId, setMinistryId] = useState(
    sessionStorage.getItem('ministryId')
      ? sessionStorage.getItem('ministryId')
      : ''
  )
  const [memberId, setMemberId] = useState(
    sessionStorage.getItem('memberId') ? sessionStorage.getItem('memberId') : ''
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
    //switch case for other church types
    switch (member?.__typename) {
      case 'Council':
        setChurch({ church: member.stream, subChurch: 'bacenta' })
        break
      case 'Town':
        setChurch({ church: member.stream, subChurch: 'bacenta' })
        sessionStorage.setItem(
          'church',
          JSON.stringify({
            church: member.stream,
            subChurch: 'bacenta',
          })
        )

        if (member.council?.id) {
          setCouncilId(member.council?.id)
          sessionStorage.setItem('councilId', member.council?.id)
        }
        break
      case 'Campus':
        setChurch({ church: 'campus', subChurch: 'bacenta' })
        sessionStorage.setItem(
          'church',
          JSON.stringify({
            church: 'campus',
            subChurch: 'bacenta',
          })
        )

        if (member.council?.id) {
          setCouncilId(member.council?.id)
          sessionStorage.setItem('councilId', member.council?.id)
        }
        break
      case 'Bacenta':
        setChurch({
          church: member.campus ? 'campus' : 'town',
          subChurch: 'bacenta',
        })
        sessionStorage.setItem(
          'church',
          JSON.stringify({
            church: member.campus ? 'campus' : 'town',
            subChurch: 'bacenta',
          })
        )

        if (member.campus) {
          setCouncilId(member?.campus.council?.id)
          sessionStorage.setItem('councilId', member?.campus.council?.id)
        }
        if (member.town) {
          setCouncilId(member?.town.council.id)
          sessionStorage.setItem('councilId', member?.town.council.id)
        }
        break
      case 'Fellowship':
        setChurch({
          church: member.bacenta?.stream,
          subChurch: 'bacenta',
        })
        sessionStorage.setItem(
          'church',
          JSON.stringify({
            church: member.bacenta?.stream,
            subChurch: 'bacenta',
          })
        )

        if (member.bacenta?.town?.council.id) {
          setCouncilId(member.bacenta?.town?.council.id)
          sessionStorage.setItem('councilId', member.bacenta?.town?.council.id)

          if (member.bacenta?.campus?.council.id) {
            setCouncilId(member.bacenta?.campus?.council.id)
            sessionStorage.setItem(
              'councilId',
              member.bacenta?.campus?.council.id
            )
          }
        }

        break
      default:
    }

    if (member?.fellowship?.bacenta?.town) {
      setChurch({ church: 'town', subChurch: 'bacenta' })
      sessionStorage.setItem(
        'church',
        JSON.stringify({
          church: 'town',
          subChurch: 'bacenta',
        })
      )
      setCouncilId(member.fellowship.bacenta.town.council.id)
      sessionStorage.setItem(
        'councilId',
        member.fellowship.bacenta.town.council.id
      )
      return
    } else if (member.leadsTown && member.leadsTown[0]) {
      setChurch({ church: 'town', subChurch: 'bacenta' })
      sessionStorage.setItem(
        'church',
        JSON.stringify({
          church: 'town',
          subChurch: 'bacenta',
        })
      )
      setCouncilId(member?.leadsTown[0].council?.id)
      sessionStorage.setItem('councilId', member.leadsTown[0].council?.id)
      return
    } else if (member?.fellowship?.bacenta?.campus) {
      setChurch({ church: 'campus', subChurch: 'bacenta' })
      sessionStorage.setItem(
        'church',
        JSON.stringify({
          church: 'campus',
          subChurch: 'bacenta',
        })
      )
      setCouncilId(member?.fellowship?.bacenta?.campus?.council?.id)
      sessionStorage.setItem(
        'councilId',
        member?.fellowship?.bacenta?.campus?.council?.id
      )
      return
    } else if (member?.leadsCampus && member.leadsCampus[0]) {
      setChurch({ church: 'campus', subChurch: 'bacenta' })
      sessionStorage.setItem(
        'church',
        JSON.stringify({
          church: 'campus',
          subChurch: 'bacenta',
        })
      )
      setCouncilId(member.leadsCampus[0].council?.id)
      sessionStorage.setItem('councilId', member.leadsCampus[0].council?.id)
      return
    }
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
      case 'Town':
        setTownId(card.id)
        sessionStorage.setItem('townId', card.id)
        break
      case 'Council':
        setCouncilId(card.id)
        sessionStorage.setItem('councilId', card.id)
        break
      case 'Campus':
        setCampusId(card.id)
        sessionStorage.setItem('campusId', card.id)
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
    if (card.__typename === 'Bishop') {
      setCouncilId(card.id)
      card.link = '/dashboard'
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
          streamId,
          setStreamId,
          councilId,
          setCouncilId,
          townId,
          setTownId,
          campusId,
          setCampusId,
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
              <Navigation />
              <div className={`bg ${theme}`}>
                <Switch>
                  {/* Landing Pages - Dashboards for Different Roles */}
                  <ProtectedRoute
                    path="/"
                    component={UserDashboard}
                    placeholder
                    exact
                  />
                  <Route path="/directory" component={Directory} exact />
                  <ChurchDirectoryRoute
                    path="/directory/churches"
                    component={Churches}
                    exact
                  />
                  <MembersDirectoryRoute
                    path="/directory/members/"
                    component={Members}
                    exact
                  />
                  <Route
                    path="/services/church-list"
                    component={ServicesChurchList}
                    exact
                  />
                  <Route path="/services" component={Services} exact />
                  <ProtectedRoute
                    path="/services/fellowship"
                    component={Fellowship}
                    roles={['all']}
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    path="/services/bacenta"
                    component={BacentaJoint}
                    roles={['all']}
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    path="/services/centre"
                    component={CentreJoint}
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    path="/services/campus"
                    component={ConstituencyJoint}
                    roles={['all']}
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    path="/services/town"
                    component={ConstituencyJoint}
                    roles={['all']}
                    placeholder
                    exact
                  />
                  <ProtectedReports
                    path="/services/trends"
                    roles={['all']}
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    path="/services/banking-slips"
                    component={BankingSlipView}
                    roles={['all']}
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    path="/banking-slip/submission"
                    component={BankingSlipSubmission}
                    roles={['all']}
                    placeholder
                    exact
                  />
                  <Route path="/arrivals" component={Arrivals} exact />
                  <Route path="/campaigns" component={Campaigns} exact />
                  <Route path="/recon" component={Reconciliation} exact />
                  <ProtectedRouteHome
                    path="/dashboard"
                    component={BishopDashboard}
                    roles={['adminFederal', 'adminCouncil']}
                    exact
                  />
                  <ProtectedRouteHome
                    path="/dashboard/servants"
                    component={ServantsDashboard}
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderFellowship',
                      'leaderBacenta',
                      'leaderCampus',
                      'leaderTown',
                    ]}
                    exact
                  />
                  <ProtectedRouteHome
                    path="/servants/church-list"
                    component={ServantsChurchList}
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderFellowship',
                      'leaderBacenta',
                      'leaderCampus',
                      'leaderTown',
                    ]}
                    exact
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderFellowship',
                      'leaderBacenta',
                      'leaderCampus',
                      'leaderTown',
                    ]}
                    path="/fellowship/reports"
                    component={FellowshipReport}
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderBacenta',
                      'leaderCampus',
                      'leaderTown',
                    ]}
                    path="/bacenta/reports"
                    component={BacentaReport}
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderBacenta',
                      'leaderSonta',
                      'leaderCampus',
                      'leaderTown',
                    ]}
                    path="/sonta/reports"
                    component={SontaReport}
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderCampus',
                      'leaderTown',
                    ]}
                    path="/campus/reports"
                    component={CampusReport}
                    placeholder
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderCampus',
                      'leaderTown',
                    ]}
                    path="/town/reports"
                    component={TownReport}
                    placeholder
                  />
                  <ProtectedRoute
                    roles={['adminFederal', 'adminCouncil']}
                    path="/council/reports"
                    component={CouncilReport}
                    placeholder
                  />
                  {/* Member Display and Edit Pages */}
                  <ProtectedRoute
                    roles={['all']}
                    path="/user-profile"
                    component={UserProfileDisplayPage}
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    roles={['all']}
                    path="/member/displaydetails"
                    component={DisplayMemberDetails}
                    exact
                  />
                  <ProtectedRoute
                    roles={['all']}
                    path="/user-profile/edit"
                    component={UserProfileEditPage}
                    exact
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderCampus',
                      'leaderTown',
                      'leaderBacenta',
                      'leaderFellowship',
                    ]}
                    path="/member/addmember"
                    component={CreateMember}
                    exact
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderBacenta',
                      'leaderTown',
                      'leaderCampus',
                    ]}
                    path="/member/editmember"
                    component={UpdateMember}
                    exact
                  />
                  {/* Search Routes */}
                  <ProtectedRoute
                    roles={['all']}
                    path="/search-results"
                    component={SearchPageMobile}
                    exact
                  />
                  <ProtectedRoute
                    roles={['all']}
                    path="/filter-members"
                    component={MemberFiltersMobile}
                    exact
                  />
                  {/* Member Grid Display Pages */}
                  <ProtectedMembersRoute
                    roles={['adminFederal', 'adminCouncil']}
                    path="/members"
                    component={CouncilMembers}
                    exact
                  />
                  <ProtectedMembersRoute
                    roles={['adminFederal', 'adminCouncil']}
                    path="/council/members"
                    component={CouncilMembers}
                    exact
                  />
                  <ProtectedMembersRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                    ]}
                    path="/campus/members"
                    component={CampusTownMembers}
                    exact
                  />
                  <ProtectedMembersRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                    ]}
                    path="/town/members"
                    component={CampusTownMembers}
                    exact
                  />
                  <ProtectedMembersRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                    ]}
                    path="/bacenta/members"
                    component={BacentaMembers}
                    exact
                  />
                  <ProtectedMembersRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderFellowship',
                    ]}
                    path="/fellowship/members"
                    component={FellowshipMembers}
                    exact
                  />
                  <ProtectedMembersRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderSonta',
                    ]}
                    path="/sonta/members"
                    component={SontaMembers}
                    exact
                  />
                  <ProtectedRoute
                    roles={['all']}
                    path="/pastors"
                    component={CouncilMembers}
                    exact
                  />
                  {/* Pages to Display Church Details  */}
                  <ProtectedRoute
                    roles={['all']}
                    path="/fellowship/displaydetails"
                    component={DetailsFellowship}
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    roles={['all']}
                    path="/bacenta/displaydetails"
                    component={DisplayBacentaDetails}
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminTown',
                      'bishop',
                      'leaderTown',
                    ]}
                    path="/town/displaydetails"
                    component={DisplayCampusTownDetails}
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'bishop',
                      'leaderCampus',
                    ]}
                    path="/campus/displaydetails"
                    component={DisplayCampusTownDetails}
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    roles={['adminFederal', 'adminCouncil', 'bishop']}
                    path="/council/displaydetails"
                    component={DetailsCouncil}
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    roles={['adminFederal', 'adminStream', 'adminCouncil']}
                    path="/stream/displaydetails"
                    component={DetailsStream}
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    roles={['all']}
                    path="/sonta/displaydetails"
                    component={DisplaySontaDetails}
                    exact
                  />
                  {/* Pages to Display Lists in the Directory */}
                  <ProtectedRoute
                    roles={['all']}
                    path="/bacenta/displayall"
                    component={DisplayAllBacentas}
                    exact
                  />
                  <ProtectedRoute
                    roles={['all']}
                    path="/sonta/displayall"
                    component={DisplayAllSontas}
                    exact
                  />
                  <ProtectedRoute
                    roles={['all']}
                    path="/town/display-sontas"
                    component={DisplaySontasByCampusTown}
                    exact
                  />
                  <ProtectedRoute
                    roles={['all']}
                    path="/campus/display-sontas"
                    component={DisplaySontasByCampusTown}
                    exact
                  />
                  <ProtectedRoute
                    roles={['adminFederal', 'adminCouncil']}
                    path="/town/displayall"
                    component={DisplayAllTownCampuses}
                    exact
                  />
                  <ProtectedRoute
                    roles={['adminFederal', 'adminCouncil']}
                    path="/campus/displayall"
                    component={DisplayAllTownCampuses}
                    exact
                  />
                  <ProtectedRoute
                    roles={['all']}
                    path="/fellowship/displayall"
                    component={DisplayAllFellowships}
                    exact
                  />
                  {/* Pages to Create Directory  */}
                  <ProtectedRoute
                    roles={['adminFederal', 'adminCouncil']}
                    path="/town/addtown"
                    component={CreateTownCampus}
                    exact
                  />
                  <ProtectedRoute
                    roles={['adminFederal', 'adminCouncil']}
                    path="/campus/addcampus"
                    component={CreateTownCampus}
                    exact
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                    ]}
                    path="/bacenta/addbacenta"
                    component={CreateBacenta}
                    exact
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                    ]}
                    path="/fellowship/addfellowship"
                    component={CreateFellowship}
                    exact
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                    ]}
                    path="/sonta/addsonta"
                    component={CreateSonta}
                    exact
                  />
                  {/* Pages to Update Directory */}
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                    ]}
                    path="/fellowship/editfellowship"
                    component={UpdateFellowship}
                    exact
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderTown',
                    ]}
                    path="/bacenta/editbacenta"
                    component={UpdateBacenta}
                    exact
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                    ]}
                    path="/sonta/editsonta"
                    component={UpdateSonta}
                    exact
                  />
                  <ProtectedRoute
                    roles={['adminFederal', 'adminCouncil']}
                    path="/town/edittown"
                    component={UpdateTownCampus}
                    exact
                  />
                  <ProtectedRoute
                    roles={['adminFederal', 'adminCouncil']}
                    path="/campus/editcampus"
                    component={UpdateTownCampus}
                    exact
                  />
                  {/* Fellowship Leader Routes */}
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                    ]}
                    path="/fellowship/service-details"
                    component={FellowshipServiceDetails}
                    placeholder
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                    ]}
                    path="/services/fellowship/no-service"
                    component={FellowshipServiceCancelled}
                    placeholder
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderFellowship',
                    ]}
                    path="/services/fellowship/form"
                    component={FellowshipService}
                  />{' '}
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderFellowship',
                    ]}
                    path="/fellowship/record-service"
                    component={FellowshipService}
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminTown',
                      'leaderTown',
                    ]}
                    path="/services/town/constituency-joint/form"
                    component={TownService}
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'leaderCampus',
                    ]}
                    path="/services/campus/constituency-joint/form"
                    component={CampusService}
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderBacenta',
                    ]}
                    path="/bacenta/record-service"
                    component={BacentaService}
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderCampus',
                      'leaderTown',
                      'leaderSonta',
                    ]}
                    path="/sonta/record-service"
                    component={SontaService}
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderCampus',
                      'leaderTown',
                      'leaderBacenta',
                    ]}
                    path="/sonta/service-details"
                    component={SontaServiceDetails}
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderCampus',
                      'leaderTown',
                      'leaderBacenta',
                    ]}
                    path="/bacenta/service-details"
                    component={BacentaServiceDetails}
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderCampus',
                      'leaderTown',
                    ]}
                    path="/town/record-service"
                    component={TownService}
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminTown',
                      'leaderTown',
                    ]}
                    path="/town/service-details"
                    component={TownServiceDetails}
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'leaderCampus',
                    ]}
                    path="/campus/record-service"
                    component={CampusService}
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'leaderCampus',
                    ]}
                    path="/campus/service-details"
                    component={CampusServiceDetails}
                  />
                </Switch>
              </div>
            </ServiceContext.Provider>
          </SearchContext.Provider>
        </MemberContext.Provider>
      </ChurchContext.Provider>
    </Router>
  )
}

export default PastorsAdmin
