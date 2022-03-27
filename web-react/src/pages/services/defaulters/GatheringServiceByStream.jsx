import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { Card, Col, Row, Button, Container } from 'react-bootstrap'
import { TelephoneFill, Whatsapp } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'
import { GATHERINGSERVICE_BY_STREAM } from './DefaultersQueries'
import './Defaulters.css'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import PlaceholderDefaulterList from './PlaceholderDefaulterList'

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
      <Container>
        <HeadingPrimary
          loading={loading || !data?.gatheringServices[0]?.name}
        >{`${data?.gatheringServices[0]?.name} Gathering Service By Streams`}</HeadingPrimary>

        <Row>
          {data?.gatheringServices.length ? (
            data?.gatheringServices[0]?.streams.map((stream, i) => (
              <Col key={i} xs={12} className="mb-3">
                <Card>
                  <Card.Header className="fw-bold">{`${stream.name} Stream`}</Card.Header>
                  <Card.Body
                    onClick={() => {
                      clickCard(stream)
                      navigate('/services/stream-by-council')
                    }}
                  >
                    <div className="fw-bold">
                      Active Fellowships {stream.activeFellowshipCount}
                    </div>
                    <div className="good">
                      Services This Week {stream.servicesThisWeekCount}
                    </div>
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
                          : stream.bankedThisWeekCount > 0
                          ? 'yellow'
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
          ) : (
            <PlaceholderDefaulterList loading={loading} />
          )}
        </Row>
      </Container>
    </BaseComponent>
  )
}

export default GatheringServiceByStream
