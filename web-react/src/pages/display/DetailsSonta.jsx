import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../components/DisplayChurchDetails/DisplayChurchDetails'
import NavBar from '../../components/nav/NavBar'
import { DISPLAY_SONTA } from './ReadQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'

const DisplaySontaDetails = () => {
  const { sontaId, church } = useContext(ChurchContext)

  const {
    data: sontaData,
    loading: sontaLoading,
    error: sontaError,
  } = useQuery(DISPLAY_SONTA, {
    variables: { id: sontaId },
  })

  let breadcrumb
  if (church.church === 'town') {
    breadcrumb = [
      sontaData?.sontas[0].town?.bishop,
      sontaData?.sontas[0].town,
      sontaData?.sontas[0],
    ]
  }
  if (church.church === 'campus') {
    breadcrumb = [
      sontaData?.sontas[0].campus?.bishop,
      sontaData?.sontas[0].campus,
      sontaData?.sontas[0],
    ]
  }

  return (
    <BaseComponent
      loadingState={sontaLoading}
      errorState={sontaError}
      data={sontaData}
    >
      <NavBar />
      <DisplayChurchDetails
        name={sontaData?.sontas[0]?.name}
        leaderTitle="Sonta Leader"
        leaderName={sontaData?.sontas[0]?.leader?.fullName}
        leaderId={sontaData?.sontas[0]?.leader?.id}
        churchHeading="No of Basonta Leaders"
        churchType="Sonta"
        subChurch="Basonta Leaders"
        membership={sontaData?.sontaMemberCount}
        churchNo={sontaData?.sontaBasontaLeaderList.length}
        editlink="/sonta/editsonta"
        editPermitted={[
          'leaderSonta',
          'leaderCampus',
          'leaderTown',
          'adminCampus',
          'adminTown',
          'adminBishop',
          'adminFederal',
        ]}
        history={
          sontaData?.sontas[0]?.history.length !== 0 &&
          sontaData?.sontas[0]?.history
        }
        breadcrumb={breadcrumb}
        buttons={['']}
        basontaLeaders={sontaData?.sontaBasontaLeaderList}
      />
    </BaseComponent>
  )
}

export default DisplaySontaDetails
