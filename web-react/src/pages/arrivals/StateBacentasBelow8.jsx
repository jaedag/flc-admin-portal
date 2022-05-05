import { useLazyQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import {
  CONSTITUENCY_BACENTAS_BELOW_8,
  COUNCIL_BACENTAS_BELOW_8,
  GATHERINGSERVICE_BACENTAS_BELOW_8,
  STREAM_BACENTAS_BELOW_8,
} from './bussingStatusQueries'
import useChurchLevel from '../../hooks/useChurchLevel'
import NoData from './CompNoData'
import PlaceholderDefaulterList from 'pages/services/defaulters/PlaceholderDefaulterList'
import { useNavigate } from 'react-router'
import { ChurchContext } from 'contexts/ChurchContext'

const BacentasBelow8 = () => {
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const [constituencyBacentasBelow8] = useLazyQuery(
    CONSTITUENCY_BACENTAS_BELOW_8
  )
  const [councilBacentasBelow8] = useLazyQuery(COUNCIL_BACENTAS_BELOW_8)
  const [streamBacentasBelow8] = useLazyQuery(STREAM_BACENTAS_BELOW_8)
  const [gatheringServiceBacentasBelow8] = useLazyQuery(
    GATHERINGSERVICE_BACENTAS_BELOW_8
  )

  const { church, loading, error } = useChurchLevel({
    constituencyFunction: constituencyBacentasBelow8,
    councilFunction: councilBacentasBelow8,
    streamFunction: streamBacentasBelow8,
    gatheringServiceFunction: gatheringServiceBacentasBelow8,
  })

  return (
    <BaseComponent data={church} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary loading={loading}>Bacentas Below 8</HeadingPrimary>
        <HeadingSecondary loading={!church?.name}>
          {church?.name} {church?.__typename}
        </HeadingSecondary>

        {church && !church?.bacentasBelow8.length && (
          <NoData text="There are no bacentas that didn't bus" />
        )}

        {church?.bacentasBelow8.map((bacenta, i) => (
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
        ))}

        {!church?.bacentasBelow8.length && loading && (
          <PlaceholderDefaulterList />
        )}
      </Container>
    </BaseComponent>
  )
}

export default BacentasBelow8
