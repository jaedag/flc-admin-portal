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
} from 'pages/reports/report-utils'
import { plural, transformCloudinaryImg } from 'global-utils'
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
        clickCard: () => {
          clickCard(church)
        },
        link: `/${church.__typename}/displaydetails`,
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
    if (servant?.leadsCouncil?.length) {
      churches.push({ name: 'Bishop', number: 'Bishop' })
    }
    if (servantAdmin?.isAdminForCouncil?.length) {
      pushIntoChurch(servantAdmin?.isAdminForCouncil)
    }
    if (servantAdmin?.isAdminForConstituency?.length) {
      pushIntoChurch(servantAdmin?.isAdminForConstituency)
    }

    //run the get graph function after all checking is done to avoid multiple unnecessary runs
    return
  }

  getServantChurches(servant)

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <Container className="mt-4">
        <HeadingPrimary>{plural(churches[0]?.typename)}</HeadingPrimary>

        <div className="d-grid gap-2 text-left">
          {churches.map((church, i) => {
            return (
              <MenuButton
                key={i}
                avatar={transformCloudinaryImg(church.leaderPic)}
                title={`${church.name} ${church.__typename}`}
                caption={church.leader}
                color="churches"
                onClick={() => {
                  church.clickCard()
                  navigate(church.link)
                }}
              />
            )
          })}
        </div>
      </Container>
    </BaseComponent>
  )
}

export default ServantsChurchList
