import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import { getWeekNumber } from 'global-utils'
import React, { useContext, useEffect, useState } from 'react'
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
  const { currentUser } = useContext(MemberContext)
  const [church, setChurch] = useState(null)
  const [constituencyBankingDefaulters, { data: constituencyData }] =
    useLazyQuery(CONSTITUENCY_BANKING_DEFAULTERS_LIST)
  const [councilBankingDefaulters, { data: councilData }] = useLazyQuery(
    COUNCIL_BANKING_DEFAULTERS_LIST
  )
  const [streamBankingDefaulters, { data: streamData }] = useLazyQuery(
    STREAM_BANKING_DEFAULTERS_LIST
  )
  const [gatheringServiceBankingDefaulters, { data: gatheringServiceData }] =
    useLazyQuery(GATHERINGSERVICE_BANKING_DEFAULTERS_LIST)

  useEffect(() => {
    if (currentUser.currentChurch.__typename === 'Constituency') {
      constituencyBankingDefaulters({
        variables: {
          id: currentUser.currentChurch.id,
        },
      })
      setChurch(constituencyData?.constituencies[0])
    }
    if (currentUser.currentChurch.__typename === 'Council') {
      councilBankingDefaulters({
        variables: {
          id: currentUser.currentChurch.id,
        },
      })
      setChurch(councilData?.councils[0])
    }
    if (currentUser.currentChurch.__typename === 'Stream') {
      streamBankingDefaulters({
        variables: {
          id: currentUser.currentChurch.id,
        },
      })
      setChurch(streamData?.streams[0])
    }
    if (currentUser.currentChurch.__typename === 'GatheringService') {
      gatheringServiceBankingDefaulters({
        variables: {
          id: currentUser.currentChurch.id,
        },
      })
      setChurch(gatheringServiceData?.gatheringServices[0])
    }
  }, [
    currentUser.currentChurch,
    constituencyData,
    councilData,
    streamData,
    gatheringServiceData,
  ])

  return (
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
  )
}

export default BankingDefaulters
