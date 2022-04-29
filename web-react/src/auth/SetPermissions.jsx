import { useAuth0 } from '@auth0/auth0-react'
import { MemberContext } from 'contexts/MemberContext'
import useClickCard from 'hooks/useClickCard'
import { permitMe } from 'permission-utils'
import React, { useContext, useEffect } from 'react'
import useAuth from './useAuth'

const SetPermissions = ({ children }) => {
  const { currentUser } = useContext(MemberContext)
  const church = useClickCard()
  const { isAuthenticated } = useAuth0()
  const { isAuthorised } = useAuth()

  useEffect(() => {
    if (isAuthenticated && currentUser.roles.length) {
      church.setGatheringServiceId(currentUser.gatheringService)

      if (!isAuthorised(permitMe('GatheringService'))) {
        //if User is not a federal admin
        church.setChurch(currentUser.church)
        church.setStreamId(currentUser.stream)

        if (!isAuthorised(permitMe('Stream'))) {
          //User is not at the Stream Level
          church.setCouncilId(currentUser.council)
          if (!isAuthorised(permitMe('Council'))) {
            //User is not at the Council Level
            church.setConstituencyId(currentUser.constituency)

            if (!isAuthorised(permitMe('Constituency'))) {
              //User is not a Constituency Admin the he can only be looking at his bacenta membership
              // church.setBacentaId(currentUser.bacenta)
              // if (!isAuthorised( ['leaderBacenta'])) {
              //   //User is not a Bacenta Leader and he can only be looking at his fellowship membership
              //   setFellowshipId(currentUser.fellowship?.id)
              // }
            }
          }
        }
      }
    }
  }, [isAuthenticated, currentUser, isAuthorised, church])

  return <>{children}</>
}

export default SetPermissions
