import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'
import UserProfile from './UserProfile'
import { ChurchContext } from '../contexts/ChurchContext'

export const NavBar = () => {
  const { church, capitalise } = useContext(ChurchContext)

  return (
    <nav className="navbar navbar-dark navbar-expand fixed-top">
      <div className="navbar-nav">
        {window.location.href.match(/members$/) && (
          <Link
            className="nav-item nav-link d-flex align-items-center flex-column d-md-none"
            to="#"
          >
            <i className="fas fa-bars fa-2x  px-1" />
          </Link>
        )}
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column"
          to="/"
        >
          <span className="fas fa-home fa-2x  px-1" />
          <span className="d-none d-md-inline">Home</span>
        </Link>
        {church.church && (
          <Link
            className={`nav-item nav-link d-flex align-items-center flex-column ${
              window.location.href.endsWith('dashboard') && 'active'
            }`}
            to="/dashboard"
          >
            <span className="fas fa-bold fa-2x px-1" />
            <span className="d-none d-md-inline">Bishop</span>
          </Link>
        )}
        {!window.location.href.endsWith('members') && church.church ? (
          <Link
            className="nav-item nav-link d-flex align-items-center flex-column"
            to="/members"
          >
            <span className="fas fa-users fa-2x px-1" />
            <span className="d-none d-md-inline">Members</span>
          </Link>
        ) : (
          <div className="d-none d-md-block">
            <Link
              className={`nav-item nav-link d-flex align-items-center flex-column ${
                window.location.href.endsWith('members') && 'active'
              }`}
              to="/members"
            >
              <span className="fas fa-users fa-2x px-1" />
              <span className="d-none d-md-inline">Members</span>
            </Link>
          </div>
        )}

        {church.church && (
          <>
            <Link
              className={`nav-item nav-link d-flex align-items-center flex-column ${
                window.location.href.endsWith('displayall') && 'active'
              }`}
              to={`/${church.church}/displayall`}
            >
              <span className="fas fa-landmark fa-2x px-1" />
              <span className="d-none d-md-inline">{`${capitalise(
                church.church
              )}`}</span>
            </Link>

            <Link
              className={`nav-item nav-link d-flex align-items-center flex-column ${
                window.location.href.endsWith('display-sontas') && 'active'
              }`}
              to={`/${church.church}/display-sontas`}
            >
              <span className="fas fa-church fa-2x px-1" />
              <span className="d-none d-md-inline">Ministries</span>
            </Link>
          </>
        )}
        <Link
          className={`nav-item nav-link d-flex align-items-center flex-column d-md-none ${
            window.location.href.endsWith('member-search') && 'active'
          }`}
          to="/member-search"
        >
          <i className="fas fa-search fa-2x icon-color px-1" />
        </Link>
      </div>
      <div className="container justify-content-end mt-2 mr-2">
        <div className="row">
          <div className="col">
            <SearchBox />
          </div>

          <div className="col">
            <UserProfile />
          </div>
        </div>
      </div>
    </nav>
  )
}
