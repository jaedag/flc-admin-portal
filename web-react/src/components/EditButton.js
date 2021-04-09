import React from 'react'
import { Link } from 'react-router-dom'

export const EditButton = (props) => {
  const { link } = props
  return (
    <Link to={link}>
      <sup className="text-secondary card-text icon-color font-weight-bold ml-3">
        <i className="fas fa-edit" />
        Edit
      </sup>
    </Link>
  )
}
