import React from 'react'
import { Link } from 'react-router-dom'
import './ViewAll.css'

const ViewAll = ({ ...rest }) => {
  return (
    <Link className="view-all" {...rest}>
      VIEW ALL
    </Link>
  )
}

export default ViewAll
