import React from 'react'
import { Link } from 'react-router-dom'

const EditButton = (props) => {
  const { link } = props
  return (
    <Link to={link} className="text-nowrap">
      <sup className="text-secondary card-text icon-color font-weight-bold ml-3">
        <i className="fas fa-edit" />
        Edit
      </sup>
    </Link>
  )
}

export default EditButton
