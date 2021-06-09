import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { memberFilter } from './member-filter-utils'
import { ChurchContext } from '../contexts/ChurchContext'
import Spinner from './Spinner.jsx'
import { GET_BISHOP_MEMBERS } from '../queries/GridQueries'
import userIcon from '../img/user.png'
import NavBar from './nav/NavBar'

const MemberTableMobile = () => {
  const { filters, bishopId } = useContext(ChurchContext)
  const [offset, setOffset] = useState(0)

  let numberOfRecords = 10
  const {
    data: memberData,
    error: memberError,
    loading: memberLoading,
  } = useQuery(GET_BISHOP_MEMBERS, {
    variables: { id: bishopId },
  })

  const memberDataLoaded = memberData
    ? memberFilter(memberData?.bishopMemberList, filters)
    : null

  const { clickCard } = useContext(ChurchContext)
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
    <>
      <NavBar />
      <div className="col px-2">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2 border-bottom">
          <h3 className="h3">
            {memberData
              ? `${memberDataLoaded.length} Search Results`
              : 'SearchResults'}
          </h3>

          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2" />
            <Link to="/member/addmember" className="btn btn-primary p-2 mx-1">
              Add Member
            </Link>
            <button
              className="btn btn-primary p-2 mx-1"
              onClick={async () => {
                setOffset(offset ? offset - numberOfRecords : 0)
              }}
            >
              <i className="fas fa-chevron-left" /> Back
            </button>
            <button
              className="btn btn-primary p-2 mx-1"
              onClick={async () => {
                setOffset(
                  offset + numberOfRecords > memberDataLoaded.length
                    ? offset
                    : offset + numberOfRecords
                )
              }}
            >
              Next <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>
        <div>
          <small className="text-secondary">
            {memberDataLoaded &&
              `Page ${offset / numberOfRecords + 1} of ${
                memberDataLoaded &&
                Math.ceil(memberDataLoaded?.length / numberOfRecords)
              }`}
          </small>
        </div>

        <div className="d-lg-none ">
          {memberDataLoaded.map((soul, index) => {
            if (index < offset) {
              return null
            } else if (index >= offset + numberOfRecords) {
              return null
            }
            return (
              <div
                key={index}
                className="card mobile-search-card fade-in p-2 py-3 my-4"
                onClick={() => {
                  clickCard(soul)
                  history.push('/member/displaydetails')
                }}
              >
                <div className="media">
                  <img
                    className="mr-3 rounded-circle img-search"
                    src={soul.pictureUrl ? soul.pictureUrl : userIcon}
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
      </div>
    </>
    /* Mobile View */
  )
}

export default MemberTableMobile
