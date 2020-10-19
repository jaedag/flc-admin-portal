import React from 'react'
import { Link } from 'react-router-dom'

export const DashboardCard = (props) => {
  const { name, number, cardLink } = props

  if (name === 'Communities') {
    return (
      <Link
        to={`${cardLink}`}
        className="card align-self-center card-body mx-2 py-5 mb-5"
      >
        <span className="fas fa-landmark fa-2x d-md-none  pb-3 icon-color text-center" />
        <span className="fas fa-landmark fa-5x d-none d-md-block pb-3 icon-color text-center" />
        <h5 className="card-title text-center text-nowrap text-white">
          {name}
        </h5>
        <p className="card-text text-muted text-center text-nowrap">{number}</p>
      </Link>
    )
  } else if (name === 'Ministries') {
    return (
      <Link
        to={`${cardLink}`}
        className="card align-self-center card-body mx-2 py-5 mb-5"
      >
        <span className="fas fa-church fa-2x d-md-none  pb-3 icon-color text-center" />
        <span className="fas fa-church fa-5x d-none d-md-block pb-3 icon-color text-center" />
        <h5 className="card-title text-center text-nowrap text-white">
          {name}
        </h5>
        <p className="card-text text-muted text-center text-nowrap">{number}</p>
      </Link>
    )
  } else if (name === 'Members') {
    return (
      <Link
        to={`${cardLink}`}
        className="card align-self-center card-body mx-2 py-5 mb-5"
      >
        <span className="fas fa-users fa-2x d-md-none  pb-3 icon-color text-center" />
        <span className="fas fa-users fa-5x d-none d-md-block pb-3 icon-color text-center" />
        <h5 className="card-title text-center text-nowrap text-white">
          {name}
        </h5>
        <p className="card-text text-muted text-center text-nowrap">{number}</p>
      </Link>
    )
  } else if (name === 'Pastors') {
    return (
      <Link
        to={`${cardLink}`}
        className="card align-self-center card-body mx-2 py-5 mb-5"
      >
        <span className="fas fa-users fa-2x d-md-none  pb-3 icon-color text-center" />
        <span className="fas fa-users fa-5x d-none d-md-block pb-3 icon-color text-center" />
        <h5 className="card-title text-center text-nowrap text-white">
          {name}
        </h5>
        <p className="card-text text-muted text-center text-nowrap">{number}</p>
      </Link>
    )
  }
}
