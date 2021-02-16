import React from 'react'
import { Link } from 'react-router-dom'
import { NavBar } from './NavBar'

export const DisplayChurchList = (props) => {
  const { data, setter, churchType } = props
  const churchID = 'id'

  return (
    <div>
      <NavBar />
      <div className="container">
        <h5 className="text-muted">{`${churchType} Locations:`}</h5>
        <div className="row">
          {data.map((church, index) => {
            return (
              <Link
                to={`/${churchType.toLowerCase()}/displaydetails`}
                className="col-5 col-lg-3 card m-2"
                key={index}
                onClick={() => {
                  setter(church[churchID])
                }}
              >
                <div className="card-body">
                  <span className="text-muted">{`${churchType}:`}</span>
                  <h6 className="card-title">{church.name}</h6>
                  <h6 className="card-text text-muted">
                    {church.leader
                      ? `${church.leader.firstName} ${church.leader.lastName}`
                      : null}
                  </h6>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
