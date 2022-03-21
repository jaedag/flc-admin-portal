import { useLazyQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import useChurchLevel from 'hooks/useChurchLevel'
import PlaceholderMemberDisplay from 'pages/services/defaulters/PlaceholderDefaulter'
import React, { useContext } from 'react'
import { Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import {
  CONSTITUENCY_BACENTAS_ARRIVED,
  COUNCIL_BACENTAS_ARRIVED,
  GATHERINGSERVICES_BACENTAS_ARRIVED,
  STREAM_BACENTAS_ARRIVED,
} from './bussingStatusQueries'

const BacentasHaveArrived = () => {
  const navigate = useNavigate()
  const { clickCard } = useContext(ChurchContext)
  const [constituencyBacentasArrived] = useLazyQuery(
    CONSTITUENCY_BACENTAS_ARRIVED
  )
  const [councilBacentasArrived] = useLazyQuery(COUNCIL_BACENTAS_ARRIVED)
  const [streamBacentasArrived] = useLazyQuery(STREAM_BACENTAS_ARRIVED)
  const [gatheringServiceBacentasArrived] = useLazyQuery(
    GATHERINGSERVICES_BACENTAS_ARRIVED
  )

  const { church, loading, error } = useChurchLevel({
    constituencyFunction: constituencyBacentasArrived,
    councilFunction: councilBacentasArrived,
    streamFunction: streamBacentasArrived,
    gatheringServiceFunction: gatheringServiceBacentasArrived,
  })

  return (
    <BaseComponent data={church} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary loading={loading}>
          Bacentas That Have Arrived
        </HeadingPrimary>
        <HeadingSecondary loading={!church?.name}>
          {church?.name} Constituency
        </HeadingSecondary>

        {!church?.bacentasHaveArrived.length && !loading && (
          <Card>
            <Card.Body>No Bacentas Have Arrived at the Centre</Card.Body>
          </Card>
        )}

        {church?.bacentasHaveArrived?.map((bacenta, i) => {
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

        {!church?.bacentasHaveArrived.length && loading && (
          <PlaceholderMemberDisplay />
        )}
      </Container>
    </BaseComponent>
  )
}

export default BacentasHaveArrived
