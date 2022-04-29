import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import DisplayChurchDetails from '../../../components/DisplayChurchDetails/DisplayChurchDetails'

import { DISPLAY_BACENTA } from './ReadQueries'
import { ChurchContext } from '../../../contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import { permitArrivals } from 'permission-utils'

const DetailsBacenta = () => {
  const { bacentaId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_BACENTA, {
    variables: { id: bacentaId },
  })

  const bacenta = data?.bacentas[0]

  let breadcrumb = [
    bacenta?.constituency.council,
    bacenta?.constituency,
    bacenta,
  ]

  const details = [
    {
      title: 'Grad. Status',
      number: bacenta?.graduationStatus,
      link: `#`,
      width: 'auto',
    },
    {
      title: 'Status',
      number: bacenta?.vacationStatus,
      link: '#',
      width: 'auto',
    },
    {
      title: 'Target',
      number: bacenta?.target,
      link: '#',
      width: 'auto',
    },
    {
      title: 'Normal Bussing Top Up',
      number: bacenta?.normalBussingTopUp,
      link: `#`,
      width: 'auto',
    },
    {
      title: 'Swell Bussing Top Up',
      number: bacenta?.swellBussingTopUp,
      link: `#`,
      width: 'auto',
    },
    {
      title: 'Momo Number',
      number: bacenta?.momoNumber || '-',
      link: `#`,
      width: 'auto',
    },
  ]

  if (!bacenta?.normalBussingTopUp && !bacenta?.swellBussingTopUp) {
    details.pop()
  }

  return (
    <BaseComponent loading={loading} error={error} data={data} placeholder>
      <DisplayChurchDetails
        details={details}
        loading={loading}
        church={bacenta}
        momoNumber={bacenta?.momoNumber}
        name={bacenta?.name}
        leaderTitle="Bacenta Leader"
        leader={bacenta?.leader}
        churchId={bacentaId}
        churchHeading="Fellowships"
        churchType="Bacenta"
        subChurch="Fellowship"
        membership={bacenta?.memberCount}
        churchCount={bacenta?.fellowships.length}
        editlink="/bacenta/editbacenta"
        editPermitted={permitArrivals('Constituency')}
        history={bacenta?.history.length !== 0 && bacenta?.history}
        breadcrumb={breadcrumb && breadcrumb}
        buttons={bacenta ? bacenta?.fellowships : []}
      />
    </BaseComponent>
  )
}

export default DetailsBacenta
