import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MemberTable from '../members-grids/MemberTable'
import { memberFilter } from './member-filter-utils'
import { debounce } from '../../global-utils'
import { ChurchContext } from 'contexts/ChurchContext'
import PlaceholderCustom from 'components/Placeholder.jsx'

const MembersGrid = (props) => {
  const { memberData, memberError, memberLoading, title } = props
  const { filters } = useContext(ChurchContext)
  const [dimensions, setDimensions] = useState({
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
    <div className="col col-md-9 rest-of-screen p-0">
      <PlaceholderCustom loading={!title}>
        <h3 className="text-center font-weight-bold mb-0">{title}</h3>
      </PlaceholderCustom>
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

          <Link to="/member/addmember" className="btn btn-primary">
            Add New Member
          </Link>
          <p>Filters</p>
        </div>

        <MemberTable
          memberData={memberDataLoaded}
          memberError={memberError}
          memberLoading={memberLoading}
          numberOfRecords={numberOfRecords}
        />
      </div>
    </div>
  )
}

export default MembersGrid
