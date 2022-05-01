import { MemberContext } from 'contexts/MemberContext'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './MenuItem.css'

const MenuItem = (props) => {
  const { name, subMenus, onClick, inactive, to } = props
  const [expand, setExpand] = useState(false)
  const { theme } = useContext(MemberContext)

  useEffect(() => {
    if (inactive) {
      setExpand(false)
    }
  }, [inactive])

  return (
    <li onClick={onClick}>
      <NavLink
        className={`menu-item ${theme}`}
        to={to}
        onClick={() => {
          setExpand(!expand)
        }}
      >
        <span>{name}</span>
      </NavLink>
      {subMenus && subMenus.length > 0 ? (
        <ul className={`sub-menu ${theme} ${expand ? 'active' : ''}`}>
          {subMenus.map((menu, index) => (
            <li key={index}>
              <NavLink to={menu.to} exact={`${true}`}>
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
