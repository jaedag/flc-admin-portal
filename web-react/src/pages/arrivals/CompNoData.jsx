import React from 'react'
import { Card } from 'react-bootstrap'

const CompNoData = ({ text }) => {
  return (
    <Card className="mt-5 py-3">
      <Card.Body>{text}</Card.Body>
    </Card>
  )
}

export default CompNoData
