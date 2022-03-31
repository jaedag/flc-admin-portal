import { useLazyQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import useChurchLevel from 'hooks/useChurchLevel'
import PlaceholderMemberDisplay from 'pages/services/defaulters/PlaceholderDefaulter'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import {
  CONSTITUENCY_BACENTAS_ON_THE_WAY,
  COUNCIL_BACENTAS_ON_THE_WAY,
  GATHERINGSERVICE_BACENTAS_ON_THE_WAY,
  STREAM_BACENTAS_ON_THE_WAY,
} from './bussingStatusQueries'
import NoData from './CompNoData'

const BacentasOnTheWay = () => {
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const [constituencyOnTheWay] = useLazyQuery(CONSTITUENCY_BACENTAS_ON_THE_WAY)
  const [councilOnTheWay] = useLazyQuery(COUNCIL_BACENTAS_ON_THE_WAY)
  const [streamOnTheWay] = useLazyQuery(STREAM_BACENTAS_ON_THE_WAY)
  const [gatheringServiceOnTheWay] = useLazyQuery(
    GATHERINGSERVICE_BACENTAS_ON_THE_WAY
  )

  const { church, loading, error } = useChurchLevel({
    constituencyFunction: constituencyOnTheWay,
    councilFunction: councilOnTheWay,
    streamFunction: streamOnTheWay,
    gatheringServiceFunction: gatheringServiceOnTheWay,
  })

  return (
    <BaseComponent data={church} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary loading={loading}>Bacentas On The Way</HeadingPrimary>
        <HeadingSecondary loading={!church?.name}>
          {church?.name} {church?.__typename}
        </HeadingSecondary>

        {church && !church?.bacentasOnTheWay.length && (
          <NoData text="There are no bacentas on the way" />
        )}

        {church?.bacentasOnTheWay?.map((bacenta, i) => {
          return (
            <MemberDisplayCard
              key={i}
              member={bacenta}
              leader={bacenta.leader}
              contact
              onClick={() => {
                clickCard(bacenta)
                clickCard(bacenta.bussing[0])
                navigate('/bacenta/bussing-details')
              }}
            />
          )
        })}

        {!church?.bacentasOnTheWay.length && loading && (
          <PlaceholderMemberDisplay />
        )}
      </Container>
    </BaseComponent>
  )
}

export default BacentasOnTheWay
