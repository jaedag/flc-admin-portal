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
  const getWeekNumber = (date) => {
    const currentdate = date ? new Date(date) : new Date()
    const oneJan = new Date(currentdate.getFullYear(), 0, 1)
    const adjustedForMonday = 8 - oneJan.getDay() //Checking the number of days till Monday when the week starts
    oneJan.setDate(oneJan.getDate() + adjustedForMonday)
    const numberOfDays = Math.floor(
      (currentdate - oneJan) / (24 * 60 * 60 * 1000)
    )

    const result = Math.ceil(numberOfDays / 7)

    return result
  }

  const latestServiceWeek =
    bacentaData?.bacentas[0]?.services[0]?.serviceRecords[0]?.week

  return (
    <BaseComponent
      loadingState={bacentaLoading}
      errorState={bacentaError}
      data={bacentaData}
    >
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
        churchCount={bacenta?.meetingDay?.day}
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
        alreadyFilled={latestServiceWeek === getWeekNumber()}
        history={bacenta?.history.length !== 0 && bacenta?.history}
        breadcrumb={breadcrumb && breadcrumb}
      />
    </BaseComponent>
  )
}

export default DisplayBacentaDetails
