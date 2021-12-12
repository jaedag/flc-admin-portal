import PlaceholderCustom from 'components/Placeholder'
import React from 'react'
import { Card } from 'react-bootstrap'
import { useHistory } from 'react-router'

const DefaulterInfoCard = ({ defaulter }) => {
  const history = useHistory()

  return (
    <Card className="text-center" onClick={() => history.push(defaulter.link)}>
      <Card.Header>{defaulter.title}</Card.Header>
      <PlaceholderCustom
        loading={!defaulter.data}
        className={`fw-bold large-number pb-3 ${defaulter.color}`}
      >
        <Card.Body className={`fw-bold large-number ${defaulter.color}`}>
          {defaulter.data}
        </Card.Body>
      </PlaceholderCustom>
    </Card>
  )
}

export default DefaulterInfoCard
