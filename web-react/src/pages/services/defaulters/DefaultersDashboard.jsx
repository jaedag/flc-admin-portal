import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { plural } from 'global-utils'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  CONSTITUENCY_DEFAULTERS,
  COUNCIL_DEFAULTERS,
  STREAM_DEFAULTERS,
  GATHERINGSERVICE_DEFAULTERS,
} from './DefaultersQueries'
import './Defaulters.css'
import PlaceholderCustom from 'components/Placeholder'
import DefaulterInfoCard from './DefaulterInfoCard'
import RoleView from 'auth/RoleView'
import { permitLeaderAdmin } from 'permission-utils'
import { ChurchContext } from 'contexts/ChurchContext'

const Defaulters = (props) => {
  const { constituencyId, councilId, streamId, gatheringServiceId } =
    useContext(ChurchContext)
  const [constituencyDefaulters, { data: constituencyData }] = useLazyQuery(
    CONSTITUENCY_DEFAULTERS
  )
  const [councilDefaulters, { data: councilData }] =
    useLazyQuery(COUNCIL_DEFAULTERS)
  const [streamDefaulters, { data: streamData }] =
    useLazyQuery(STREAM_DEFAULTERS)
  const [gatheringServiceDefaulters, { data: gatheringServiceData }] =
    useLazyQuery(GATHERINGSERVICE_DEFAULTERS)
  const [church, setChurch] = useState(null)
  const [subChurch, setSubChurch] = useState(null)

  useEffect(() => {
    if (props.churchLevel === 'Constituency') {
      constituencyDefaulters({
        variables: {
          id: constituencyId,
        },
      })
      setChurch(constituencyData?.constituencies[0])
    }
    if (props.churchLevel === 'Council') {
      councilDefaulters({
        variables: {
          id: councilId,
        },
      })
      setChurch(councilData?.councils[0])
      setSubChurch('Constituency')
    }

    if (props.churchLevel === 'Stream') {
      streamDefaulters({
        variables: {
          id: streamId,
        },
      })
      setChurch(streamData?.streams[0])
      setSubChurch('Council')
    }

    if (props.churchLevel === 'GatheringService') {
      gatheringServiceDefaulters({
        variables: {
          id: gatheringServiceId,
        },
      })
      setChurch(gatheringServiceData?.gatheringServices[0])
      setSubChurch('Stream')
    }
  }, [constituencyData, councilData, streamData, gatheringServiceData])

  const defaulters = [
    {
      title: 'Filled Forms',
      data: church?.servicesThisWeekCount || '0',
      color: church?.servicesThisWeekCount ? 'good' : 'bad',
      link: church?.servicesThisWeekCount ? '/services/filled-services' : '#',
    },
    {
      title: 'Not Filled Forms',
      data: church?.formDefaultersThisWeekCount || '0',
      color: church?.formDefaultersThisWeekCount ? 'bad' : 'good',
      link: church?.formDefaultersThisWeekCount
        ? '/services/form-defaulters'
        : '#',
    },
    {
      title: 'Have Banked',
      data: church?.bankedThisWeekCount || '0',
      color: church?.bankedThisWeekCount ? 'good' : 'bad',
      link: church?.bankedThisWeekCount ? '/services/banked' : '#',
    },
    {
      title: 'Have Not Banked',
      data: church?.bankingDefaultersThisWeekCount || '0',
      color: church?.bankingDefaultersThisWeekCount ? 'bad' : 'good',
      link: church?.bankingDefaultersThisWeekCount
        ? '/services/banking-defaulters'
        : '#',
    },
    {
      title: 'Canc. Service',
      data: church?.cancelledServicesThisWeekCount || '0',
      color: church?.cancelledServicesThisWeekCount ? 'bad' : 'good',
      link: church?.cancelledServicesThisWeekCount
        ? '/services/cancelled-services'
        : '#',
    },
  ]

  const aggregates = {
    title: plural(subChurch),
    data: church && church[`${subChurch?.toLowerCase()}Count`],
    // color: church?.cancelledServicesThisWeekCount ? 'bad' : 'good',
    link: `/services/${church?.__typename?.toLowerCase()}-by-${subChurch?.toLowerCase()}`,
  }

  return (
    <Container>
      <HeadingPrimary
        loading={!church}
      >{`${church?.name} ${church?.__typename}`}</HeadingPrimary>
      <HeadingSecondary>Defaulters Page</HeadingSecondary>

      <PlaceholderCustom as="h6" loading={!church}>
        <h6>{`Total Number of Fellowships: ${church?.activeFellowshipCount}`}</h6>
      </PlaceholderCustom>

      <Row>
        <RoleView roles={permitLeaderAdmin('Council')}>
          <Col xs={12} className="mb-3">
            {aggregates?.title && <DefaulterInfoCard defaulter={aggregates} />}
          </Col>
        </RoleView>
        {defaulters.map((defaulter, i) => (
          <Col key={i} xs={6} className="mb-3">
            <DefaulterInfoCard defaulter={defaulter} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Defaulters
