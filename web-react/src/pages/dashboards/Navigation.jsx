import { useQuery } from '@apollo/client'
import RoleView from 'auth/RoleView'
import UserProfileIcon from 'components/UserProfileIcon/UserProfileIcon'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { authorisedLink, plural } from 'global-utils'
import { getServiceGraphData } from 'pages/reports/report-utils'
import React, { useContext, useEffect } from 'react'
import {
  Container,
  Nav,
  Navbar,
  Offcanvas,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { menuItems } from './dashboard-utils'
import { SERVANTS_DASHBOARD } from './DashboardQueries'
import './Navigation.css'
import logo from 'assets/flc-logo-red.png'

const Navigator = () => {
  const { currentUser, theme, setUserJobs } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)

  const { data } = useQuery(SERVANTS_DASHBOARD, {
    variables: { id: currentUser.id },
  })
  const servant = data?.members[0]

  useEffect(() => {
    setUserJobs({
      jobs: roles,
      assessmentData: assessmentChurchData,
      assessmentChurch: assessmentChurch,
    })
  }, [data, setUserJobs])

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
          ['adminFederal', 'adminBishop', 'leaderBishop'],
          '/dashboard'
        ),
      })
      return
    }

    if (churchType === 'Bishop' && servantType === 'Admin') {
      roles.push({
        name: 'Admin',
        church: servant[`${verb}`][0],
        number: 'Bishop Admin',
        clickCard: () => {
          clickCard(servant[`${verb}`][0])
        },
        link: authorisedLink(
          currentUser,
          ['adminFederal', 'adminBishop'],
          '/dashboard'
        ),
      })
      return
    }

    if (servantType === 'Admin') {
      const adminsOneChurch = servant[`${verb}`].length === 1 ?? false
      roles.push({
        name: 'Admin',
        church: servant[`${verb}`][0],
        number: `${churchType} Admin`,
        clickCard: () => {
          clickCard(servant[`${verb}`][0])
        },
        link: authorisedLink(
          currentUser,
          ['adminFederal', 'adminBishop', 'adminCampus', 'adminTown'],
          adminsOneChurch
            ? `/${churchType.toLowerCase()}/displaydetails`
            : `/servants/${churchType.toLowerCase()}-list`
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
        : `/servants/${churchType.toLowerCase()}-list`,
    })

    assessmentChurch = servant[`${verb}`][0]
  }

  const getServantRoles = (servant) => {
    if (servant?.leadsBacenta?.length) {
      setServantRoles(servant, 'Leader', 'Bacenta')
    }
    if (servant?.leadsCentre?.length) {
      setServantRoles(servant, 'Leader', 'Centre')
    }
    if (servant?.leadsTown?.length) {
      setServantRoles(servant, 'Leader', 'Town')
    }
    if (servant?.leadsCampus?.length) {
      setServantRoles(servant, 'Leader', 'Campus')
    }
    if (servant?.leadsSonta?.length) {
      setServantRoles(servant, 'Leader', 'Sonta')
    }
    if (servant?.leadsBasonta?.length) {
      setServantRoles(servant, 'Leader', 'Basonta')
    }
    if (servant?.leadsMinistry?.length) {
      setServantRoles(servant, 'Leader', 'Ministry')
    }
    if (servant?.isBishopForTown?.length) {
      setServantRoles(servant, 'Bishop', 'Town')
    }
    if (servant?.isBishopForCampus?.length) {
      setServantRoles(servant, 'Bishop', 'Campus')
    }
    if (servant?.isAdminForBishop?.length) {
      setServantRoles(servant, 'Admin', 'Bishop')
    }
    if (servant?.isAdminForCampus?.length) {
      setServantRoles(servant, 'Admin', 'Campus')
    }
    if (servant?.isAdminForTown?.length) {
      setServantRoles(servant, 'Admin', 'Town')
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
      expand="md"
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
          <Offcanvas.Header closeButton>
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
            <Nav className="justify-content-start flex-grow-1 pe-3">
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
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
          <Container className="footer">
            <UserProfileIcon />
          </Container>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default Navigator
