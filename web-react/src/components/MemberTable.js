import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { MemberContext } from '../contexts/MemberContext'
import Spinner from './Spinner'

export const MemberTable = (props) => {
  const { memberData, memberError, memberLoading, list } = props
  const { setMemberID } = useContext(MemberContext)
  const history = useHistory()

  if (memberLoading || memberError) {
    return (
      <div className="container d-flex justify-content-center">
        <Spinner />
      </div>
    )
  }

  return (
    // Web View Full Screen without filters applied
    <div className="row no-gutters">
      {memberData[`${list}`].map((soul, index) => {
        return (
          <div className="col px-1" key={index}>
            <div
              className="card grid-card mb-2"
              onClick={() => {
                setMemberID(soul.id)
                history.push('/member/displaydetails')
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
