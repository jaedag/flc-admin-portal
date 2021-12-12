import React from 'react'
import { Col } from 'react-bootstrap'
import DefaulterCard from './DefaulterCard'

const PlaceholderDefaulter = () => {
  const array = [null, null, null]
  return (
    <>
      {array.map((service, i) => (
        <Col key={i} xs={12} className="mb-3">
          <DefaulterCard
            defaulter={service}
            link="/fellowship/service-details"
          />
        </Col>
      ))}
    </>
  )
}

export default PlaceholderDefaulter
