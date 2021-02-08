import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { GET_BACENTAS } from '../queries/ListQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const DisplayAllBacentas = () => {
  const { centreID, setBacentaID, setMemberID } = useContext(ChurchContext)

  const {
    data: bacentaData,
    error: bacentaError,
    loading: bacentaLoading,
  } = useQuery(GET_BACENTAS, {
    variables: { centreID: centreID },
  })

  if (bacentaData) {
    return (
      <div>
        <NavBar />
        <div className="body-container container">
          <div className="mb-4">
            <h4>{`${bacentaData.bacentaList[0].centre.name} Centre`}</h4>
            <Link
              to="/member/displaydetails"
              onClick={() => {
                setMemberID(
                  `${bacentaData.bacentaList[0].centre.leader.memberID}`
                )
              }}
            >
              <h6 className="text-muted">
                Leader:
                {` ${bacentaData.bacentaList[0].centre.leader.firstName} ${bacentaData.bacentaList[0].centre.leader.lastName}`}
              </h6>
            </Link>
          </div>
          <DisplayChurchList
            data={bacentaData.bacentaList}
            setter={setBacentaID}
            churchType="Bacenta"
          />
        </div>
      </div>
    )
  } else if (bacentaError) {
    return <ErrorScreen />
  } else if (bacentaLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  }
}
