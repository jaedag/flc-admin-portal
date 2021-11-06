import React, { useContext, useEffect, useState } from 'react'
import './SideNav.css'
import logo from '../../img/flc-logo-red.png'
import {
  ArrowLeftSquareFill,
  ArrowRightSquareFill,
  Search,
} from 'react-bootstrap-icons'
import UserProfileIcon from 'components/UserProfileIcon/UserProfileIcon'
import MenuItem from './MenuItem'
import { MemberContext } from 'contexts/MemberContext'
import { menuItems } from './dashboard-utils'
import { ChurchContext } from 'contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { SERVANTS_DASHBOARD } from './DashboardQueries'
import { authorisedLink, plural } from 'global-utils'
import { getServiceGraphData } from 'pages/reports/report-utils'

const SideNav = (props) => {
  const { currentUser, theme, setUserJobs } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const [inactive, setInactive] = useState(true)

  const { data } = useQuery(SERVANTS_DASHBOARD, {
    variables: { id: currentUser.id },
  })
  const servant = data?.members[0]

  useEffect(() => {
    props.onCollapse(inactive)

    setUserJobs({
      jobs: roles,
      assessmentData: assessmentChurchData,
      assessmentChurch: assessmentChurch,
    })
  }, [data, inactive, setUserJobs])

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
    <div className={`side-menu ${theme} ${inactive ? 'inactive' : ''}`}>
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="flc logo" />
        </div>
        {inactive ? (
          <div
            className={`toggle-menu-btn ${theme}`}
            onClick={() => setInactive(!inactive)}
          >
            <ArrowRightSquareFill />
          </div>
        ) : (
          <div
            className={`toggle-menu-btn ${theme}`}
            onClick={() => setInactive(!inactive)}
          >
            <ArrowLeftSquareFill />
          </div>
        )}
      </div>

      <div className={`search-controller ${theme}`} search>
        <button className={`search-btn ${theme}`}>
          <Search />
        </button>
        <input type="text" placeholder="search" />
      </div>

      <div className="divider"></div>

      <div className="main-menu">
        {menuItems.map((menuItem, index) => (
          <MenuItem
            key={index}
            Icon={menuItem.Icon}
            name={menuItem.name}
            exact={menuItem.exact}
            to={menuItem.to}
            subMenus={menuItem.subMenus || []}
            onClick={() => {
              if (!inactive) setInactive(true)
            }}
            inactive={inactive}
          />
        ))}

        <div className={`side-menu-footer ${theme}`}>
          <UserProfileIcon />
        </div>
      </div>
    </div>
  )
}

export default SideNav
