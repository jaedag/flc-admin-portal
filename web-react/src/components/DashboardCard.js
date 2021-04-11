import React from 'react'
import { Link } from 'react-router-dom'
import './DashboardCard.css'

export const DashboardCard = (props) => {
  let icon = ''
  const { name, detail1, detail2, cardLink } = props

  if (name === 'Towns' || name === 'Campuses') {
    icon = 'landmark'
  }
  if (name === 'Ministries') {
    icon = 'church'
  }
  if (name === 'Members' || name === 'Pastors') {
    icon = 'users'
  }

  return (
    <div>
      <Link
        to={`${cardLink}`}
        className="card dashboard-card align-self-center card-body mx-2 mb-2"
      >
        <span
          className={`fas fa-${icon} fa-2x d-md-none pb-3 icon-color text-center`}
        />
        <span
          className={`fas fa-${icon} fa-4x d-none d-md-block pb-3 icon-color text-center`}
        />
        <h5 className="card-title text-center text-nowrap text-white">
          {name}
        </h5>
        <span className="card-text text-muted text-center">{`${detail1}`}</span>
        <span className="card-text text-muted text-center">{detail2}</span>
      </Link>
    </div>
  )
}
