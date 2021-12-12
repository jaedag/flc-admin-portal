import { useLazyQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { MemberContext } from 'contexts/MemberContext'
import { isAuthorised } from 'global-utils'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  CONSTITUENCY_DEFAULTERS,
  COUNCIL_DEFAULTERS,
} from './DefaultersQueries'
import './Defaulters.css'
import PlaceholderCustom from 'components/Placeholder'
import DefaulterInfoCard from './DefaulterInfoCard'

const Defaulters = () => {
  const { currentUser } = useContext(MemberContext)
  const [constituencyDefaulters, { data: constituencyData }] = useLazyQuery(
    CONSTITUENCY_DEFAULTERS
  )
  const [councilDefaulters, { data: councilData }] =
    useLazyQuery(COUNCIL_DEFAULTERS)
  const [church, setChurch] = useState(null)

  useEffect(() => {
    if (isAuthorised(['adminCouncil', 'leaderCouncil'], currentUser.roles)) {
      councilDefaulters({
        variables: {
          id: currentUser.council,
        },
      })
      setChurch(councilData?.councils[0])
    }
    if (
      isAuthorised(
        ['adminTown', 'leaderTown', 'adminCampus', 'leaderCampus'],
        currentUser.roles
      )
    ) {
      constituencyDefaulters({
        variables: {
          id: currentUser.constituency,
        },
      })
      setChurch(constituencyData?.constituencies[0])
    }
  }, [currentUser.constituency, constituencyData, councilData])

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

  return (
    <Container>
      <HeadingPrimary
        loading={!church}
      >{`${church?.name} ${church?.__typename}`}</HeadingPrimary>
      <HeadingSecondary>Defaulters Page</HeadingSecondary>

      <PlaceholderCustom as="h6" loading={!church?.fellowshipCount}>
        <h6>{`Total Number of Fellowships: ${church?.fellowshipCount}`}</h6>
      </PlaceholderCustom>
      <Row>
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
