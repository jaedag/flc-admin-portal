import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { isAuthorised } from 'global-utils'
import React, { useContext, useEffect } from 'react'

const SetPermissions = ({ children }) => {
  const { currentUser } = useContext(MemberContext)
  const church = useContext(ChurchContext)

  useEffect(() => {
    church.setGatheringServiceId(currentUser.gatheringService)

    if (!isAuthorised(currentUser.roles, ['adminFederal'])) {
      //if User is not a federal admin
      church.setChurch(currentUser.church)
      church.setStreamId(currentUser.stream)
      if (!isAuthorised(currentUser.roles, ['adminStream', 'leaderStream'])) {
        //User is not at the Stream Level
        church.setCouncilId(currentUser.council)
        if (
          !isAuthorised(currentUser.roles, ['adminCouncil', 'leaderCouncil'])
        ) {
          //User is not at the Council Level
          church.setConstituencyId(currentUser.constituency)

          if (
            !isAuthorised(currentUser.roles, [
              'adminConstituency',
              'leaderConstituency',
            ])
          ) {
            //User is not a Constituency Admin the he can only be looking at his bacenta membership
            church.setBacentaId(currentUser.fellowship?.bacenta?.id)

            // if (!isAuthorised(currentUser.roles, ['leaderBacenta'])) {
            //   //User is not a Bacenta Leader and he can only be looking at his fellowship membership
            //   setFellowshipId(currentUser.fellowship?.id)
            // }
          }
        }
      }
    }

    // eslint-disable-next-line
  }, [currentUser])

  return <>{children}</>
}

export default SetPermissions
