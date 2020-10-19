import React from 'react'

function SpinnerPage() {
  return (
    <div className="body-container full-body-center">
      <div className="row h-75">
        <div className="col my-auto">
          <div className="spinner-border-center full-center" role="status">
            <div className="sr-only">Loading...</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpinnerPage
