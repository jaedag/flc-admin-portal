import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import {
  SERVANTS_ADMIN,
  SERVANTS_DASHBOARD,
  SERVANTS_LEADERSHIP,
} from './DashboardQueries'
import {
  getMonthlyStatAverage,
  getServiceGraphData,
} from 'pages/services/reports/report-utils'
import MenuButton from 'components/buttons/MenuButton'
import { Container } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import BaseComponent from 'components/base-component/BaseComponent'

const ServantsChurchList = () => {
  const { memberId } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { data, loading, error } = useQuery(SERVANTS_DASHBOARD, {
    variables: { id: memberId },
  })
  const { data: adminData } = useQuery(SERVANTS_ADMIN, {
    variables: { id: memberId },
  })
  const { data: leaderData } = useQuery(SERVANTS_LEADERSHIP, {
    variables: { id: memberId },
  })

  const servant = data?.members[0]
  const servantAdmin = adminData?.members[0]
  const servantLeader = leaderData?.members[0]
  let churches = []

  const pushIntoChurch = (servantChurches) => {
    servantChurches.map((church) => {
      const serviceData = getServiceGraphData(church)

      churches.push({
        __typename: church.__typename,
        name: church.name,
        leader: servant?.fullName,
        leaderPic: servant?.pictureUrl,
        attendance: getMonthlyStatAverage(serviceData, 'attendance'),
        income: getMonthlyStatAverage(serviceData, 'income'),
        link: `/${church.__typename.toLowerCase()}/displaydetails`,
      })
    })
  }
  const getServantChurches = (servant) => {
    if (servant?.leadsFellowship?.length) {
      pushIntoChurch(servant?.leadsFellowship)
    }
    if (servant?.leadsBacenta?.length) {
      pushIntoChurch(servant?.leadsBacenta)
    }
    if (servantLeader?.leadsConstituency?.length) {
      pushIntoChurch(servantLeader?.leadsConstituency)
    }
    if (servantLeader?.leadsSonta?.length) {
      pushIntoChurch(servantLeader?.leadsSonta)
    }
    if (servantLeader?.leadsBasonta?.length) {
      pushIntoChurch(servantLeader?.leadsBasonta)
    }
    if (servantLeader?.leadsMinistry?.length) {
      pushIntoChurch(servantLeader?.leadsMinistry)
    }

    if (servantLeader?.leadsCouncil?.length) {
      pushIntoChurch(servantLeader?.leadsCouncil)
    }
    if (servantLeader?.leadsStream?.length) {
      pushIntoChurch(servantLeader?.leadsStream)
    }
    if (servantLeader?.leadsGatheringService?.length) {
      pushIntoChurch(servantLeader?.leadsGatheringService)
    }
    //Administrative
    if (servantAdmin?.isAdminForCouncil?.length) {
      pushIntoChurch(servantAdmin?.isAdminForCouncil)
    }
    if (servantAdmin?.isAdminForConstituency?.length) {
      pushIntoChurch(servantAdmin?.isAdminForConstituency)
    }
    if (servantAdmin?.isAdminForGatheringService?.length) {
      pushIntoChurch(servantAdmin?.isAdminForGatheringService)
    }
    //run the get graph function after all checking is done to avoid multiple unnecessary runs
    return
  }

  getServantChurches(servant)

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <Container className="mt-4">
        <HeadingPrimary
          loading={!servant}
        >{`${servant?.fullName}'s Churches`}</HeadingPrimary>

        <div className="d-grid gap-2 text-left">
          {churches?.map((church, i) => (
            <MenuButton
              key={i}
              avatar={church.leaderPic}
              title={`${church.name} ${church.__typename}`}
              caption={church.leader}
              color="churches"
              onClick={() => {
                clickCard(church[0])
                navigate(church.link)
              }}
            />
          ))}
        </div>
      </Container>
    </BaseComponent>
  )
}

export default ServantsChurchList
