import React from 'react'
import { Link } from 'react-router-dom'

const DashboardButton = (props) => {
  return (
    <Link to={`${props.btnLink}`}>
      <button className="btn btn-primary btn-block text-nowrap px-4">
        {props.btnText}
      </button>
    </Link>
  )
}

export default DashboardButton
