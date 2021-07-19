import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useLazyQuery } from '@apollo/client'
import AuthButton from '../buttons/AuthButton'
import './UserProfileIcon.css'
import { GET_LOGGED_IN_USER } from './UserQueries'
import { MemberContext } from '../../contexts/MemberContext.js'
import userIcon from '../../img/user.png'
import Spinner from '../Spinner'
import { ChurchContext } from '../../contexts/ChurchContext'

function UserProfileIcon() {
  const { user, isAuthenticated } = useAuth0()
  const { setChurch } = useContext(ChurchContext)
  const { currentUser, setCurrentUser } = useContext(MemberContext)
  const [memberByEmail] = useLazyQuery(GET_LOGGED_IN_USER, {
    onCompleted: (data) => {
      let church
      if (data.members[0].bacenta.centre?.town) {
        church = 'town'
      }
      if (data.members[0].bacenta.centre?.campus) {
        church = 'campus'
      }

      setCurrentUser({
        ...currentUser,
        id: data.members[0].id,
        firstName: data.members[0].firstName,
        lastName: data.members[0].lastName,
        picture: data.members[0]?.pictureUrl ?? null,
        bishop: data.members[0]?.bacenta?.centre[`${church}`]?.bishop.id,
        constituency: data.members[0]?.bacenta?.centre[`${church}`]?.id,
        church: { church: church, subChurch: 'centre' },
        email: user?.email,
        roles: user ? user[`https://flcadmin.netlify.app/roles`] : [],
      })
    },
  })

  useEffect(() => {
    if (!currentUser?.email?.length) {
      user && memberByEmail({ variables: { email: user.email } })
    }

    // eslint-disable-next-line
  }, [isAuthenticated])

  return (
    <>
      {isAuthenticated && currentUser.email && (
        <Link
          className="nav-item nav-link d-flex align-items-center flex-column p-0 pb-2"
          to="/user-profile"
          onClick={() => setChurch(currentUser.church)}
        >
          <span>
            <img
              className="user-navbar-img "
              src={currentUser?.picture ? currentUser.picture : userIcon}
              alt={currentUser ? currentUser.firstName : null}
            />
          </span>
          <span className="d-none d-md-inline">
            {currentUser ? currentUser.firstName : `Admin`}
          </span>
        </Link>
      )}
      {isAuthenticated && !currentUser.email && (
        <div className="text-secondary text-center">
          <Spinner />
        </div>
      )}
      {!isAuthenticated && (
        <div className="nav-item nav-link d-flex align-items-center flex-column">
          <AuthButton />
        </div>
      )}
    </>
  )
}

export default UserProfileIcon