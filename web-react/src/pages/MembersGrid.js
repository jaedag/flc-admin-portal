import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { NavBar } from '../components/NavBar'
import { SideBar } from '../components/SideBar'
import { MemberTable } from '../components/MemberTable'
import { GET_BISHOP_MEMBERS } from '../queries/ListQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const MembersGridBishop = () => {
  const { memberFilter, filters, bishopID } = useContext(ChurchContext)
  const [offset, setOffset] = useState(0)
  const {
    data: memberData,
    error: memberError,
    loading: memberLoading,
    fetchMore,
  } = useQuery(GET_BISHOP_MEMBERS, {
    variables: { id: bishopID, offset: offset },
  })

  const memberDataLoaded = memberData
    ? memberFilter(memberData?.bishopMemberList, filters)
    : null

  return (
    <div>
      <NavBar />
      <div className="row w-100 m-0">
        <div className="col-lg-3 col-md-4 m-0 px-0">
          <SideBar />
        </div>

        <div className="col px-2">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2 mb-3 border-bottom">
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
                  setOffset(offset ? offset - 24 : null)
                  await fetchMore({
                    variables: {
                      offset: offset,
                    },
                  })
                }}
              >
                <i className="fas fa-chevron-left" /> Back
              </button>
              <button
                className="btn btn-primary p-2 mx-1"
                onClick={async () => {
                  setOffset(offset + 24)
                  await fetchMore({
                    variables: {
                      offset: offset,
                    },
                  })
                }}
              >
                Next <i className="fas fa-chevron-right" />
              </button>
            </div>
          </div>
          <MemberTable
            memberData={memberDataLoaded}
            memberError={memberError}
            memberLoading={memberLoading}
          />
        </div>
      </div>
    </div>
  )
}
