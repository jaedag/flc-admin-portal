import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { GET_CENTRES } from '../queries/ListQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const DisplayAllCentres = () => {
  const { townID, setCentreID, setMemberID } = useContext(ChurchContext)

  const {
    data: centreData,
    error: centreError,
    loading: centreLoading,
  } = useQuery(GET_CENTRES, {
    variables: { townID: townID },
  })

  if (centreError) {
    return <ErrorScreen />
  } else if (centreLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
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
                    `${centreData.centreList[0].town.leader.memberID}`
                  )
                }}
              >
                <h4>{`${centreData.centreList[0].town.name} Town`}</h4>
              </Link>{' '}
            </div>
            <div className="col-auto">
              <Link
                to="/centre/addcentre"
                className="btn btn-primary text-nowrap"
              >
                Add Centre
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h6 className="text-muted">
                Centre Leader:
                {centreData.centreList[0].town.leader
                  ? ` ${centreData.centreList[0].town.leader.firstName} ${centreData.centreList[0].town.leader.lastName}`
                  : null}
              </h6>
            </div>
          </div>

          <div className="row justify-content-between">
            <div className="py-1 px-2 m-2 card">{`Centres: ${centreData.centreList.length}`}</div>
            <div className="py-1 px-2 m-2 card">{`Sontas: ${centreData.centreList[0].town.sontas.length}`}</div>
            <div className="py-1 px-2 m-2 card">{`Membership:`}</div>
          </div>
        </div>

        <DisplayChurchList
          data={centreData.centreList}
          setter={setCentreID}
          churchType="Centre"
        />
      </div>
    </div>
  )
}
