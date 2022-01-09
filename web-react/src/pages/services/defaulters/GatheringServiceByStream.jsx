import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import { TelephoneFill, Whatsapp } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'
import { GATHERINGSERVICE_BY_STREAM } from './DefaultersQueries'
import './Defaulters.css'

const GatheringServiceByStream = () => {
  const { gatheringServiceId, clickCard } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(GATHERINGSERVICE_BY_STREAM, {
    variables: {
      id: gatheringServiceId,
    },
  })

  const navigate = useNavigate()
  return (
    <BaseComponent data={data} loading={loading} error={error} placeholder>
      <PlaceholderCustom
        loading={loading || !data?.gatheringServices[0]?.name}
        className={`fw-bold large-number pb-3`}
      >
        <Container
          className={`fw-bold large-number pb-3`}
        >{`${data?.gatheringServices[0]?.name} Gathering Service By Streams`}</Container>
      </PlaceholderCustom>
      <Row>
        {data?.gatheringServices.length
          ? data?.gatheringServices[0]?.streams.map((stream, i) => (
              <Col key={i} xs={12} className="mb-3">
                <Card>
                  <Card.Header className="fw-bold">{`${stream.name} Stream`}</Card.Header>
                  <Card.Body
                    onClick={() => {
                      clickCard(stream)
                      navigate('/services/stream-by-councils')
                    }}
                  >
                    <div>Active Fellowships {stream.activeFellowshipCount}</div>
                    <div>Services This Week {stream.servicesThisWeekCount}</div>
                    <div
                      className={
                        stream.formDefaultersThisWeekCount ? 'bad' : 'good'
                      }
                    >
                      Form Not Filled This Week{' '}
                      {stream.formDefaultersThisWeekCount}
                    </div>
                    <div
                      className={
                        stream.bankedThisWeekCount ===
                        stream.servicesThisWeekCount
                          ? 'good'
                          : 'bad'
                      }
                    >
                      Banked This Week {stream.bankedThisWeekCount}
                    </div>
                    <div
                      className={
                        stream.bankingDefaultersThisWeekCount ? 'bad' : 'good'
                      }
                    >
                      Not Banked This Week{' '}
                      {stream.bankingDefaultersThisWeekCount}
                    </div>
                    <div
                      className={stream.cancelledServicesThisWeekCount && 'bad'}
                    >
                      Cancelled Services This Week{' '}
                      {stream.cancelledServicesThisWeekCount}
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className="mb-2">
                      Contact Admin: {stream?.admin?.fullName}
                    </div>
                    <a href={`tel:${stream?.admin?.phoneNumber}`}>
                      <Button variant="primary">
                        <TelephoneFill /> Call
                      </Button>
                    </a>
                    <a
                      href={`https://wa.me/${stream?.admin?.whatsappNumber}`}
                      className="ms-3"
                    >
                      <Button variant="success">
                        <Whatsapp /> WhatsApp
                      </Button>
                    </a>
                  </Card.Footer>
                </Card>
              </Col>
            ))
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
                  <Card.Footer>
                    <PlaceholderCustom
                      variant="primary"
                      loading={loading}
                      className="btn-call"
                      button
                    />
                    <PlaceholderCustom
                      variant="success"
                      className="btn-whatsapp"
                      loading={loading}
                      button
                    />
                  </Card.Footer>
                </Card>
              </Col>
            ))}
      </Row>
    </BaseComponent>
  )
}

export default GatheringServiceByStream
