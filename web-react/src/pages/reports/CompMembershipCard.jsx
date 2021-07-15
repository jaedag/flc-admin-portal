import React from 'react'
import { Link } from 'react-router-dom'
import './Report.css'

const MembershipCard = ({ link, title, count }) => {
  return (
    <div className="card rounded-corners membership-card">
      <Link to={link} className="card-body white">
        <span className="fas fa-users fa-2x px-1 membership-icon" />
        <p className="card-title dashboard-title mb-0">{title}</p>
        <div className="info-text">{count}</div>
      </Link>
    </div>
  )
}

export default MembershipCard
