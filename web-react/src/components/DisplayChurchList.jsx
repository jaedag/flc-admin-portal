import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ChurchContext } from '../contexts/ChurchContext'

const DisplayChurchList = (props) => {
  const { data, churchType } = props
  const { clickCard } = useContext(ChurchContext)

  return (
    <div className="container">
      <h5 className="text-muted">{`${churchType} Locations:`}</h5>
      <div className="row">
        {data.map((church, index) => {
          return (
            <Link
              to={`/${churchType.toLowerCase()}/displaydetails`}
              className="col-sm-8 col-md-3 card m-2"
              key={index}
              onClick={() => {
                clickCard(church)
              }}
            >
              <div className="card-body">
                <span className="text-muted">{`${churchType}: `}</span>
                <span className="card-title">{church.name}</span>
                <h6 className="card-text text-muted">
                  {church.leader
                    ? `${church.leader.firstName} ${church.leader.lastName}`
                    : null}
                </h6>
                {church.admin && (
                  <p className="card-text text-muted">{`Admin: ${church.admin.firstName}`}</p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default DisplayChurchList
