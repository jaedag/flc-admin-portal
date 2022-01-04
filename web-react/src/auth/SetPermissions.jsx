import { useAuth0 } from '@auth0/auth0-react'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { isAuthorised } from 'global-utils'
import React, { useContext, useEffect } from 'react'

const SetPermissions = ({ children }) => {
  const { currentUser } = useContext(MemberContext)
  const church = useContext(ChurchContext)
  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    if (isAuthenticated && currentUser.roles[0]) {
      church.setGatheringServiceId(currentUser.gatheringService)

      if (
        !isAuthorised(
          ['adminGatheringService', 'leaderGatheringService'],
          currentUser.roles
        )
      ) {
        //if User is not a federal admin
        church.setChurch(currentUser.church)
        church.setStreamId(currentUser.stream)
        if (!isAuthorised(['adminStream', 'leaderStream'], currentUser.roles)) {
          //User is not at the Stream Level
          church.setCouncilId(currentUser.council)
          if (
            !isAuthorised(['adminCouncil', 'leaderCouncil'], currentUser.roles)
          ) {
            //User is not at the Council Level
            church.setConstituencyId(currentUser.constituency)

            if (
              !isAuthorised(
                ['adminConstituency', 'leaderConstituency'],
                currentUser.roles
              )
            ) {
              //User is not a Constituency Admin the he can only be looking at his bacenta membership
              church.setBacentaId(currentUser.fellowship?.bacenta?.id)

              // if (!isAuthorised( ['leaderBacenta'])) {
              //   //User is not a Bacenta Leader and he can only be looking at his fellowship membership
              //   setFellowshipId(currentUser.fellowship?.id)
              // }
            }
          }
        }
      }
    }
    // eslint-disable-next-line
  }, [isAuthenticated, currentUser])

  return <>{children}</>
}

export default SetPermissions
