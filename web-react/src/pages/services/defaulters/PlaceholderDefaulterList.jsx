import PlaceholderCustom from 'components/Placeholder'
import React from 'react'
import { Card, Col } from 'react-bootstrap'

const PlaceholderDefaulterList = (loading) => {
  return [1, 2, 3].map((placeholder, i) => (
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
  ))
}

export default PlaceholderDefaulterList
