import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import SearchBox from '../SearchBox'
import UserProfile from '../UserProfile'
import { ChurchContext } from '../../contexts/ChurchContext'
import NavLink from './NavLink.jsx'
import './NavBar.css'
import { capitalise } from '../../global-utils'

export const NavBar = () => {
  const { church, setFilters } = useContext(ChurchContext)
  const location = useLocation()

  const atHome = church.church && location.pathname !== '/'
  const showingMembers = location.pathname.endsWith('/members')

  return (
    <nav className="navbar navbar-dark navbar-expand fixed-top">
      <div className="navbar-nav">
        <NavLink label="Home" linkTo="/" icon="home" />

        {atHome && <NavLink label="Bishop" linkTo="/dashboard" icon="bold" />}
        {!showingMembers && atHome ? (
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

        {atHome && (
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

        {showingMembers && (
          <div className="d-md-none">
            <NavLink linkTo="/filter-members" icon="filter" />
          </div>
        )}
        <div className="d-md-none">
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
