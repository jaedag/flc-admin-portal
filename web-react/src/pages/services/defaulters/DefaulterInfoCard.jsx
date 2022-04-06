import PlaceholderCustom from 'components/Placeholder'
import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const DefaulterInfoCard = ({ defaulter }) => {
  const navigate = useNavigate()

  return (
    <Card className="text-center" onClick={() => navigate(defaulter.link)}>
      <Card.Header>{defaulter.title}</Card.Header>
      <PlaceholderCustom
        loading={!defaulter.data || defaulter.data === '0'}
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
