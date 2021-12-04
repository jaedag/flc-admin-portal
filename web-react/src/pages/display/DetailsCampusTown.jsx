import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { capitalise } from '../../global-utils'
import DisplayChurchDetails from '../../components/DisplayChurchDetails/DisplayChurchDetails'

import { DISPLAY_TOWN, DISPLAY_CAMPUS } from './ReadQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'

const DetailsCampusTown = () => {
  const { church, townId, campusId } = useContext(ChurchContext)

  const { data: townData, loading: townLoading, error: townError } = useQuery(
    DISPLAY_TOWN,
    {
      variables: { id: townId },
    }
  )

  const {
    data: campusData,
    loading: campusLoading,
    error: campusError,
  } = useQuery(DISPLAY_CAMPUS, {
    variables: { id: campusId },
  })

  return (
    <BaseComponent
      loading={townLoading || campusLoading}
      error={townError || campusError}
      data={campusData && townData}
    >
      {church.church === 'town' && (
        <>
          <DisplayChurchDetails
            name={townData?.towns[0].name}
            leaderTitle={'Town CO'}
            membership={townData?.towns[0].memberCount}
            leader={townData?.towns[0].leader}
            churchId={townId}
            churchHeading="Centres"
            church2Heading="Bacentas"
            churchCount={townData?.towns[0].centres.length}
            church2Count={townData?.towns[0].bacentaCount}
            admin={townData?.towns[0].admin}
            churchType={`${capitalise(church.church)}`}
            subChurch={`${capitalise(church.subChurch)}`}
            subChurchBasonta="Sonta"
            buttons={townData?.towns[0].centres}
            buttonsSecondRow={townData?.towns[0].sontas}
            editlink="/town/edittown"
            editPermitted={['adminCouncil', 'adminFederal']}
            history={
              townData?.towns[0]?.history.length !== 0 &&
              townData?.towns[0]?.history
            }
            breadcrumb={[townData?.towns[0]?.council, townData?.towns[0]]}
          />
        </>
      )}
      {church.church === 'campus' && (
        <>
          <DisplayChurchDetails
            name={campusData?.campuses[0].name}
            leaderTitle={'Campus CO'}
            membership={campusData?.campuses[0].memberCount}
            churchId={campusId}
            leader={campusData?.campuses[0].leader}
            churchHeading="Centres"
            church2Heading="Bacentas"
            churchCount={campusData?.campuses[0].centres.length}
            church2Count={campusData?.campuses[0].bacentaCount}
            admin={campusData?.campuses[0].admin}
            churchType={`${capitalise(church.church)}`}
            subChurch={`${capitalise(church.subChurch)}`}
            subChurchBasonta="Sonta"
            buttons={campusData?.campuses[0].centres}
            buttonsSecondRow={campusData?.campuses[0].sontas}
            editlink="/campus/editcampus"
            editPermitted={['adminCouncil', 'adminFederal']}
            history={
              campusData?.campuses[0]?.history.length !== 0 &&
              campusData?.campuses[0]?.history
            }
            breadcrumb={[
              campusData?.campuses[0]?.council,
              campusData?.campuses[0],
            ]}
          />
        </>
      )}
    </BaseComponent>
  )
}

export default DetailsCampusTown
