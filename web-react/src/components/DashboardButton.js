import React from 'react'
import { Link } from 'react-router-dom'

export const DashboardButton = (props) => {
  return (
    <div className="col">
      <Link to={`${props.btnLink}`}>
        <button className="btn btn-primary btn-block text-nowrap px-4">
          {props.btnText}
        </button>
      </Link>
    </div>
  )
}
