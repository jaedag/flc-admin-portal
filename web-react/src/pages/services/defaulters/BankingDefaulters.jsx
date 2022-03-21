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
  CONSTITUENCY_BANKING_DEFAULTERS_LIST,
  COUNCIL_BANKING_DEFAULTERS_LIST,
  STREAM_BANKING_DEFAULTERS_LIST,
  GATHERINGSERVICE_BANKING_DEFAULTERS_LIST,
} from './DefaultersQueries'
import PlaceholderDefaulter from './PlaceholderDefaulter'

const BankingDefaulters = () => {
  const [constituencyBankingDefaulters] = useLazyQuery(
    CONSTITUENCY_BANKING_DEFAULTERS_LIST
  )
  const [councilBankingDefaulters] = useLazyQuery(
    COUNCIL_BANKING_DEFAULTERS_LIST
  )
  const [streamBankingDefaulters] = useLazyQuery(STREAM_BANKING_DEFAULTERS_LIST)
  const [gatheringServiceBankingDefaulters] = useLazyQuery(
    GATHERINGSERVICE_BANKING_DEFAULTERS_LIST
  )

  const { church, loading, error } = useChurchLevel({
    constituencyFunction: constituencyBankingDefaulters,
    councilFunction: councilBankingDefaulters,
    streamFunction: streamBankingDefaulters,
    gatheringServiceFunction: gatheringServiceBankingDefaulters,
  })

  return (
    <BaseComponent data={church} loading={loading} error={error} placeholder>
      <Container>
        <HeadingPrimary
          loading={!church}
        >{`${church?.name} ${church?.__typename}`}</HeadingPrimary>
        <HeadingSecondary>
          {`Fellowships That Have Not Banked This Week Despite Having Service (Week ${getWeekNumber()})`}
        </HeadingSecondary>

        <PlaceholderCustom
          as="h6"
          loading={!church?.bankingDefaultersThisWeek.length}
        >
          <h6>{`Number of Defaulters: ${church?.bankingDefaultersThisWeek.length}`}</h6>
        </PlaceholderCustom>

        <Row>
          {church?.bankingDefaultersThisWeek.map((defaulter, i) => (
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

export default BankingDefaulters
