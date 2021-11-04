import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './MenuItem.css'

const MenuItem = (props) => {
  const { Icon, name, subMenus, onClick, inactive, to } = props
  const [expand, setExpand] = useState(false)

  useEffect(() => {
    if (inactive) {
      setExpand(false)
    }
  }, [inactive])

  return (
    <li onClick={onClick}>
      <NavLink
        exact
        className="menu-item"
        to={to}
        onClick={() => {
          setExpand(!expand)
        }}
      >
        <Icon className="menu-icon" /> <span>{name}</span>
      </NavLink>
      {subMenus && subMenus.length > 0 ? (
        <ul className={`sub-menu ${expand ? 'active' : ''}`}>
          {subMenus.map((menu, index) => (
            <li key={index}>
              <NavLink to={menu.to} exact>
                {menu.name}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export default MenuItem
