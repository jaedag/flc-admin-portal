import React from 'react'
import { Link } from 'react-router-dom'

export const DashboardCard = (props) => {
  let icon = ''
  const { name, number, cardLink } = props

  if (name === 'Towns' || name === 'Campus') {
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
      {/* <Link
        className="card mobile-search-card p-2 py-3 my-4"
        onClick={() => {}}
      >
        <div className="media">
          <span
            className={`fas fa-${icon} fa-2x d-md-none  pb-3 icon-color text-center`}
          />
          <div className="media-body">
            <h6 className="mt-0">{name}</h6>
          </div>
        </div>
      </Link> */}
      <Link
        to={`${cardLink}`}
        className="card align-self-center card-body mx-2 py-2 mb-2"
      >
        <span
          className={`fas fa-${icon} fa-2x d-md-none  pb-3 icon-color text-center`}
        />
        <span
          className={`fas fa-${icon} fa-4x d-none d-md-block pb-3 icon-color text-center`}
        />
        <h5 className="card-title text-center text-nowrap text-white">
          {name}
        </h5>
        <p className="card-text text-muted text-center">{number}</p>
      </Link>
    </div>
  )
}
