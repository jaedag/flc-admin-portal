import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NavBar } from './nav/NavBar'
import { SideBar } from './SideBar.jsx'
import { MemberTable } from './MemberTable.jsx'
import { ChurchContext } from '../contexts/ChurchContext'
import { memberFilter } from './member-filter-utils'
import { debounce } from '../global-utils'

export const MembersGrid = (props) => {
  const { memberData, memberError, memberLoading, title } = props
  const { filters } = useContext(ChurchContext)
  const [offset, setOffset] = useState(0)
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  let numberOfRecords = Math.round(
    ((dimensions.height - 96 - 30) * (0.75 * dimensions.width - 46)) /
      (160 * 126)
  )
  //NavBar takes 70px of the height and side bar takes 25% of the width
  const memberDataLoaded = memberData ? memberFilter(memberData, filters) : null

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
        <div className="col-3 d-none d-md-block">
          <SideBar />
        </div>

        <div className="col col-md-9 px-2">
          {title ? (
            <h3 className="text-center font-weight-bold mt-3 mb-0">{title}</h3>
          ) : null}
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2 border-bottom">
            <div>
              <h5>
                {memberData
                  ? `${memberDataLoaded.length} Search Results`
                  : 'Search Results'}
              </h5>
            </div>

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
