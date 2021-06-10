import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavLink = (props) => {
  const { linkTo, label, icon, ...rest } = props
  const location = useLocation()

  return (
    <Link
      className={`nav-item nav-link d-flex align-items-center flex-column ${
        location.pathname === linkTo && 'active'
      }`}
      to={linkTo}
      {...rest}
    >
      <span className={`fas fa-${icon} fa-2x  px-1`} />
      {label && <span className="d-none d-md-inline">{label}</span>}
    </Link>
  )
}

export default NavLink
