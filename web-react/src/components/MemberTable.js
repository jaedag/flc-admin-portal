import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ChurchContext } from '../contexts/ChurchContext'
import { MemberContext } from '../contexts/MemberContext'
import Spinner from './Spinner'

export const MemberTable = (props) => {
  const { memberData, memberError, memberLoading } = props
  const { setMemberID } = useContext(MemberContext)
  const { determineChurch } = useContext(ChurchContext)
  const history = useHistory()

  if (memberLoading || memberError) {
    return (
      <div className="container d-flex justify-content-center">
        <Spinner />
      </div>
    )
  } else if (!memberData) {
    return (
      <div className="container d-flex justify-content-center">
        <div>There does not seem to be any data to display for you</div>
      </div>
    )
  }

  return (
    // Web View Full Screen without filters applied
    <React.Fragment>
      <div className=" d-none d-lg-block">
        <div className="row no-gutters">
          {memberData.map((soul, index) => {
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
                    <img
                      className="card-img-top"
                      src={soul.pictureUrl}
                      alt=""
                    />
                  </div>
                  <p className="card-title text-center pt-2">
                    {soul.firstName + ' ' + soul.lastName}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="d-lg-none">
        {memberData.map((soul, index) => {
          return (
            <div
              key={index}
              className="card mobile-search-card p-2 py-3 my-4"
              onClick={() => {
                setMemberID(soul.id)
                localStorage.setItem('memberId', soul.id)
                history.push('/member/displaydetails')
                determineChurch(soul)
              }}
            >
              <div className="media">
                <img
                  className="mr-3 rounded-circle img-search"
                  src={`${soul.pictureUrl}`}
                  alt={`${soul.firstName} ${soul.lastName}`}
                />
                <div className="media-body">
                  <h5 className="mt-0">{`${soul.firstName} ${soul.lastName}`}</h5>
                  {soul.bacenta ? (
                    <div>
                      <span className="font-weight-bold">Bacenta:</span>{' '}
                      {soul.bacenta.name}{' '}
                    </div>
                  ) : null}
                  {soul.ministry && (
                    <div>
                      <span className="font-weight-bold">Ministry:</span>{' '}
                      {soul.ministry.name}{' '}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}
