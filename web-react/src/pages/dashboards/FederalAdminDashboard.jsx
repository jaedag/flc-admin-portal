import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { ChurchContext } from '../../contexts/ChurchContext'
import { GET_BISHOPS } from '../../queries/ListQueries'
import NavBar from '../../components/nav/NavBar'
import Spinner from '../../components/Spinner.jsx'
import Logo from '../../img/flc-logo-small.png'
import { MemberContext } from '../../contexts/MemberContext'
import TabletDesktopView from 'components/responsive-design/TabletDesktopView'
import MobileView from 'components/responsive-design/MobileView'
import LeaderPictureIcon from 'components/LeaderPictureIcon/LeaderPictureIcon'

const FederalAdminDashboard = () => {
  const { determineStream } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)
  const { data, loading } = useQuery(GET_BISHOPS)

  const history = useHistory()

  //Migrating to new Neo4jGraphQL Library
  if (loading) {
    return (
      <>
        <NavBar />
        <TabletDesktopView>
          <div className="container text-center my-5">
            <img
              src={Logo}
              alt="logo"
              className="img-fluid mx-auto"
              style={{ maxWidth: '30%' }}
            />
            <h3>FLC Admin Dashboard </h3>
            <h5 className="text-secondary">Loading...</h5>
            <div className="spinner-border-center full-center" role="status">
              <Spinner />
              <div className="sr-only">Loading...</div>
            </div>
          </div>
        </TabletDesktopView>

        <MobileView>
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center ">
              <div className="col-12 col-lg-6">
                <img
                  src={Logo}
                  alt="logo"
                  className="img-fluid mx-auto d-block "
                  style={{ maxWidth: '30%' }}
                />
                <div className="text-center">
                  <h3>FLC Admin Dashboard</h3>
                  <h5 className="text-secondary mt-5">Loading...</h5>
                  <div
                    className="spinner-border-center full-center mb-5"
                    role="status"
                  >
                    <Spinner />
                    <div className="sr-only">Loading...</div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 d-flex justify-content-center my-3 ">
                <div className=" flex-grow-1" />
              </div>
            </div>
          </div>
        </MobileView>
      </>
    )
  } else if (data) {
    return (
      <>
        <NavBar />

        <div className="container text-center my-3">
          <img
            src={Logo}
            alt="logo"
            className="img-fluid mx-auto"
            style={{ maxWidth: '30%' }}
          />

          <h3>FLC Admin Dashboard </h3>
          <h4>{`Hi There ${currentUser.firstName}`}</h4>
          <h5 className="text-secondary">Select a Bishop</h5>
        </div>
        <div className="row row-cols-sm-1 row-cols-lg-4 d-flex justify-content-center px-5">
          {data.members.map((bishop, index) => {
            let bishopStream
            if (bishop.isBishopForTown?.length) {
              bishopStream = 'Town'
            } else if (bishop.isBishopForCampus?.length) {
              bishopStream = 'Campus'
            }

            return (
              <div
                key={index}
                className="col-sm-12 col-lg card mobile-search-card p-2 m-1"
                onClick={() => {
                  determineStream(bishop)
                  history.push('/dashboard')
                }}
              >
                <div className="media">
                  <LeaderPictureIcon member={bishop} />
                  <div className="media-body">
                    <h5 className="mt-0">{`${bishop.firstName} ${bishop.lastName}`}</h5>
                    <div>
                      <span className="text-muted">{bishopStream}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </>
    )
  } else {
    return (
      <div className="container body-container">
        {/* <!--Web Logo and text--> */}
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-12 col-lg-6 justify-content-center">
            {`There seems to be an issue with your login credentials. Please contact the system administrator for more details`}
            <Spinner />
          </div>
        </div>
      </div>
    )
  }
}

export default FederalAdminDashboard
