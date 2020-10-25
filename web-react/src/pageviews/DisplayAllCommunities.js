import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { GET_COMMUNITIES } from '../queries/DropDownQueries'
import { TownContext } from '../context/ChurchContext'
import { CommunityContext } from '../context/ChurchContext'
import { MemberContext } from '../context/MemberContext'

export const DisplayAllCommunities = () => {
  const { townID } = useContext(TownContext)
  const { setCommunityID } = useContext(CommunityContext)
  const { setMemberID } = useContext(MemberContext)

  const {
    data: communityData,
    error: communityError,
    loading: communityLoading,
  } = useQuery(GET_COMMUNITIES, {
    variables: { townID: townID },
  })

  if (communityError) {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container full-body-center">
          <p className="text-center full-center">
            There seems to be an error loading data
          </p>
        </div>
      </React.Fragment>
    )
  } else if (communityLoading) {
    // Spinner Icon for Loading Screens
    return (
      <React.Fragment>
        <NavBar />
        <SpinnerPage />
      </React.Fragment>
    )
  }

  return (
    <div>
      <NavBar />
      <div className="body-container container">
        <div className="mb-4 border-bottom">
          <div className="row justify-content-between">
            <div className="col-auto">
              <Link
                to="/members/displaydetails"
                onClick={() => {
                  setMemberID(
                    `${communityData.communityList[0].town.leader.memberID}`
                  )
                }}
              >
                <h4>{`${communityData.communityList[0].town.name} Town`}</h4>
              </Link>{' '}
            </div>
            <div className="col-auto">
              <Link
                to="/community/addcommunity"
                className="btn btn-primary text-nowrap"
              >
                Add Community
              </Link>
            </div>
            <div className="col">
              <h6 className="text-muted">
                Community Leader:
                {` ${communityData.communityList[0].town.leader.firstName} ${communityData.communityList[0].town.leader.lastName}`}
              </h6>
            </div>
          </div>
          <div className="row justify-content-start">
            <div className="py-1 px-2 m-2 card">{`Communities: ${communityData.communityList.length}`}</div>
            <div className="py-1 px-2 m-2 card">{`Sontas: ${communityData.communityList[0].town.sontas.length}`}</div>
            <div className="py-1 px-2 m-2 card">{`Membership:`}</div>
          </div>
        </div>

        <DisplayChurchList
          data={communityData.communityList}
          setter={setCommunityID}
          churchType="Community"
        />
      </div>
    </div>
  )
}
