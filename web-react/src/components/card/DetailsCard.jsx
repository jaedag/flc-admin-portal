import React from 'react'
import './DetailsCard.css'

const DetailsCard = (props) => {
  return (
    <div>
      <div className="container-fluid card detail-card m-3">
        <span className="text-secondary">{props.heading}</span>
        <h2 className="font-weight-bold">{props.detail}</h2>
      </div>
    </div>
  )
}

export default DetailsCard
