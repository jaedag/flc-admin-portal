import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SearchBox from './SearchBox'
import UserProfile from './UserProfile'
import { ChurchContext } from '../contexts/ChurchContext'

export const NavBar = () => {
  const { church, capitalise, setFilters } = useContext(ChurchContext)
  const location = useLocation()

  return (
    <nav className="navbar navbar-dark navbar-expand fixed-top">
      <div className="navbar-nav">
        <Link
          className={`nav-item nav-link d-flex align-items-center flex-column ${
            location.pathname === '/' && 'active'
          }`}
          to="/"
        >
          <span className="fas fa-home fa-2x  px-1" />
          <span className="d-none d-md-inline">Home</span>
        </Link>
        {church.church && (
          <Link
            className={`nav-item nav-link d-flex align-items-center flex-column ${
              location.pathname.endsWith('dashboard') && 'active'
            }`}
            to="/dashboard"
          >
            <span className="fas fa-bold fa-2x px-1" />
            <span className="d-none d-md-inline">Bishop</span>
          </Link>
        )}
        {!(location.pathname === '/members') && church.church ? (
          <Link
            className="nav-item nav-link d-flex align-items-center flex-column"
            onClick={() => {
              setFilters({
                gender: '',
                maritalStatus: '',
                occupation: '',
                leaderRank: [],
                leaderTitle: [],
                ministry: '',
              })
            }}
            to="/members"
          >
            <span className="fas fa-users fa-2x px-1" />
            <span className="d-none d-md-inline">Members</span>
          </Link>
        ) : (
          <div className="d-none d-md-block">
            <Link
              className={`nav-item nav-link d-flex align-items-center flex-column ${
                location.pathname.endsWith('members') && 'active'
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
                location.pathname.endsWith('displayall') && 'active'
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
                location.pathname.endsWith('display-sontas') && 'active'
              }`}
              to={`/${church.church}/display-sontas`}
            >
              <span className="fas fa-church fa-2x px-1" />
              <span className="d-none d-md-inline">Ministries</span>
            </Link>
          </>
        )}
        {location.pathname === '/members' && (
          <Link
            className={`nav-item nav-link d-flex align-items-center flex-column d-md-none`}
            to="/filter-members"
          >
            <i className="fas fa-filter fa-2x  px-1" />
          </Link>
        )}
        <Link
          className={`nav-item nav-link d-flex align-items-center flex-column d-md-none ${
            location.pathname.endsWith('member-search') && 'active'
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
