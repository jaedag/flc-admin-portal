import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import SearchBox from './SearchBox'
import UserProfile from './UserProfile'
import { ChurchContext } from '../contexts/ChurchContext'
import NavLink from './NavLink'

export const NavBar = () => {
  const { church, capitalise, setFilters } = useContext(ChurchContext)
  const location = useLocation()

  return (
    <nav className="navbar navbar-dark navbar-expand fixed-top">
      <div className="navbar-nav">
        <NavLink label="Home" linkTo="/" icon="home" />
        {church.church && (
          <NavLink label="Bishop" linkTo="/dashboard" icon="bold" />
        )}
        {!(location.pathname === '/members') && church.church ? (
          <NavLink
            linkTo="/members"
            label="Members"
            icon="users"
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
          />
        ) : (
          <div className="d-none d-md-block">
            <NavLink linkTo="/members" label="Members" icon="users" />
          </div>
        )}

        {church.church && (
          <>
            <NavLink
              linkTo={`/${church.church}/displayall`}
              label={`${capitalise(church.church)}`}
              icon="landmark"
            />
            <NavLink
              linkTo={`/${church.church}/display-sontas`}
              label="Ministries"
              icon="church"
            />
          </>
        )}
        {location.pathname === '/members' && (
          <NavLink linkTo="/filter-members" icon="filter" />
        )}
        <div className="d-md-none">
          {' '}
          <NavLink linkTo="/member-search" icon="search" />
        </div>
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
