import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { capitalise } from '../../global-utils'
import DisplayChurchDetails from '../../components/DisplayChurchDetails/DisplayChurchDetails'
import NavBar from '../../components/nav/NavBar'
import { DISPLAY_TOWN, DISPLAY_CAMPUS } from './ReadQueries'
import { ChurchContext } from '../../contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'

const DisplayCampusTownDetails = () => {
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
      loadingState={townLoading || campusLoading}
      errorState={townError || campusError}
      data={campusData && townData}
    >
      {church.church === 'town' && (
        <>
          <NavBar />
          <DisplayChurchDetails
            name={townData?.towns[0].name}
            leaderTitle={'Town CO'}
            membership={townData?.townMemberCount}
            leaderName={
              townData?.towns[0].leader
                ? `${townData?.towns[0].leader.firstName} ${townData?.towns[0].leader.lastName}`
                : null
            }
            leaderId={townData?.towns[0].leader?.id}
            churchHeading="Centres"
            church2Heading="Bacentas"
            churchCount={townData?.towns[0].centres.length}
            church2Count={townData?.townBacentaCount}
            admin={townData?.towns[0].admin}
            churchType={`${capitalise(church.church)}`}
            subChurch={`${capitalise(church.subChurch)}`}
            subChurchBasonta="Sonta"
            buttons={townData?.towns[0].centres}
            buttonsSecondRow={townData?.towns[0].sontas}
            editlink="/town/edittown"
            editPermitted={['adminBishop', 'adminFederal']}
            history={
              townData?.towns[0]?.history.length !== 0 &&
              townData?.towns[0]?.history
            }
            breadcrumb={[townData?.towns[0]?.bishop, townData?.towns[0]]}
          />
        </>
      )}
      {church.church === 'campus' && (
        <>
          <NavBar />
          <DisplayChurchDetails
            name={campusData?.campuses[0].name}
            leaderTitle={'Campus CO'}
            membership={campusData?.campusMemberCount}
            leaderName={
              campusData?.campuses[0].leader
                ? `${campusData?.campuses[0].leader.firstName} ${campusData?.campuses[0].leader.lastName}`
                : null
            }
            leaderId={campusData?.campuses[0].leader?.id}
            churchHeading="Centres"
            church2Heading="Bacentas"
            churchCount={campusData?.campuses[0].centres.length}
            church2Count={campusData?.campusBacentaCount}
            admin={campusData?.campuses[0].admin}
            churchType={`${capitalise(church.church)}`}
            subChurch={`${capitalise(church.subChurch)}`}
            subChurchBasonta="Sonta"
            buttons={campusData?.campuses[0].centres}
            buttonsSecondRow={campusData?.campuses[0].sontas}
            editlink="/campus/editcampus"
            editPermitted={['adminBishop', 'adminFederal']}
            history={
              campusData?.campuses[0]?.history.length !== 0 &&
              campusData?.campuses[0]?.history
            }
            breadcrumb={[
              campusData?.campuses[0]?.bishop,
              campusData?.campuses[0],
            ]}
          />
        </>
      )}
    </BaseComponent>
  )
}

export default DisplayCampusTownDetails
