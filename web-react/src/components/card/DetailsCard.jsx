import React from 'react'
import './DetailsCard.css'

const DetailsCard = (props) => {
  return (
    <div>
      <div className="container-fluid card detail-card m-3">
        <div className="row">
          <div className="col-auto">
            <span className="text-secondary">{props.heading}</span>
            <h2 className="font-weight-bold">{props.detail}</h2>
          </div>
          {props.heading2 && (
            <div className="col-auto">
              <span className="text-secondary">{props.heading2}</span>
              <h2 className="font-weight-bold">{props.detail2}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailsCard
