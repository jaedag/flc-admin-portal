import React, { useEffect, useState } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import BishopDashboard from './pages/dashboards/BishopDashboard.jsx'
import CouncilMembers from './pages/grids/CouncilMembers.jsx'
import CampusTownMembers from './pages/grids/CampusTownMembers.jsx'
import CentreMembers from './pages/grids/CentreMembers.jsx'
import BacentaMembers from './pages/grids/BacentaMembers.jsx'
import SontaMembers from './pages/grids/SontaMembers.jsx'
import SearchPageMobile from './pages/mobile/SearchPage'
import DisplayMemberDetails from './pages/display/DetailsMember'
import CreateMember from './pages/create/CreateMember'
import UpdateMember from './pages/update/UpdateMember.jsx'
import CreateBacenta from './pages/create/CreateBacenta'
import CreateCentre from './pages/create/CreateCentre.jsx'
import CreateTownCampus from './pages/create/CreateTownCampus'
import UpdateTownCampus from './pages/update/UpdateTownCampus.jsx'
import DetailsBacenta from './pages/display/DetailsBacenta'
import DisplayCentreDetails from './pages/display/DetailsCentre'
import DisplayCampusTownDetails from './pages/display/DetailsCampusTown.jsx'
import DisplaySontaDetails from './pages/display/DetailsSonta.jsx'
import { MemberContext, SearchContext } from './contexts/MemberContext'
import { ChurchContext } from './contexts/ChurchContext'
import DisplayAllBacentas from './pages/display/AllBacentas'
import DisplayAllCentres from './pages/display/AllCentres'
import DisplayAllSontas from './pages/display/AllSontas'
import DisplayAllTownCampuses from './pages/display/AllTownCampuses'
import UpdateCentre from './pages/update/UpdateCentre'
import DisplaySontasByCampusTown from './pages/display/SontasByCampusTown'
import UpdateBacenta from './pages/update/UpdateBacenta'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import ProtectedRouteHome from './auth/ProtectedRouteHome.jsx'
import ProtectedMembersRoute from './pages/directory/MembersDirectoryRoute.jsx'
import MemberFiltersMobile from './pages/mobile/MemberFilters'
import UserProfileDisplayPage from './pages/user-profile/DisplayPage'
import UserProfileEditPage from './pages/user-profile/EditPage'
import CreateSonta from './pages/create/CreateSonta'
import BacentaService from './pages/record-service/BacentaService'
import BacentaReport from './pages/reports/BacentaReport'
import ServantsDashboard from 'pages/dashboards/ServantsDashboard'
import CentreReport from 'pages/reports/CentreReport'
import ServantsChurchList from 'pages/dashboards/ServantsChurchList'
import CentreService from 'pages/record-service/CentreService'
import BacentaServiceDetails from 'pages/record-service/BacentaServiceDetails'
import { ServiceContext } from 'contexts/ServiceContext'
import CentreServiceDetails from 'pages/record-service/CentreServiceDetails'
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
import BacentaServiceCancelled from 'pages/record-service/BacentaServiceCancelled'
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
import CentreJoint from 'pages/services/CentreJoint.jsx'

const PastorsAdmin = () => {
  const [church, setChurch] = useState(
    sessionStorage.getItem('church')
      ? JSON.parse(sessionStorage.getItem('church'))
      : { church: '', subChurch: '' }
  )

  const [bishopId, setBishopId] = useState(
    sessionStorage.getItem('bishopId') ? sessionStorage.getItem('bishopId') : ''
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
  const [bacentaId, setBacentaId] = useState(
    sessionStorage.getItem('bacentaId')
      ? sessionStorage.getItem('bacentaId')
      : ''
  )
  const [serviceRecordId, setServiceRecordId] = useState(
    sessionStorage.getItem('serviceRecordsId')
      ? sessionStorage.getItem('serviceRecordsId')
      : ''
  )
  const [centreId, setCentreId] = useState(
    sessionStorage.getItem('centreId') ? sessionStorage.getItem('centreId') : ''
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
        setChurch({ church: member.stream.toLowerCase(), subChurch: 'centre' })
        break
      case 'Town':
        setChurch({ church: 'town', subChurch: 'centre' })
        sessionStorage.setItem(
          'church',
          JSON.stringify({
            church: 'town',
            subChurch: 'centre',
          })
        )

        if (member.bishop?.id) {
          setBishopId(member.bishop?.id)
          sessionStorage.setItem('bishopId', member.bishop?.id)
        }
        break
      case 'Campus':
        setChurch({ church: 'campus', subChurch: 'centre' })
        sessionStorage.setItem(
          'church',
          JSON.stringify({
            church: 'campus',
            subChurch: 'centre',
          })
        )

        if (member.bishop?.id) {
          setBishopId(member.bishop?.id)
          sessionStorage.setItem('bishopId', member.bishop?.id)
        }
        break
      case 'Centre':
        setChurch({
          church: member.campus ? 'campus' : 'town',
          subChurch: 'centre',
        })
        sessionStorage.setItem(
          'church',
          JSON.stringify({
            church: member.campus ? 'campus' : 'town',
            subChurch: 'centre',
          })
        )

        if (member.campus) {
          setBishopId(member?.campus.bishop.id)
          sessionStorage.setItem('bishopId', member?.campus.bishop.id)
        }
        if (member.town) {
          setBishopId(member?.town.bishop.id)
          sessionStorage.setItem('bishopId', member?.town.bishop.id)
        }
        break
      case 'Bacenta':
        setChurch({
          church: member.centre?.town ? 'town' : 'campus',
          subChurch: 'centre',
        })
        sessionStorage.setItem(
          'church',
          JSON.stringify({
            church: member.centre?.town ? 'town' : 'campus',
            subChurch: 'centre',
          })
        )

        if (member.centre?.town?.bishop.id) {
          setBishopId(member.centre?.town?.bishop.id)
          sessionStorage.setItem('bishopId', member.centre?.town?.bishop.id)

          if (member.centre?.campus?.bishop.id) {
            setBishopId(member.centre?.campus?.bishop.id)
            sessionStorage.setItem('bishopId', member.centre?.campus?.bishop.id)
          }
        }

        break
      default:
    }

    if (!member?.bacenta) {
      if (!member.isBishopForTown) {
        return
      }

      if (member.isBishopForTown[0]) {
        setChurch({ church: 'town', subChurch: 'centre' })
        sessionStorage.setItem(
          'church',
          JSON.stringify({
            church: 'town',
            subChurch: 'centre',
          })
        )
        setBishopId(member.id)
        sessionStorage.setItem('bishopId', member.id)
        return
      } else if (member.isBishopForCampus[0]) {
        setChurch({ church: 'campus', subChurch: 'centre' })
        sessionStorage.setItem(
          'church',
          JSON.stringify({
            church: 'campus',
            subChurch: 'centre',
          })
        )
        setBishopId(member.id)
        sessionStorage.setItem('bishopId', member.id)
        return
      } else {
        return
      }
    }
    if (member?.bacenta?.centre?.town) {
      setChurch({ church: 'town', subChurch: 'centre' })
      sessionStorage.setItem(
        'church',
        JSON.stringify({
          church: 'town',
          subChurch: 'centre',
        })
      )
      setBishopId(member.bacenta.centre.town.bishop.id)
      sessionStorage.setItem('bishopId', member.bacenta.centre.town.bishop.id)
      return
    } else if (member.leadsTown && member.leadsTown[0]) {
      setChurch({ church: 'town', subChurch: 'centre' })
      sessionStorage.setItem(
        'church',
        JSON.stringify({
          church: 'town',
          subChurch: 'centre',
        })
      )
      setBishopId(member.leadsTown[0].bishop?.id)
      sessionStorage.setItem('bishopId', member.leadsTown[0].bishop?.id)
      return
    } else if (member?.bacenta?.centre?.campus) {
      setChurch({ church: 'campus', subChurch: 'centre' })
      sessionStorage.setItem(
        'church',
        JSON.stringify({
          church: 'campus',
          subChurch: 'centre',
        })
      )
      setBishopId(member?.bacenta?.centre?.campus?.bishop?.id)
      sessionStorage.setItem(
        'bishopId',
        member?.bacenta?.centre?.campus?.bishop?.id
      )
      return
    } else if (member?.leadsCampus[0]) {
      setChurch({ church: 'campus', subChurch: 'centre' })
      sessionStorage.setItem(
        'church',
        JSON.stringify({
          church: 'campus',
          subChurch: 'centre',
        })
      )
      setBishopId(member.leadsCampus[0].bishop?.id)
      sessionStorage.setItem('bishopId', member.leadsCampus[0].bishop?.id)
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
      case 'Bacenta':
        setBacentaId(card.id)
        sessionStorage.setItem('bacentaId', card.id)
        break
      case 'Centre':
        setCentreId(card.id)
        sessionStorage.setItem('centreId', card.id)
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
      setBishopId(card.id)
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
          councilId,
          setCouncilId,
          bishopId,
          setBishopId,
          townId,
          setTownId,
          campusId,
          setCampusId,
          centreId,
          setCentreId,
          bacentaId,
          setBacentaId,
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
                    path="/services/bacenta"
                    component={Fellowship}
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
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    path="/services/town"
                    component={ConstituencyJoint}
                    placeholder
                    exact
                  />
                  <ProtectedReports path="/services/trends" placeholder exact />
                  <ProtectedRoute
                    path="/services/banking-slips"
                    component={BankingSlipView}
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    path="/banking-slip/submission"
                    component={BankingSlipSubmission}
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
                      'leaderBacenta',
                      'leaderCentre',
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
                      'leaderBacenta',
                      'leaderCentre',
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
                      'leaderBacenta',
                      'leaderCentre',
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
                      'leaderCentre',
                      'leaderCampus',
                      'leaderTown',
                    ]}
                    path="/centre/reports"
                    component={CentreReport}
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderCentre',
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
                      'leaderCentre',
                      'leaderBacenta',
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
                      'leaderCentre',
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
                    path="/centre/members"
                    component={CentreMembers}
                    exact
                  />
                  <ProtectedMembersRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderBacenta',
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
                    path="/bacenta/displaydetails"
                    component={DetailsBacenta}
                    placeholder
                    exact
                  />
                  <ProtectedRoute
                    roles={['all']}
                    path="/centre/displaydetails"
                    component={DisplayCentreDetails}
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
                    roles={['all']}
                    path="/sonta/displaydetails"
                    component={DisplaySontaDetails}
                    exact
                  />
                  {/* Pages to Display Lists in the Directory */}
                  <ProtectedRoute
                    roles={['all']}
                    path="/centre/displayall"
                    component={DisplayAllCentres}
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
                    path="/bacenta/displayall"
                    component={DisplayAllBacentas}
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
                    path="/centre/addcentre"
                    component={CreateCentre}
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
                      'leaderTown',
                    ]}
                    path="/centre/editcentre"
                    component={UpdateCentre}
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
                  {/* Bacenta Leader Routes */}
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                    ]}
                    path="/bacenta/service-details"
                    component={BacentaServiceDetails}
                    placeholder
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                    ]}
                    path="/services/bacenta/no-service"
                    component={BacentaServiceCancelled}
                    placeholder
                  />
                  <ProtectedRoute
                    roles={[
                      'adminFederal',
                      'adminCouncil',
                      'adminCampus',
                      'adminTown',
                      'leaderBacenta',
                    ]}
                    path="/services/bacenta/form"
                    component={BacentaService}
                  />{' '}
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
                      'leaderCentre',
                    ]}
                    path="/centre/record-service"
                    component={CentreService}
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
                      'leaderCentre',
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
                      'leaderCentre',
                    ]}
                    path="/centre/service-details"
                    component={CentreServiceDetails}
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
