import { useLazyQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderMemberDisplay from 'pages/services/defaulters/PlaceholderDefaulter'
import React from 'react'
import { Container } from 'react-bootstrap'
import {
  CONSTITUENCY_BACENTAS_NO_ACTIVITY,
  COUNCIL_BACENTAS_NO_ACTIVITY,
  GATHERINGSERVICE_BACENTAS_NO_ACTIVITY,
  STREAM_BACENTAS_NO_ACTIVITY,
} from './bussingStatusQueries'
import useChurchLevel from '../../hooks/useChurchLevel'
import NoData from './CompNoData'

const BacentasNoActiviity = () => {
  const [constituencyBacentasNoActivity] = useLazyQuery(
    CONSTITUENCY_BACENTAS_NO_ACTIVITY
  )
  const [councilBacentasNoActivity] = useLazyQuery(COUNCIL_BACENTAS_NO_ACTIVITY)
  const [streamBacentasNoActivity] = useLazyQuery(STREAM_BACENTAS_NO_ACTIVITY)
  const [gatheringServiceBacentasNoActivity] = useLazyQuery(
    GATHERINGSERVICE_BACENTAS_NO_ACTIVITY
  )

  const { church, loading, error } = useChurchLevel({
    constituencyFunction: constituencyBacentasNoActivity,
    councilFunction: councilBacentasNoActivity,
    streamFunction: streamBacentasNoActivity,
    gatheringServiceFunction: gatheringServiceBacentasNoActivity,
  })

  return (
    <BaseComponent data={church} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary loading={loading}>
          Bacentas With No Activity
        </HeadingPrimary>
        <HeadingSecondary loading={!church?.name}>
          {church?.name} {church?.__typename}
        </HeadingSecondary>

        {church && !church?.bacentasNoActivity.length && (
          <NoData text="There are no bacentas without activity" />
        )}

        {church?.bacentasNoActivity.map((bacenta, i) => (
          <MemberDisplayCard
            key={i}
            member={bacenta}
            leader={bacenta.leader}
            contact
          />
        ))}

        {!church?.bacentasNoActivity.length && loading && (
          <PlaceholderMemberDisplay />
        )}
      </Container>
    </BaseComponent>
  )
}

export default BacentasNoActiviity
