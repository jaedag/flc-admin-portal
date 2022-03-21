import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { getWeekNumber } from 'date-utils'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  CONSTITUENCY_FORM_DEFAULTERS_LIST,
  COUNCIL_FORM_DEFAULTERS_LIST,
  STREAM_FORM_DEFAULTERS_LIST,
  GATHERINGSERVICE_FORM_DEFAULTERS_LIST,
} from './DefaultersQueries'
import DefaulterCard from './DefaulterCard'
import PlaceholderDefaulter from './PlaceholderDefaulter'
import useChurchLevel from 'hooks/useChurchLevel'
import BaseComponent from 'components/base-component/BaseComponent'

const FormDefaulters = () => {
  const [constituencyFormDefaulters] = useLazyQuery(
    CONSTITUENCY_FORM_DEFAULTERS_LIST
  )
  const [councilFormDefaulters] = useLazyQuery(COUNCIL_FORM_DEFAULTERS_LIST)
  const [streamFormDefaulters] = useLazyQuery(STREAM_FORM_DEFAULTERS_LIST)
  const [gatheringServiceFormDefaulters] = useLazyQuery(
    GATHERINGSERVICE_FORM_DEFAULTERS_LIST
  )

  const { church, loading, error } = useChurchLevel({
    constituencyFunction: constituencyFormDefaulters,
    councilFunction: councilFormDefaulters,
    streamFunction: streamFormDefaulters,
    gatheringServiceFunction: gatheringServiceFormDefaulters,
  })

  return (
    <BaseComponent data={church} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary
          loading={!church}
        >{`${church?.name} ${church?.__typename}`}</HeadingPrimary>
        <HeadingSecondary>
          {`Fellowships That Have Not Filled The Form This Week (Week ${getWeekNumber()})`}
        </HeadingSecondary>

        <PlaceholderCustom
          as="h6"
          loading={!church?.formDefaultersThisWeek.length}
        >
          <h6>{`Number of Defaulters: ${church?.formDefaultersThisWeek.length}`}</h6>
        </PlaceholderCustom>

        <Row>
          {church?.formDefaultersThisWeek.map((defaulter, i) => (
            <Col key={i} xs={12} className="mb-3">
              <DefaulterCard defaulter={defaulter} />
            </Col>
          ))}
          {!church && <PlaceholderDefaulter />}
        </Row>
      </Container>
    </BaseComponent>
  )
}

export default FormDefaulters
