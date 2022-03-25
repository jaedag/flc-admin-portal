import { useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { Card, Col, Row, Button } from 'react-bootstrap'
import { TelephoneFill, Whatsapp } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'
import { STREAM_BY_COUNCIL } from './DefaultersQueries'
import './Defaulters.css'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import PlaceholderDefaulterList from './PlaceholderDefaulterList'

const StreamByCouncil = () => {
  const { streamId, clickCard } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(STREAM_BY_COUNCIL, {
    variables: {
      id: streamId,
    },
  })

  const navigate = useNavigate()
  return (
    <BaseComponent data={data} loading={loading} error={error} placeholder>
      <HeadingPrimary loading={loading || !data?.streams[0]?.name}>
        {`${data?.streams[0].name} Stream By Council`}
      </HeadingPrimary>
      <Row>
        {data?.streams.length ? (
          data?.streams[0].councils.map((council, i) => (
            <Col key={i} xs={12} className="mb-3">
              <Card>
                <Card.Header className="fw-bold">{`${council.name} Council`}</Card.Header>
                <Card.Body
                  onClick={() => {
                    clickCard(council)
                    navigate('/services/council-by-constituency')
                  }}
                >
                  <div className="fw-bold">
                    Active Fellowships {council.activeFellowshipCount}
                  </div>
                  <div className="good">
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
                        : council.bankedThisWeekCount > 0
                        ? 'yellow'
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
                    className={council.cancelledServicesThisWeekCount && 'bad'}
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
        ) : (
          <PlaceholderDefaulterList loading={loading} />
        )}
      </Row>
    </BaseComponent>
  )
}

export default StreamByCouncil
