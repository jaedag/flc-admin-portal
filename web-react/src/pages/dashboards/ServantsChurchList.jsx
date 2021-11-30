import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { useQuery } from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { SERVANTS_DASHBOARD } from './DashboardQueries'
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
  const history = useHistory()
  const { data, loading, error } = useQuery(SERVANTS_DASHBOARD, {
    variables: { id: memberId },
  })

  const servant = data?.members[0]
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
    if (servant?.leadsBacenta?.length) {
      pushIntoChurch(servant?.leadsBacenta)
    }
    if (servant?.leadsCentre?.length) {
      pushIntoChurch(servant?.leadsCentre)
    }
    if (servant?.leadsTown?.length) {
      pushIntoChurch(servant?.leadsTown)
    }
    if (servant?.leadsCampus?.length) {
      pushIntoChurch(servant?.leadsCampus)
    }
    if (servant?.leadsSonta?.length) {
      pushIntoChurch(servant?.leadsSonta)
    }
    if (servant?.leadsBasonta?.length) {
      pushIntoChurch(servant?.leadsBasonta)
    }
    if (servant?.leadsMinistry?.length) {
      pushIntoChurch(servant?.leadsMinistry)
    }
    if (servant?.isBishopForTown?.length) {
      churches.push({ name: 'Campus Bishop', number: 'Bishop' })
    }
    if (servant?.isBishopForCampus?.length) {
      churches.push({ name: 'Town Bishop', number: 'Bishop' })
    }
    if (servant?.isAdminForCouncil?.length) {
      pushIntoChurch(servant?.isAdminForCouncil)
    }
    if (servant?.isAdminForCampus?.length) {
      pushIntoChurch(servant?.isAdminForCampus)
    }
    if (servant?.isAdminForTown?.length) {
      pushIntoChurch(servant?.isAdminForTown)
    }

    //run the get graph function after all checking is done to avoid multiple unnecessary runs
    return
  }

  getServantChurches(servant)

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <Container className="mt-4">
        <HeadingPrimary>{plural(churches[0].typename)}</HeadingPrimary>

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
                  history.push(church.link)
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
