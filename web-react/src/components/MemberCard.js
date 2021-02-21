import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export const MemberCard = (props) => {
  const { title, editlink } = props
  const { isAuthenticated } = useAuth0()

  return (
    <div className="member-info-card mb-4 p-4">
      <div className="row info-heading">
        <div className="col">
          <p className="font-weight-bold my-2">{title}</p>
        </div>
        {!isAuthenticated && (
          <Link
            className="col-auto d-flex justify-content-end text-secondary card-text icon-color font-weight-bold my-auto"
            to={`${editlink}`}
          >
            <i className="fas fa-edit" />
            Edit
          </Link>
        )}
      </div>
      {props.children}
    </div>
  )
}
