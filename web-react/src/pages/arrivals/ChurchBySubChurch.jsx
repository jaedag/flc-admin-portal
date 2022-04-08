import { useLazyQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { plural } from 'global-utils'
import useChurchLevel from 'hooks/useChurchLevel'
import useSetUserChurch from 'hooks/useSetUserChurch'
import React, { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import {
  COUNCIL_BY_CONSTITUENCY_ARRIVALS,
  STREAM_BY_COUNCIL_ARRIVALS,
  GATHERINGSERVICE_BY_STREAM_ARRIVALS,
} from './churchBySubchurchQueries'
import ConstituencyDashboard from './DashboardConstituency'

const ChurchBySubChurch = () => {
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()
  const { currentUser } = useContext(MemberContext)
  const [councilByConstituency] = useLazyQuery(COUNCIL_BY_CONSTITUENCY_ARRIVALS)
  const [streamByCouncil] = useLazyQuery(STREAM_BY_COUNCIL_ARRIVALS)
  const [gatheringServcieByStream] = useLazyQuery(
    GATHERINGSERVICE_BY_STREAM_ARRIVALS
  )
  const currentChurch = currentUser?.currentChurch

  if (currentChurch?.__typename === 'Constituency') {
    return <ConstituencyDashboard />
  }

  const { church, subChurchLevel, loading, error } = useChurchLevel({
    councilFunction: councilByConstituency,
    streamFunction: streamByCouncil,
    gatheringServiceFunction: gatheringServcieByStream,
  })

  return (
    <BaseComponent data={church} loading={loading} error={error} placeholder>
      <Container>
        <div
          className={`fw-bold large-number pb-3`}
        >{`${currentChurch?.name} ${currentChurch?.__typename} By ${subChurchLevel}`}</div>
        <Row>
          {church
            ? church[`${plural(subChurchLevel?.toLowerCase())}`]?.map(
                (subChurch, i) => (
                  <Col key={i} xs={12} className="mb-3">
                    <Card>
                      <Card.Header className="fw-bold">{`${subChurch.name} ${subChurch.__typename}`}</Card.Header>
                      <Card.Body
                        onClick={() => {
                          clickCard(subChurch)
                          useSetUserChurch(subChurch)
                          navigate(`/arrivals/${subChurchLevel}`)
                        }}
                      >
                        <div>
                          Active Fellowships {subChurch.activeFellowshipCount}
                        </div>
                        <div>
                          Bacentas With No Activity{' '}
                          {subChurch.bacentasNoActivityCount}
                        </div>
                        <div
                          className={
                            subChurch.bacentasMobilisingCount ? 'orange' : 'bad'
                          }
                        >
                          Bacentas Mobilising{' '}
                          {subChurch.bacentasMobilisingCount}
                        </div>
                        <div
                          className={
                            subChurch.bacentasOnTheWayCount ? 'yellow' : 'bad'
                          }
                        >
                          Bacentas On The Way {subChurch.bacentasOnTheWayCount}
                        </div>
                        <div
                          className={
                            subChurch.bacentasHaveBeenCountedCount
                              ? 'good'
                              : 'bad'
                          }
                        >
                          Bacentas That Have Been Counted{' '}
                          {subChurch.bacentasHaveBeenCountedCount}
                        </div>
                        <div
                          className={
                            subChurch.bacentasHaveArrivedCount ? 'good' : 'bad'
                          }
                        >
                          Bacentas That Have Arrived{' '}
                          {subChurch.bacentasHaveArrivedCount}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              )
            : [1, 2, 3].map((placeholder, i) => (
                <Col key={i} xs={12} className="mb-3">
                  <Card>
                    <Card.Header className="fw-bold">
                      <PlaceholderCustom
                        loading={loading}
                        className="fw-bold"
                      ></PlaceholderCustom>
                    </Card.Header>
                    <Card.Body>
                      <PlaceholderCustom loading={loading} as="div" />
                      <PlaceholderCustom loading={loading} as="div" />
                      <PlaceholderCustom loading={loading} as="div" />
                      <PlaceholderCustom loading={loading} as="div" />
                    </Card.Body>
                  </Card>
                </Col>
              ))}
        </Row>
      </Container>
    </BaseComponent>
  )
}

export default ChurchBySubChurch
