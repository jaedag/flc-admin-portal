import { useLazyQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { getWeekNumber } from 'date-utils'
import useChurchLevel from 'hooks/useChurchLevel'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DefaulterCard from './DefaulterCard'
import {
  CONSTITUENCY_BANKED_LIST,
  COUNCIL_BANKED_LIST,
  STREAM_BANKED_LIST,
  GATHERINGSERVICE_BANKED_LIST,
} from './DefaultersQueries'
import PlaceholderDefaulterList from './PlaceholderDefaulterList'

const Banked = () => {
  const [constituencyBanked] = useLazyQuery(CONSTITUENCY_BANKED_LIST)
  const [councilBanked] = useLazyQuery(COUNCIL_BANKED_LIST)
  const [streamBanked] = useLazyQuery(STREAM_BANKED_LIST)
  const [gatheringServiceBanked] = useLazyQuery(GATHERINGSERVICE_BANKED_LIST)

  const { church, loading, error } = useChurchLevel({
    constituencyFunction: constituencyBanked,
    councilFunction: councilBanked,
    streamFunction: streamBanked,
    gatheringServiceFunction: gatheringServiceBanked,
  })

  return (
    <BaseComponent data={church} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary
          loading={!church}
        >{`${church?.name} ${church?.__typename}`}</HeadingPrimary>
        <HeadingSecondary>
          {`Fellowships That Have Banked This Week (Week ${getWeekNumber()})`}
        </HeadingSecondary>

        <PlaceholderCustom as="h6" loading={!church?.bankedThisWeek.length}>
          <h6>{`Number Who Have Banked: ${church?.bankedThisWeek.length}`}</h6>
        </PlaceholderCustom>

        <Row>
          {church?.bankedThisWeek.map((defaulter, i) => (
            <Col key={i} xs={12} className="mb-3">
              <DefaulterCard
                defaulter={defaulter}
                link="/fellowship/service-details"
              />
            </Col>
          ))}
          {!church && <PlaceholderDefaulterList />}
        </Row>
      </Container>
    </BaseComponent>
  )
}

export default Banked
