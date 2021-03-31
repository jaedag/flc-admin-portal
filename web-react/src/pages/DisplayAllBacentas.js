import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { GET_CENTRE_BACENTAS } from '../queries/ListQueries'
import { ChurchContext } from '../contexts/ChurchContext'
import { MemberContext } from '../contexts/MemberContext'

export const DisplayAllBacentas = () => {
  const { centreId, setBacentaId } = useContext(ChurchContext)
  const { setMemberID } = useContext(MemberContext)

  const { data: bacentaData, loading: bacentaLoading } = useQuery(
    GET_CENTRE_BACENTAS,
    {
      variables: { id: centreId },
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
                  `${bacentaData.centreBacentaList[0].centre.leader.id}`
                )
              }}
            >
              <h6 className="text-muted">
                Leader:
                {bacentaData.centreBacentaList[0].centre.leader
                  ? ` ${bacentaData.centreBacentaList[0].centre.leader.firstName} ${bacentaData.centreBacentaList[0].centre.leader.lastName}`
                  : null}
              </h6>
            </Link>
          </div>
          <DisplayChurchList
            data={bacentaData.centreBacentaList}
            setter={setBacentaId}
            churchType="Bacenta"
          />
        </div>
      </div>
    )
  } else {
    return <ErrorScreen />
  }
}
