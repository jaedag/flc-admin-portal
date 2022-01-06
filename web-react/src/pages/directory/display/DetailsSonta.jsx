import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../../components/DisplayChurchDetails/DisplayChurchDetails'

import { DISPLAY_SONTA } from './ReadQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'

const DetailsSonta = () => {
  const { sontaId } = useContext(ChurchContext)

  const {
    data: sontaData,
    loading: sontaLoading,
    error: sontaError,
  } = useQuery(DISPLAY_SONTA, {
    variables: { id: sontaId },
  })

  let breadcrumb

  breadcrumb = [
    sontaData?.sontas[0].constituency?.council,
    sontaData?.sontas[0].constituency,
    sontaData?.sontas[0],
  ]

  return (
    <BaseComponent loading={sontaLoading} error={sontaError} data={sontaData}>
      <DisplayChurchDetails
        loading={sontaLoading}
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
          'leaderConstituency',
          'adminConstituency',
          'adminCouncil',
          'adminGatheringService',
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

export default DetailsSonta
