import { useLazyQuery, useQuery } from '@apollo/client'
import RoleView from 'auth/RoleView'
import UserProfileIcon from 'components/UserProfileIcon/UserProfileIcon'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { authorisedLink, plural } from 'global-utils'
import { getServiceGraphData } from 'pages/services/reports/report-utils'
import React, { useContext, useEffect } from 'react'
import { Container, Nav, Navbar, Offcanvas, Row, Col } from 'react-bootstrap'
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
import { Moon, Sun } from 'react-bootstrap-icons'
import { permitMe } from 'permission-utils'

const Navigator = () => {
  const { currentUser, theme, setTheme, setUserJobs, setCurrentUser } =
    useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const { user } = useAuth0()
  const { data } = useQuery(SERVANTS_DASHBOARD, {
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
        fellowship: data.memberByEmail?.fellowship.id,
        bacenta: data.memberByEmail?.fellowship?.bacenta?.id,
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

  // What leadership roles does this person play?
  let roles = []
  let assessmentChurchData, assessmentChurch

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
  }, [data, adminData, leaderData])

  const servant = data?.members[0]
  const servantAdmin = adminData?.members[0]
  const servantLeader = leaderData?.members[0]

  const setServantRoles = (servant, servantType, churchType) => {
    let verb

    switch (servantType) {
      case 'Leader':
        verb = `leads${churchType}`
        break
      case 'Admin':
        verb = `isAdminFor${churchType}`
        break
      default:
        break
    }

    const permittedForLink = permitMe(churchType)

    if (servantType === 'Admin') {
      const adminsOneChurch = servant[`${verb}`].length === 1 ?? false
      roles.push({
        name: adminsOneChurch
          ? churchType + ' Admin'
          : plural(churchType) + ' Admin',
        church: servant[`${verb}`],
        number: servant[`${verb}`].length,
        clickCard: () => {
          clickCard(servant[`${verb}`][0])
        },
        link: authorisedLink(
          currentUser,
          permittedForLink,
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
      church: servant[`${verb}`],
      number: servant[`${verb}`]?.length,
      clickCard: () => {
        clickCard(servant[`${verb}`][0])
      },
      link: authorisedLink(
        currentUser,
        permittedForLink,
        leadsOneChurch
          ? `/${churchType.toLowerCase()}/displaydetails`
          : `/servants/church-list`
      ),
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
    if (servantLeader?.leadsSonta?.length) {
      setServantRoles(servantLeader, 'Leader', 'Sonta')
    }
    if (servantLeader?.leadsConstituency?.length) {
      setServantRoles(servantLeader, 'Leader', 'Constituency')
    }
    if (servantAdmin?.isAdminForConstituency?.length) {
      setServantRoles(servantAdmin, 'Admin', 'Constituency')
    }
    if (servantLeader?.leadsCouncil?.length) {
      setServantRoles(servantLeader, 'Leader', 'Council')
    }
    if (servantAdmin?.isAdminForCouncil?.length) {
      setServantRoles(servantAdmin, 'Admin', 'Council')
    }
    if (servantLeader?.leadsMinistry?.length) {
      setServantRoles(servantLeader, 'Leader', 'Ministry')
    }
    if (servantLeader?.leadsStream?.length) {
      setServantRoles(servantLeader, 'Leader', 'Stream')
    }
    if (servantAdmin?.isAdminForStream?.length) {
      setServantRoles(servantAdmin, 'Admin', 'Stream')
    }
    if (servantLeader?.leadsGatheringService?.length) {
      setServantRoles(servantLeader, 'Leader', 'GatheringService')
    }
    if (servantAdmin?.isAdminForGatheringService?.length) {
      setServantRoles(servantAdmin, 'Admin', 'GatheringService')
    }
    if (servantLeader?.leadsBasonta?.length) {
      setServantRoles(servantLeader, 'Leader', 'Basonta')
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
            <Row>
              <Col>
                <Nav.Link
                  as={Link}
                  eventKey={menuItems.length}
                  exact
                  to="/user-profile"
                >
                  <UserProfileIcon />
                </Nav.Link>
              </Col>
              <Col>
                <div className="d-flex justify-content-center align-items-center h-100">
                  {theme === 'light' ? (
                    <Moon
                      size={22}
                      onClick={() => {
                        theme === 'light' ? setTheme('dark') : setTheme('light')
                      }}
                    />
                  ) : (
                    <Sun
                      size={22}
                      onClick={() => {
                        theme === 'dark' ? setTheme('light') : setTheme('dark')
                      }}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default Navigator
