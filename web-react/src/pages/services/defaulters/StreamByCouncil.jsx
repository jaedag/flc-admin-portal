import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import { TelephoneFill, Whatsapp } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'
import { STREAM_BY_COUNCIL } from './DefaultersQueries'
import './Defaulters.css'

const StreamByStream = () => {
  const { streamId, clickCard } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(STREAM_BY_COUNCIL, {
    variables: {
      id: streamId,
    },
  })

  const navigate = useNavigate()
  return (
    <BaseComponent data={data} loading={loading} error={error} placeholder>
      <PlaceholderCustom
        loading={loading || !data?.streams[0]?.name}
        className={`fw-bold large-number pb-3`}
      >
        <Container
          className={`fw-bold large-number pb-3`}
        >{`${data?.streams[0].name} Stream By Council`}</Container>
      </PlaceholderCustom>
      <Row>
        {data?.streams.length
          ? data?.streams[0].councils.map((council, i) => (
              <Col key={i} xs={12} className="mb-3">
                <Card>
                  <Card.Header className="fw-bold">{`${council.name} Council`}</Card.Header>
                  <Card.Body
                    onClick={() => {
                      clickCard(council)
                      navigate('/services/council-by-constituency')
                    }}
                  >
                    <div>
                      Active Fellowships {council.activeFellowshipCount}
                    </div>
                    <div>
                      Services This Week {council.servicesThisWeekCount}
                    </div>
                    <div
                      className={
                        council.formDefaultersThisWeekCount ? 'bad' : 'good'
                      }
                    >
                      Form Not Filled This Week{' '}
                      {council.formDefaultersThisWeekCount}
                    </div>
                    <div
                      className={
                        council.bankedThisWeekCount ===
                        council.servicesThisWeekCount
                          ? 'good'
                          : 'bad'
                      }
                    >
                      Banked This Week {council.bankedThisWeekCount}
                    </div>
                    <div
                      className={
                        council.bankingDefaultersThisWeekCount ? 'bad' : 'good'
                      }
                    >
                      Not Banked This Week{' '}
                      {council.bankingDefaultersThisWeekCount}
                    </div>
                    <div
                      className={
                        council.cancelledServicesThisWeekCount && 'bad'
                      }
                    >
                      Cancelled Services This Week{' '}
                      {council.cancelledServicesThisWeekCount}
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className="mb-2">
                      Contact Admin: {council?.admin?.fullName}
                    </div>
                    <a href={`tel:${council?.admin?.phoneNumber}`}>
                      <Button variant="primary">
                        <TelephoneFill /> Call
                      </Button>
                    </a>
                    <a
                      href={`https://wa.me/${council?.admin?.whatsappNumber}`}
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

export default StreamByStream
