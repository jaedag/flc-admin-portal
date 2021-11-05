import React, { useContext, useEffect, useState } from 'react'
import './SideNav.css'
import logo from '../../img/flc-logo-red.png'
import {
  ArrowLeftSquareFill,
  ArrowRightSquareFill,
  BookFill,
  FlagFill,
  JournalCheck,
  PencilSquare,
  Search,
  Speedometer2,
  Truck,
} from 'react-bootstrap-icons'
import UserProfileIcon from 'components/UserProfileIcon/UserProfileIcon'
import MenuItem from './MenuItem'
import { MemberContext } from 'contexts/MemberContext'

const SideNav = (props) => {
  const { currentUser } = useContext(MemberContext)
  const [inactive, setInactive] = useState(true)

  const menuItems = [
    { name: 'Home', to: '/', Icon: Speedometer2, exact: true },
    {
      name: 'Directory',
      exact: true,
      to: '/directory',
      subMenus: [
        { name: 'Members', to: '/directory/members' },
        { name: 'Churches', to: '/directory/churches' },
      ],
      Icon: BookFill,
    },
    { name: 'Services', to: '/services', Icon: PencilSquare },
    { name: 'Arrivals', to: '/arrivals', Icon: Truck },
    { name: 'Campaigns', to: '/campaigns', Icon: FlagFill },
    { name: 'Reconciliation', to: '/recon', Icon: JournalCheck },
  ]

  useEffect(() => {
    props.onCollapse(inactive)
  })

  return (
    <div className={`side-menu ${inactive ? 'inactive' : ''}`}>
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="flc logo" />
        </div>
        {inactive ? (
          <div
            className="toggle-menu-btn"
            onClick={() => setInactive(!inactive)}
          >
            <ArrowRightSquareFill />
          </div>
        ) : (
          <div
            className="toggle-menu-btn"
            onClick={() => setInactive(!inactive)}
          >
            <ArrowLeftSquareFill />
          </div>
        )}
      </div>

      <div className="search-controller">
        <button className="search-btn">
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

        <div className="side-menu-footer">
          <div className="avatar">
            <UserProfileIcon />
          </div>
          <div className="user-info">
            <h5>{currentUser.fullName}</h5>
            <p>{currentUser.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideNav
