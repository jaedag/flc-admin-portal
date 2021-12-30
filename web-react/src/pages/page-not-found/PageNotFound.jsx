import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import sadIcon from '../../assets/404.png'

const PageNotFound = () => {
  return (
    <div className="scroll-bottom">
      <div className="py-5">
        <Row className="d-flex justify-content-center ">
          <Col xs={6} md={6} lg={2}>
            <Image
              src={sadIcon}
              fluid
              rounded
              className="rounded-circle bg-secondary"
            />
          </Col>
        </Row>
      </div>
      <div>
        <h1 className="text-center text-secondary fw-bolder">404</h1>
        <h3 className="text-center text-secondary">Page Not Found</h3>
        <div className="text-center text-secondary px-2">
          The page you are looking for does not exist.
        </div>
        <div className="text-center fixed-bottom pb-5">
          <Link to="/">Go back to the dashboard</Link>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
