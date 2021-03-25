import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { NavBar } from '../components/NavBar'
import { SideBar } from '../components/SideBar'
import { MemberTable } from '../components/MemberTable'
import { GET_BISHOP_MEMBERS } from '../queries/ListQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const MembersGridBishop = () => {
  const { memberFilter, filters, bishopId } = useContext(ChurchContext)
  const [offset, setOffset] = useState(0)
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  const {
    data: memberData,
    error: memberError,
    loading: memberLoading,
  } = useQuery(GET_BISHOP_MEMBERS, {
    variables: { id: bishopId },
  })

  let numberOfRecords = Math.round(
    ((dimensions.height - 96 - 30) * (0.75 * dimensions.width - 46)) /
      (160 * 126)
  )
  //Navbar takes 70px of the height and side bar takes 25% of the width
  const memberDataLoaded = memberData
    ? memberFilter(memberData?.bishopMemberList, filters)
    : null

  //debouncing function
  function debounce(fn, ms) {
    let timer
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    }
  }

  // console.log(numberOfRecords)
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }, 500)

    window.addEventListener('resize', debouncedHandleResize)
    // console.log(dimensions)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  return (
    <div>
      <NavBar />
      <div className="row w-100 m-0">
        <div className="d-none d-md-block col-lg-3 col-md-4 m-0 px-0">
          <SideBar />
        </div>

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

          <MemberTable
            memberData={memberDataLoaded}
            memberError={memberError}
            memberLoading={memberLoading}
            offset={offset}
            numberOfRecords={numberOfRecords}
          />
        </div>
      </div>
    </div>
  )
}
