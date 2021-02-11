import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import SearchBox from './SearchBox'
import { ChurchContext } from '../contexts/ChurchContext'

export const NavBar = () => {
  const { church, capitalise } = useContext(ChurchContext)
  const { user } = useAuth0()

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
      <div className="container justify-content-end mt-2 mr-2">
        <div className="row">
          <div className="col">
            <SearchBox />
          </div>

          <div className="col">
            <Link
              className="nav-item nav-link d-flex align-items-center flex-column p-0 pb-2"
              to="#"
            >
              <span>
                <img
                  className="user-navbar-img "
                  src={user.picture}
                  alt={user.name}
                />
              </span>
              <span className="d-none d-md-inline">{user.given_name}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
