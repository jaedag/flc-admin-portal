import React from 'react'
import { Link } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { SideBar } from '../components/SideBar'
import { MemberTable } from '../components/MemberTable'

export const MembersGrid = () => {
  return (
    <div>
      <NavBar />
      <div className="row pt-5 w-100 m-0 ">
        <div className="col-lg-3 col-md-4 m-0 px-0">
          <SideBar />
        </div>

        <div className="col px-2">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2 mb-3 border-bottom">
            <h3 className="h3">Search Results</h3>
            <div className="btn-toolbar mb-2 mb-md-0 position-fixedd">
              <div className="btn-group mr-2">
                <div className="btn btn-sm btn-primary">
                  {/*<span>Import CSV</span>*/}
                  <input type="file" />
                </div>
              </div>
              <Link
                to="/members/addmember"
                type="button"
                className="btn btn-sm btn-primary"
              >
                Add Member
              </Link>
            </div>
          </div>
          <MemberTable />
        </div>
      </div>
    </div>
  )
}
