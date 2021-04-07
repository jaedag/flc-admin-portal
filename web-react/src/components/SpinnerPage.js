import React from 'react'
import Spinner from './Spinner'

function SpinnerPage() {
  return (
    <div className="body-container full-body-center">
      <div className="row">
        <div className="col my-auto">
          <div className="spinner-border-center full-center">
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpinnerPage
