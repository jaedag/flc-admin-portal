import React from 'react'
import { Spinner } from 'react-bootstrap'

function SpinnerPage() {
  return (
    <div className="row">
      <div className="col my-auto">
        <div className="spinner-border-center full-center">
          <Spinner animation="border" />
        </div>
      </div>
    </div>
  )
}

export default SpinnerPage
