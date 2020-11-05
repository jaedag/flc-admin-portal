import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { DISPLAY_CENTRE } from '../queries/DisplayQueries'
import { SontaContext } from '../context/ChurchContext'

export const DisplaySontaDetails = () => {
  const { sontaID } = useContext(SontaContext)

  const {
    data: sontaData,
    error: sontaError,
    loading: sontaLoading,
  } = useQuery(DISPLAY_CENTRE, {
    variables: { sontaID: sontaID },
  })
  console.log(sontaData)

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
      <DisplayChurchDetails
        name={sontaData.displayCentre.name}
        leaderTitle="Centre Leader"
        leaderName={`${sontaData.displayCentre.leader.firstName} ${sontaData.displayCentre.leader.lastName}`}
        membership={sontaData.centreMemberCount}
        churchHeading="No of Bacentas"
        churchNo="2"
        subChurch="Bacenta"
        subChurchSetter=""
        churchType="Centre"
        buttons={['']}
      />
    </div>
  )
}
