import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { CENTRE_BACENTA_LIST } from '../queries/ListQueries'
import { ChurchContext } from '../contexts/ChurchContext'

export const DisplayAllBacentas = () => {
  const { centreID, setBacentaID, setMemberID } = useContext(ChurchContext)

  const { data: bacentaData, loading: bacentaLoading } = useQuery(
    CENTRE_BACENTA_LIST,
    {
      variables: { centreID: centreID },
    }
  )
  if (bacentaLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (bacentaData) {
    return (
      <div>
        <NavBar />
        <div className="body-container container">
          <div className="mb-4">
            <h4>{`${bacentaData.centreBacentaList[0].centre.name} Centre`}</h4>
            <Link
              to="/member/displaydetails"
              onClick={() => {
                setMemberID(
                  `${bacentaData.centreBacentaList[0].centre.leader.memberID}`
                )
              }}
            >
              <h6 className="text-muted">
                Leader:
                {` ${bacentaData.centreBacentaList[0].centre.leader.firstName} ${bacentaData.centreBacentaList[0].centre.leader.lastName}`}
              </h6>
            </Link>
          </div>
          <DisplayChurchList
            data={bacentaData.centreBacentaList}
            setter={setBacentaID}
            churchType="Bacenta"
          />
        </div>
      </div>
    )
  } else {
    return <ErrorScreen />
  }
}
