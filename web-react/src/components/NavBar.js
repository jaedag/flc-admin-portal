import React, { useContext } from 'react'
// import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'
import { ChurchContext } from '../context/ChurchContext'

export const NavBar = () => {
  const { church, capitalise } = useContext(ChurchContext)

  return (
    <nav className="navbar navbar-dark navbar-expand fixed-top">
      <Link className="btn nav-button btn-outline-light p-0" to="/">
        <i className="fas fa-bars fa-2x icon-color" />
      </Link>

      <div className="navbar-nav">
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column"
          to="/"
        >
          <span className="fas fa-home fa-2x  px-1" />
          <span className="d-none d-md-inline">Dashboard</span>
        </Link>
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column"
          to="/members"
        >
          <span className="fas fa-users fa-2x px-1" />
          <span className="d-none d-md-inline">Members</span>
        </Link>
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column"
          to={`/${church.church}/displayall`}
        >
          <span className="fas fa-landmark fa-2x px-1" />
          <span className="d-none d-md-inline">{`${capitalise(
            church.church
          )}`}</span>
        </Link>
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column"
          to="/sonta/displayall"
        >
          <span className="fas fa-church fa-2x px-1" />
          <span className="d-none d-md-inline">Ministries</span>
        </Link>
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column"
          to="/membersearch"
        >
          <i className="fas fa-search fa-2x d-md-none icon-color px-1" />
        </Link>
      </div>
      <div className="container justify-content-end mt-2">
        <SearchBox />
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column p-0 pb-2"
          to="#"
        >
          <span className="fas fa-user-circle fa-3x" />
          <span className="d-none d-sm-inline">Admin</span>
        </Link>
      </div>
    </nav>
  )
}
