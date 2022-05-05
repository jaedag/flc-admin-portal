import { useLazyQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import useChurchLevel from 'hooks/useChurchLevel'
import PlaceholderDefaulterList from 'pages/services/defaulters/PlaceholderDefaulterList'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import {
  CONSTITUENCY_BACENTAS_TO_COUNT,
  COUNCIL_BACENTAS_TO_COUNT,
  GATHERINGSERVICE_BACENTAS_TO_COUNT,
  STREAM_BACENTAS_TO_COUNT,
} from './bussingStatusQueries'
import NoData from './CompNoData'

const StateBacentasToCount = () => {
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const [constituencyOnTheWay] = useLazyQuery(CONSTITUENCY_BACENTAS_TO_COUNT)
  const [councilOnTheWay] = useLazyQuery(COUNCIL_BACENTAS_TO_COUNT)
  const [streamOnTheWay] = useLazyQuery(STREAM_BACENTAS_TO_COUNT)
  const [gatheringServiceOnTheWay] = useLazyQuery(
    GATHERINGSERVICE_BACENTAS_TO_COUNT
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
        <HeadingPrimary loading={loading}>Bacentas To Count</HeadingPrimary>
        <HeadingSecondary loading={!church?.name}>
          {church?.name} {church?.__typename}
        </HeadingSecondary>

        {church && !church?.bacentasNotCounted.length && (
          <NoData text="There are no bacentas to be counted" />
        )}

        {church?.bacentasNotCounted?.map((bacenta, i) => {
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

        {!church?.bacentasNotCounted.length && loading && (
          <PlaceholderDefaulterList />
        )}
      </Container>
    </BaseComponent>
  )
}

export default StateBacentasToCount
