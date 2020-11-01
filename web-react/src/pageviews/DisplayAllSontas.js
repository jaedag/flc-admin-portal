import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { GET_SONTAS } from '../queries/ListQueries'
import { TownContext, SontaContext } from '../context/ChurchContext'
import { MemberContext } from '../context/MemberContext'

export const DisplayAllSontas = () => {
  const { townID } = useContext(TownContext)
  const { setSontaID } = useContext(SontaContext)
  const { setMemberID } = useContext(MemberContext)

  const {
    data: sontaData,
    error: sontaError,
    loading: sontaLoading,
  } = useQuery(GET_SONTAS, {
    variables: { townID: townID },
  })

  if (sontaError) {
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
  } else if (sontaLoading) {
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
        <div className="mb-4">
          <h4>{`${sontaData.townSontaList[0].town.name} Sontas`}</h4>
          <Link
            to="/members/displaydetails"
            onClick={() => {
              setMemberID(`${sontaData.townSontaList[0].town.leader.memberID}`)
            }}
          >
            <h6 className="text-muted">
              Leader:
              {` ${sontaData.townSontaList[0].town.leader.firstName} ${sontaData.townSontaList[0].town.leader.lastName}`}
            </h6>
          </Link>
        </div>
        <DisplayChurchList
          data={sontaData.townSontaList}
          setter={setSontaID}
          churchType="Sonta"
        />
      </div>
    </div>
  )
}
