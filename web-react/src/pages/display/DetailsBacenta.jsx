import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../components/DisplayChurchDetails/DisplayChurchDetails'
import NavBar from '../../components/nav/NavBar'
import { DISPLAY_BACENTA } from './ReadQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'

const DisplayBacentaDetails = () => {
  const { bacentaId } = useContext(ChurchContext)

  const {
    data: bacentaData,
    loading: bacentaLoading,
    error: bacentaError,
  } = useQuery(DISPLAY_BACENTA, {
    variables: { id: bacentaId },
  })
  const bacenta = bacentaData?.bacentas[0]

  let breadcrumb = [
    bacenta?.centre?.town?.bishop ?? bacenta?.centre?.campus?.bishop,
    bacenta?.centre?.town ? bacenta?.centre?.town : bacenta?.centre?.campus,
    bacenta?.centre,
    bacenta,
  ]
  if (!bacenta?.centre) {
    breadcrumb = [bacenta]
  }

  return (
    <BaseComponent loadingState={bacentaLoading} errorState={bacentaError}>
      <NavBar />
      <DisplayChurchDetails
        name={bacenta?.name}
        leaderTitle="Bacenta Leader"
        leaderName={
          bacenta?.leader
            ? `${bacenta.leader.firstName} ${bacenta.leader.lastName}`
            : '-'
        }
        leaderId={bacenta?.leader?.id}
        membership={bacentaData?.bacentaMemberCount}
        churchHeading="Meeting Day"
        churchNo={bacenta?.meetingDay?.day}
        churchType="Bacenta"
        buttons={['']}
        editlink="/bacenta/editbacenta"
        editPermitted={[
          'leaderBacenta',
          'leaderCentre',
          'leaderCampus',
          'leaderTown',
          'adminCampus',
          'adminTown',
          'adminBishop',
          'adminFederal',
        ]}
        history={bacenta?.history.length !== 0 && bacenta?.history}
        breadcrumb={breadcrumb && breadcrumb}
      />
    </BaseComponent>
  )
}

export default DisplayBacentaDetails
