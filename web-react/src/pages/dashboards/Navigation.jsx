import { useLazyQuery, useQuery } from '@apollo/client'
import RoleView from 'auth/RoleView'
import UserProfileIcon from 'components/UserProfileIcon/UserProfileIcon'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { authorisedLink, plural } from 'global-utils'
import { getServiceGraphData } from 'pages/reports/report-utils'
import React, { useContext, useEffect } from 'react'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { menuItems } from './dashboard-utils'
import {
  SERVANTS_ADMIN,
  SERVANTS_DASHBOARD,
  SERVANTS_LEADERSHIP,
} from './DashboardQueries'
import './Navigation.css'
import logo from 'assets/flc-logo-red.png'
import { useAuth0 } from '@auth0/auth0-react'
import { GET_LOGGED_IN_USER } from 'components/UserProfileIcon/UserQueries'
import SearchBox from 'components/SearchBox'

const Navigator = () => {
  const { currentUser, theme, setUserJobs, setCurrentUser } =
    useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const { user, isAuthenticated } = useAuth0()
  const { data, loading } = useQuery(SERVANTS_DASHBOARD, {
    variables: { id: currentUser.id },
  })
  const { data: adminData } = useQuery(SERVANTS_ADMIN, {
    variables: { id: currentUser.id },
  })
  const { data: leaderData } = useQuery(SERVANTS_LEADERSHIP, {
    variables: { id: currentUser.id },
  })

  const [memberByEmail] = useLazyQuery(GET_LOGGED_IN_USER, {
    onCompleted: (data) => {
      const church = data.memberByEmail.stream_name

      setCurrentUser({
        ...currentUser,
        id: data.memberByEmail.id,
        firstName: data.memberByEmail.firstName,
        lastName: data.memberByEmail.lastName,
        fullName:
          data.memberByEmail.firstName + ' ' + data.memberByEmail.lastName,
        picture: data.memberByEmail?.pictureUrl ?? null,
        fellowship: data.memberByEmail?.fellowship,
        council:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.id,
        constituency: data.memberByEmail?.fellowship?.bacenta.constituency?.id,
        church: { church: church, subChurch: 'bacenta' },
        stream:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .id,
        gatheringService:
          data.memberByEmail?.fellowship?.bacenta.constituency?.council.stream
            .gatheringService.id,
        email: user?.email,
        roles: user ? user[`https://flcadmin.netlify.app/roles`] : [],
      })
    },
  })

  useEffect(() => {
    if (!currentUser?.email?.length) {
      user && memberByEmail({ variables: { email: user.email } })
    }

    setUserJobs({
      jobs: roles,
      assessmentData: assessmentChurchData,
      assessmentChurch: assessmentChurch,
    })
    // eslint-disable-next-line
  }, [
    isAuthenticated,
    data,
    adminData,
    leaderData,
    loading,
    roles,
    setUserJobs,
  ])
  const servant = data?.members[0]
  const servantAdmin = adminData?.members[0]
  const servantLeader = leaderData?.members[0]

  // What leadership roles does this person play?
  let roles = []
  let assessmentChurchData, assessmentChurch

  const setServantRoles = (servant, servantType, churchType) => {
    let verb

    switch (servantType) {
      case 'Leader':
        verb = `leads${churchType}`
        break
      case 'Admin':
        verb = `isAdminFor${churchType}`
        break
      case 'Bishop':
        verb = `isBishopFor${churchType}`
        break
      default:
        break
    }

    if (servantType === 'Bishop') {
      roles.push({
        name: 'Bishop',
        church: servant[`${verb}`][0],
        number: `${churchType} Bishop`,
        clickCard: () => {
          clickCard(servant[`${verb}`][0])
        },
        link: authorisedLink(
          currentUser,
          ['adminFederal', 'adminCouncil', 'leaderBishop'],
          '/dashboard'
        ),
      })
      return
    }

    if (churchType === 'GatheringService' && servantType === 'Admin') {
      const adminsOneChurch = servant[`${verb}`].length === 1 ?? false

      roles.push({
        name: 'Admin',
        church: servant[`${verb}`][0],
        number: 'Federal Admin',
        clickCard: () => {
          clickCard(servant[`${verb}`][0])
        },
        link: authorisedLink(
          currentUser,
          ['adminFederal', 'adminCouncil'],
          adminsOneChurch
            ? `/${churchType.toLowerCase()}/displaydetails`
            : `/servants/church-list`
        ),
      })

      assessmentChurch = servant[`${verb}`][0]
      return
    }

    if (churchType === 'Council' && servantType === 'Admin') {
      const adminsOneChurch = servant[`${verb}`].length === 1 ?? false

      roles.push({
        name: 'Admin',
        church: servant[`${verb}`][0],
        number: 'Council Admin',
        clickCard: () => {
          clickCard(servant[`${verb}`][0])
        },
        link: authorisedLink(
          currentUser,
          ['adminFederal', 'adminCouncil'],
          adminsOneChurch
            ? `/${churchType.toLowerCase()}/displaydetails`
            : `/servants/church-list`
        ),
      })

      assessmentChurch = servant[`${verb}`][0]
      return
    }

    if (servantType === 'Admin') {
      const adminsOneChurch = servant[`${verb}`].length === 1 ?? false
      roles.push({
        name: adminsOneChurch
          ? churchType + ' Admin'
          : plural(churchType) + 'Admin',
        church: servant[`${verb}`][0],
        number: servant[`${verb}`].length,
        clickCard: () => {
          clickCard(servant[`${verb}`][0])
        },
        link: authorisedLink(
          currentUser,
          ['adminFederal', 'adminCouncil', 'adminConstituency'],
          adminsOneChurch
            ? `/${churchType.toLowerCase()}/displaydetails`
            : `/servants/church-list`
        ),
      })

      assessmentChurch = servant[`${verb}`][0]
      return
    }

    const leadsOneChurch = servant[`${verb}`].length === 1 ?? false

    roles.push({
      name: leadsOneChurch ? churchType : plural(churchType),
      church: servant[`${verb}`][0],
      number: servant[`${verb}`]?.length,
      clickCard: () => {
        clickCard(servant[`${verb}`][0])
      },
      link: leadsOneChurch
        ? `/${churchType.toLowerCase()}/displaydetails`
        : `/servants/church-list`,
    })

    assessmentChurch = servant[`${verb}`][0]
  }

  const getServantRoles = (servant) => {
    if (servant?.leadsFellowship?.length) {
      setServantRoles(servant, 'Leader', 'Fellowship')
    }
    if (servant?.leadsBacenta?.length) {
      setServantRoles(servant, 'Leader', 'Bacenta')
    }
    if (servantLeader?.leadsConstituency?.length) {
      setServantRoles(servantLeader, 'Leader', 'Constituency')
    }

    if (servantLeader?.leadsSonta?.length) {
      setServantRoles(servantLeader, 'Leader', 'Sonta')
    }
    if (servantLeader?.leadsBasonta?.length) {
      setServantRoles(servantLeader, 'Leader', 'Basonta')
    }
    if (servantLeader?.leadsMinistry?.length) {
      setServantRoles(servantLeader, 'Leader', 'Ministry')
    }
    if (servantLeader?.leadsCouncil?.length) {
      setServantRoles(servantLeader, 'Bishop', 'Council')
    }
    if (servantAdmin?.isAdminForGatheringService?.length) {
      setServantRoles(servantAdmin, 'Admin', 'GatheringService')
    }
    if (servantAdmin?.isAdminForCouncil?.length) {
      setServantRoles(servantAdmin, 'Admin', 'Council')
    }
    if (servantAdmin?.isAdminForConstituency?.length) {
      setServantRoles(servantAdmin, 'Admin', 'Constituency')
    }

    //run the get graph function after all checking is done to avoid multiple unnecessary runs
    if (assessmentChurch) {
      return getServiceGraphData(assessmentChurch)
    }

    return
  }

  assessmentChurchData = servant && getServantRoles(servant)

  return (
    <Navbar
      collapseOnSelect
      bg={theme}
      variant={theme}
      expand={false}
      sticky="top"
      defaultActiveKey="0"
    >
      <Container fluid>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          className="nav-toggler"
        />

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          className={`bg-nav ${theme}`}
        >
          <Offcanvas.Header className={`${theme}`} closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <img
                src={logo}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="FLC Admin Logo"
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-start flex-grow-1">
              {menuItems.map((menuItem, index) => (
                <RoleView key={index} roles={menuItem.roles}>
                  <Nav.Link
                    as={Link}
                    eventKey={index}
                    Icon={menuItem.Icon}
                    exact={menuItem.exact}
                    to={menuItem.to}
                    className="font-primary nav-btn"
                  >
                    {menuItem.name}
                  </Nav.Link>
                </RoleView>
              ))}
            </Nav>

            <SearchBox />
          </Offcanvas.Body>
          <Container className="footer">
            <Nav.Link
              as={Link}
              eventKey={menuItems.length}
              exact
              to="/user-profile"
            >
              <UserProfileIcon />
            </Nav.Link>
          </Container>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default Navigator
