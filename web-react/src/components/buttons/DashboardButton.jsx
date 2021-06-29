import React from 'react'
import { Link } from 'react-router-dom'

const DashboardButton = (props) => {
  const { btnLink, children, ...rest } = props

  return (
    <Link to={btnLink ? `${btnLink}` : '#'}>
      <button className="btn btn-primary px-4" {...rest}>
        {children}
      </button>
    </Link>
  )
}

export default DashboardButton
