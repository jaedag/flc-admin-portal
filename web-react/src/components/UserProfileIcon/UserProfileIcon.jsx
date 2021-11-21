import React, { useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import AuthButton from '../buttons/AuthButton'
import './UserProfileIcon.css'
import { MemberContext } from '../../contexts/MemberContext.js'
import userIcon from '../../assets/user.png'
import { ChurchContext } from '../../contexts/ChurchContext'
import { transformCloudinaryImg } from 'global-utils'
import { Spinner } from 'react-bootstrap'

function UserProfileIcon() {
  const { setChurch } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)
  const { isAuthenticated } = useAuth0()

  return (
    <>
      {isAuthenticated && currentUser.email && (
        <div onClick={() => setChurch(currentUser.church)}>
          <div className="d-flex">
            <div className="flex-shrink-0">
              <img
                className="user-navbar-img "
                src={transformCloudinaryImg(currentUser?.picture) || userIcon}
                alt={currentUser?.firstName || null}
              />
            </div>
            <div className="flex-grow-1 ms-3">
              <div className="text-secondary small">{currentUser.fullName}</div>
              <div className="text-secondary small">{currentUser.email}</div>
            </div>
          </div>
        </div>
      )}
      {isAuthenticated && !currentUser.email && (
        <div className="text-secondary text-center">
          <Spinner animation="grow" />
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
