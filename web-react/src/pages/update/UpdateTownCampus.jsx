import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, capitalise, throwErrorMsg } from '../../global-utils'
import {
  GET_COUNCIL_TOWNS,
  GET_COUNCIL_CAMPUSES,
} from '../../queries/ListQueries'
import {
  UPDATE_TOWN_MUTATION,
  UPDATE_CAMPUS_MUTATION,
  ADD_TOWN_COUNCIL,
  REMOVE_TOWN_COUNCIL,
  ADD_CAMPUS_COUNCIL,
  REMOVE_CAMPUS_COUNCIL,
  REMOVE_CENTRE_CAMPUS,
  REMOVE_CENTRE_TOWN,
  ADD_CAMPUS_CENTRES,
  ADD_TOWN_CENTRES,
} from './UpdateMutations'
import { ChurchContext } from '../../contexts/ChurchContext'
import { DISPLAY_CAMPUS, DISPLAY_TOWN } from '../display/ReadQueries'
import { LOG_CAMPUSTOWN_HISTORY, LOG_CENTRE_HISTORY } from './LogMutations'
import { MAKE_CAMPUS_LEADER, MAKE_TOWN_LEADER } from './ChangeLeaderMutations'
import CampusTownForm from 'components/reusable-forms/CampusTownForm'

const UpdateTownCampus = () => {
  const { church, campusId, townId, setCouncilId } = useContext(ChurchContext)
  const { data: campusData, loading: campusLoading } = useQuery(
    DISPLAY_CAMPUS,
    {
      variables: { id: campusId },
    }
  )

  const { data: townData, loading: townLoading } = useQuery(DISPLAY_TOWN, {
    variables: { id: townId },
  })

  const history = useHistory()
  const campusTownData =
    church.church === 'campus' ? campusData?.campuses[0] : townData?.towns[0]

  const initialValues = {
    campusTownName: campusTownData?.name,
    leaderName: campusTownData?.leader?.fullName ?? '',
    leaderId: campusTownData?.leader?.id || '',
    councilSelect: campusTownData?.council?.id ?? '',
    centres: campusTownData?.centres?.length ? campusTownData.centres : [''],
  }

  const [LogCampusTownHistory] = useMutation(LOG_CAMPUSTOWN_HISTORY, {
    refetchQueries: [
      { query: DISPLAY_CAMPUS, variables: { id: campusId } },
      { query: DISPLAY_TOWN, variables: { id: townId } },
    ],
  })
  const [LogCentreHistory] = useMutation(LOG_CENTRE_HISTORY, {
    refetchQueries: [
      { query: DISPLAY_CAMPUS, variables: { id: campusId } },
      { query: DISPLAY_TOWN, variables: { id: townId } },
    ],
  })

  const [MakeTownLeader] = useMutation(MAKE_TOWN_LEADER)
  const [UpdateTown] = useMutation(UPDATE_TOWN_MUTATION, {
    refetchQueries: [
      {
        query: GET_COUNCIL_TOWNS,
        variables: { id: initialValues.council },
      },
    ],
  })

  const [MakeCampusLeader] = useMutation(MAKE_CAMPUS_LEADER)
  const [UpdateCampus] = useMutation(UPDATE_CAMPUS_MUTATION, {
    refetchQueries: [
      {
        query: GET_COUNCIL_CAMPUSES,
        variables: { id: initialValues.council },
      },
    ],
  })

  //Changes downwards. ie. Centre Changes underneath CampusTown
  const [AddCampusCentres] = useMutation(ADD_CAMPUS_CENTRES)
  const [AddTownCentres] = useMutation(ADD_TOWN_CENTRES)
  const [RemoveCentreCampus] = useMutation(REMOVE_CENTRE_CAMPUS, {
    onCompleted: (data) => {
      if (church.church === 'town') {
        return
      }
      const prevCampus = data.updateCampuses.campuses[0]
      const centre = data.updateCentres.centres[0]
      let newCampusId = ''
      let oldCampusId = ''
      let historyRecord

      if (prevCampus?.id === campusId) {
        //Centre has previous campus which is current campus and is going
        oldCampusId = campusId
        newCampusId = ''
        historyRecord = `${centre.name} Centre has been closed down under ${initialValues.campusTownName} Campus`
      } else if (prevCampus.id !== campusId) {
        //Centre has previous campus which is not current campus and is joining
        oldCampusId = prevCampus.id
        newCampusId = campusId
        historyRecord = `${centre.name} Centre has been moved to ${initialValues.campusTownName} Campus from ${prevCampus.name} Campus`
      }

      //After removing the centre from a campus, then you log that change.
      LogCentreHistory({
        variables: {
          centreId: centre.id,
          newLeaderId: '',
          oldLeaderId: '',
          newCampusTownId: newCampusId,
          oldCampusTownId: oldCampusId,
          historyRecord: historyRecord,
        },
      })
    },
  })
  const [RemoveCentreTown] = useMutation(REMOVE_CENTRE_TOWN, {
    onCompleted: (data) => {
      if (church.church === 'campus') {
        return
      }
      const prevTown = data.updateTowns.towns[0]
      const centre = data.updateCentres.centres[0]
      let newTownId = ''
      let oldTownId = ''
      let historyRecord

      if (prevTown.id === townId) {
        //Centre has previous town which is current town and is going
        oldTownId = townId
        newTownId = ''
        historyRecord = `${centre.name} Centre has been closed down under ${initialValues.campusTownName} Town`
      } else if (prevTown.id !== townId) {
        //Centre has previous town which is not current town and is joining
        oldTownId = prevTown.id
        newTownId = townId
        historyRecord = `${centre.name} Centre has been moved to ${initialValues.campusTownName} Town from ${prevTown.name} Town`
      }

      //After removing the centre from a town, then you log that change.
      LogCentreHistory({
        variables: {
          centreId: centre.id,
          newLeaderId: '',
          oldLeaderId: '',
          newCampusTownId: newTownId,
          oldCampusTownId: oldTownId,
          historyRecord: historyRecord,
        },
      })
    },
  })

  //Changes upwards. it. Changes to the Council the Campus Town is under
  const [RemoveCampusCouncil] = useMutation(REMOVE_CAMPUS_COUNCIL)
  const [RemoveTownCouncil] = useMutation(REMOVE_TOWN_COUNCIL)
  const [AddCampusCouncil] = useMutation(ADD_CAMPUS_COUNCIL, {
    onCompleted: (data) => {
      if (!campusTownData?.council.name) {
        //If There is no old Council
        let recordIfNoOldCouncil = `${initialValues.campusTownName} Campus has been moved to ${data.updateCampuses.campuses[0].council.name} Council`

        LogCampusTownHistory({
          variables: {
            campusTownId: campusId,
            newLeaderId: '',
            oldLeaderId: '',
            newCouncilId: data.updateCampuses.campuses[0].council.id,
            oldCouncilId: campusTownData?.council.id,
            historyRecord: recordIfNoOldCouncil,
          },
        })
      } else {
        //If there is an old Council

        //Break Link to the Old Council
        RemoveCampusCouncil({
          variables: {
            councilId: initialValues.council,
            campusId: campusId,
          },
        })

        let recordIfOldCouncil = `${initialValues.campusTownName} Campus has been moved from ${campusTownData?.council.name} Council to ${data.updateCampuses.campuses[0].council.name} Council`

        //After Adding the campus to a council, then you log that change.
        LogCampusTownHistory({
          variables: {
            campusTownId: campusId,
            newLeaderId: '',
            oldLeaderId: '',
            newCouncilId: data.updateCampuses.campuses[0].council.id,
            oldCouncilId: campusTownData?.council.id,
            historyRecord: recordIfOldCouncil,
          },
        })
      }
    },
  })
  const [AddTownCouncil] = useMutation(ADD_TOWN_COUNCIL, {
    onCompleted: (data) => {
      const oldCouncil = campusTownData?.council
      const newCouncil = data.updateTowns.towns[0].council

      if (!campusTownData?.council.id) {
        //If There is no old Council
        let recordIfNoOldCouncil = `${initialValues.campusTownName} Town has been moved to ${newCouncil.name} Council`

        LogCampusTownHistory({
          variables: {
            campusTownId: townId,
            newLeaderId: '',
            oldLeaderId: '',
            newCouncilId: newCouncil.id,
            oldCouncilId: oldCouncil.id,
            historyRecord: recordIfNoOldCouncil,
          },
        })
      } else {
        //If there is an old Council

        //Break Link to the Old Council
        RemoveTownCouncil({
          variables: {
            councilId: oldCouncil.id,
            townId: townId,
          },
        })

        let recordIfOldCouncil = `${initialValues.campusTownName} Town has been moved from ${oldCouncil.name} Council to ${newCouncil.name} Council`

        //After Adding the campus to a council, then you log that change.
        LogCampusTownHistory({
          variables: {
            campusTownId: townId,
            newLeaderId: '',
            oldLeaderId: '',
            newCouncilId: newCouncil.id,
            oldCouncilId: oldCouncil.id,
            historyRecord: recordIfOldCouncil,
          },
        })
      }
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    setCouncilId(values.council)

    if (church.church === 'campus') {
      UpdateCampus({
        variables: {
          campusId: campusId,
          campusName: values.campusTownName,
          councilId: values.council,
        },
      })

      //Log if Campus Name Changes
      if (values.campusTownName !== initialValues.campusTownName) {
        LogCampusTownHistory({
          variables: {
            campusTownId: campusId,
            newLeaderId: '',
            oldLeaderId: '',
            oldCouncilId: '',
            newCouncilId: '',
            historyRecord: `Campus name has been changed from ${initialValues.campusTownName} to ${values.campusTownName}`,
          },
        })
      }

      //Log if the Leader Changes
      if (values.leaderId !== initialValues.leaderId) {
        return MakeCampusLeader({
          variables: {
            oldLeaderId: initialValues.leaderId,
            newLeaderId: values.leaderId,
            campusId: campusId,
          },
        })
          .then(() => {
            alertMsg('Leader Changed Successfully')
            history.push(`/${church.church}/displaydetails`)
          })
          .catch((err) =>
            throwErrorMsg('There was a problem changing the CO', err)
          )
      }

      //Log if Council Changes
      if (values.council !== initialValues.council) {
        RemoveCampusCouncil({
          variables: {
            councilId: initialValues.council,
            campusId: campusId,
          },
        })
        AddCampusCouncil({
          variables: {
            councilId: values.council,
            campusId: campusId,
          },
        })
      }
    } else if (church.church === 'town') {
      UpdateTown({
        variables: {
          townId: townId,
          townName: values.campusTownName,
          councilId: values.council,
        },
      })

      //Log if Town Name Changes
      if (values.campusTownName !== initialValues.campusTownName) {
        LogCampusTownHistory({
          variables: {
            campusTownId: townId,
            newLeaderId: '',
            oldLeaderId: '',
            oldCouncilId: '',
            newCouncilId: '',
            historyRecord: `Town name has been changed from ${initialValues.campusTownName} to ${values.campusTownName}`,
          },
        })
      }

      //Log if the Leader Changes
      if (values.leaderId !== initialValues.leaderId) {
        return MakeTownLeader({
          variables: {
            oldLeaderId: initialValues.leaderId,
            newLeaderId: values.leaderId,
            townId: townId,
          },
        })
          .then(() => {
            alertMsg('Leader Changed Successfully')
            history.push(`/${church.church}/displaydetails`)
          })
          .catch((err) =>
            throwErrorMsg('There was a problem changing the leader', err)
          )
      }

      //Log If The Council Changes
      if (values.council !== initialValues.council) {
        RemoveTownCouncil({
          variables: {
            councilId: initialValues.council,
            townId: townId,
          },
        })
        AddTownCouncil({
          variables: {
            councilId: values.council,
            townId: townId,
          },
        })
      }
    }

    //For the Adding and Removing of Centres
    const oldCentreList = initialValues.centres.map((centre) => {
      return centre.id
    })

    const newCentreList = values.centres.map((centre) => {
      return centre.id ? centre.id : centre
    })

    const removeCentres = oldCentreList.filter((value) => {
      return !newCentreList.includes(value)
    })

    const addCentres = values.centres.filter((value) => {
      return !oldCentreList.includes(value.id)
    })

    removeCentres.forEach((centre) => {
      RemoveCentreCampus({
        variables: {
          campusId: campusId,
          centreId: centre,
        },
      })
      RemoveCentreTown({
        variables: {
          townId: townId,
          centreId: centre,
        },
      })
    })

    addCentres.forEach((centre) => {
      if (centre.campus) {
        RemoveCentreCampus({
          variables: {
            campusId: centre.campus.id,
            centreId: centre.id,
          },
        })
      } else if (centre.town) {
        RemoveCentreTown({
          variables: {
            townId: centre.town.id,
            centreId: centre.id,
          },
        })
      } else {
        //Centre has no previous campus and is now joining. ie. RemoveCentreCampus won't run
        LogCentreHistory({
          variables: {
            centreId: centre.id,
            newLeaderId: '',
            oldLeaderId: '',
            newCampusTownId: church.church === 'campus' ? campusId : townId,
            oldCampusTownId: '',
            historyRecord: `${
              centre.name
            } Centre has been started again under ${
              initialValues.campusTownName
            } ${capitalise(church.church)}`,
          },
        })
      }
      if (church.church === 'campus') {
        AddCampusCentres({
          variables: {
            campusId: campusId,
            centreId: centre.id,
          },
        })
      }
      if (church.church === 'town') {
        AddTownCentres({
          variables: {
            townId: townId,
            centreId: centre.id,
          },
        })
      }
    })

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    history.push(`/${church.church}/displaydetails`)
  }

  return (
    <CampusTownForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Update ${capitalise(church.church)} Form`}
      loading={townLoading || campusLoading || !initialValues.campusTownName}
      newConstituency={false}
    />
  )
}

export default UpdateTownCampus
