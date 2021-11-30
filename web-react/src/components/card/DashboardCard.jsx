import React from 'react'
import { Link } from 'react-router-dom'
import './DashboardCard.css'

const DashboardCard = (props) => {
  let icon = ''
  const { name, detail1, detail2, cardLink, ...rest } = props

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
    <div {...rest}>
      <Link
        to={cardLink}
        className="d-none d-md-block text-center card dashboard-card align-self-center card-body mx-2 mb-2 p-3"
      >
        <span
          className={`fas fa-${icon} fa-2x d-md-none pb-3 icon-color text-center`}
        />
        <span
          className={`fas fa-${icon} fa-4x d-none d-md-block pb-3 icon-color text-center`}
        />
        <h5 className="card-title text-nowrap text-white">{`${name}`}</h5>
        <span className=" text-muted">{detail1}</span>
      </Link>
      <Link
        to={cardLink}
        className="d-md-none card mobile-search-card mobile align-self-center p-2 pl-4 mb-2"
      >
        <div className="media ">
          {/* <div className=" img-search rounded-circle"> */}
          <span className={`icon-color fas fa-${icon} fa-3x`} />
          {/* </div> */}
          <div className="media-body ml-4">
            <h6 className="m-0 text-white">{`${name}`}</h6>
            <p className="text-secondary m-0">
              {`${detail1}`}
              <br />
              {detail2 && `${detail2}`}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default DashboardCard
