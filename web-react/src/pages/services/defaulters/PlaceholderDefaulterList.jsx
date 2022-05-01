import PlaceholderCustom from 'components/Placeholder'
import React from 'react'
import { Card, Col } from 'react-bootstrap'

const PlaceholderDefaulterList = () => {
  return [1, 2, 3].map((placeholder, i) => (
    <Col key={i} xs={12} className="mb-3">
      <Card>
        <Card.Header className="fw-bold">
          <PlaceholderCustom
            loading={true}
            className="fw-bold"
          ></PlaceholderCustom>
        </Card.Header>
        <Card.Body>
          <PlaceholderCustom loading={true} as="div" />
          <PlaceholderCustom loading={true} as="div" />
          <PlaceholderCustom loading={true} as="div" />
          <PlaceholderCustom loading={true} as="div" />
        </Card.Body>
        <Card.Footer>
          <PlaceholderCustom
            variant="primary"
            loading={true}
            className="btn-call"
            button="true"
          />
          <PlaceholderCustom
            variant="success"
            className="btn-whatsapp"
            loading={true}
            button="true"
          />
        </Card.Footer>
      </Card>
    </Col>
  ))
}

export default PlaceholderDefaulterList
