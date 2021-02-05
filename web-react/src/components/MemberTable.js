import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { MemberContext } from '../contexts/MemberContext'
import Spinner from './Spinner'

export const MemberTable = (props) => {
  const { member, memberError, memberLoading, list } = props
  const { setMemberID } = useContext(MemberContext)
  const history = useHistory()

  if (memberLoading || memberError) {
    return (
      <div className="container d-flex justify-content-center">
        <Spinner />
      </div>
    )
  }

  member[`${list}`].map((index) => {
    return (
      <div key={index} className="container col-lg-9 col-md-9 ">
        <div className="row row-no-gutters">
          <div className="col-sm-2 m-3">
            <div className="card  mt-3">
              <div className="d-none d-sm-block t-2">
                <img
                  className="card-img-top img-fluid"
                  src="./img/user.png"
                  alt=""
                />
              </div>
              <div className="card-body">
                <p className="card-title pt-2">data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })
  return (
    // Web View Full Screen without filters applied
    <div className="row no-gutters">
      {member[`${list}`].map((soul, index) => {
        return (
          <div className="col px-1" key={index}>
            <div
              className="card grid-card mb-2"
              onClick={() => {
                // console.log('Member ID before', soul.memberID)
                setMemberID(soul.memberID)
                history.push('/members/displaydetails')
              }}
            >
              <div className="d-none d-sm-block image-card ">
                <img className="card-img-top" src={soul.pictureUrl} alt="" />
              </div>
              <p className="card-title text-center pt-2">
                {soul.firstName + ' ' + soul.lastName}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
