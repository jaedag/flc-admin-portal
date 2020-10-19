import React from 'react'

export const DetailsCard = (props) => {
  return (
    <div>
      <div className="container-fluid card detail-card m-3">
        <span className="text-secondary">{props.heading}</span>
        <h1 className="font-weight-bold text-responsive">{props.detail}</h1>
      </div>
    </div>
  )
}
