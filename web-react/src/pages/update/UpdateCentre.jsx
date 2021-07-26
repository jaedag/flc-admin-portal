import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { capitalise } from '../../global-utils'

import { GET_CAMPUS_CENTRES, GET_TOWN_CENTRES } from '../../queries/ListQueries'
import {
  ADD_CENTRE_BACENTAS,
  REMOVE_BACENTA_CENTRE,
  ADD_CENTRE_TOWN,
  ADD_CENTRE_CAMPUS,
  REMOVE_CENTRE_TOWN,
  REMOVE_CENTRE_CAMPUS,
  UPDATE_CENTRE_MUTATION,
} from './UpdateMutations'
import { ChurchContext } from '../../contexts/ChurchContext'
import { DISPLAY_CENTRE } from '../display/ReadQueries'
import { LOG_CENTRE_HISTORY, LOG_BACENTA_HISTORY } from './LogMutations'
import { MAKE_CENTRE_LEADER } from './ChangeLeaderMutations'
import CentreForm from '../../components/reusable-forms/CentreForm'

const UpdateCentre = () => {
  const {
    church,
    centreId,
    townId,
    setTownId,
    setCampusId,
    campusId,
  } = useContext(ChurchContext)

  const { data: centreData, loading: centreLoading } = useQuery(
    DISPLAY_CENTRE,
    {
      variables: { id: centreId },
    }
  )

  const history = useHistory()
  const centre = centreData?.centres[0]

  const initialValues = {
    centreName: centre?.name,
    leaderName: centre?.leader.fullName ?? '',
    leaderId: centre?.leader?.id || '',
    campusTownSelect:
      church.church === 'town' ? centre?.town?.id : centre?.campus?.id,
    bacentas: centre?.bacentas.length ? centre?.bacentas : [''],
  }

  const [LogCentreHistory] = useMutation(LOG_CENTRE_HISTORY, {
    refetchQueries: [{ query: DISPLAY_CENTRE, variables: { id: centreId } }],
  })

  const [LogBacentaHistory] = useMutation(LOG_BACENTA_HISTORY, {
    refetchQueries: [{ query: DISPLAY_CENTRE, variables: { id: centreId } }],
  })

  const [MakeCentreLeader] = useMutation(MAKE_CENTRE_LEADER)
  const [UpdateCentre] = useMutation(UPDATE_CENTRE_MUTATION, {
    refetchQueries: [
      { query: GET_TOWN_CENTRES, variables: { id: townId } },
      { query: GET_CAMPUS_CENTRES, variables: { id: campusId } },
      {
        query: GET_TOWN_CENTRES,
        variables: { id: initialValues.campusTownSelect },
      },
      {
        query: GET_CAMPUS_CENTRES,
        variables: { id: initialValues.campusTownSelect },
      },
    ],
  })

  //Changes downwards.ie. Changes to the Bacentas underneath the Centre
  const [AddCentreBacentas] = useMutation(ADD_CENTRE_BACENTAS)
  const [RemoveBacentaFromCentre] = useMutation(REMOVE_BACENTA_CENTRE, {
    onCompleted: (data) => {
      let prevCentre = data.updateCentres.centres[0]
      let bacenta = data.updateBacentas.bacentas[0]
      let newCentreId = ''
      let oldCentreId = ''
      let historyRecord

      if (prevCentre.id === centreId) {
        //Bacenta has previous centre which is current centre and is going
        oldCentreId = centreId
        newCentreId = ''
        historyRecord = `${bacenta.name} Bacenta has been closed down under ${initialValues.centreName} Centre`
      } else if (prevCentre.id !== centreId) {
        //Bacenta has previous centre which is not current centre and is joining
        oldCentreId = prevCentre.id
        newCentreId = centreId
        historyRecord = `${bacenta.name} Bacenta has been moved to ${initialValues.centreName} Centre from ${prevCentre.name} Centre`
      }

      //After removing the bacenta from a centre, then you log that change.
      LogBacentaHistory({
        variables: {
          bacentaId: bacenta.id,
          newLeaderId: '',
          oldLeaderId: '',
          newCentreId: newCentreId,
          oldCentreId: oldCentreId,
          historyRecord: historyRecord,
        },
      })
    },
  })

  //Changes upwards. ie. Changes to the CampusTown the Centre is under

  const [RemoveCentreTown] = useMutation(REMOVE_CENTRE_TOWN)
  const [RemoveCentreCampus] = useMutation(REMOVE_CENTRE_CAMPUS)
  const [AddCentreTown] = useMutation(ADD_CENTRE_TOWN, {
    onCompleted: (data) => {
      const oldTown = centre?.town
      const newTown = data.updateCentres.centres[0].town
      if (!oldTown) {
        //If There is no old town
        let recordIfNoOldTown = `${oldTown.name} Centre has been moved to ${
          newTown.name
        } ${capitalise(church.church)} `

        LogCentreHistory({
          variables: {
            centreId: centreId,
            newLeaderId: '',
            oldLeaderId: '',
            newCampusTownId: newTown.id,
            oldCampusTownId: oldTown.id,
            historyRecord: recordIfNoOldTown,
          },
        })
      } else {
        //If there is an old town

        //Break Link to the Old Town
        RemoveCentreTown({
          variables: {
            townId: oldTown.id,
            centreId: centreId,
          },
        })

        let recordIfOldTown = `${oldTown.name} Centre has been moved from ${
          centre?.town.name
        } ${capitalise(church.church)} to ${newTown.name} ${capitalise(
          church.church
        )}`

        //After Adding the centre to a campus/town, then you log that change.
        LogCentreHistory({
          variables: {
            centreId: centreId,
            newLeaderId: '',
            oldLeaderId: '',
            newCampusTownId: newTown.id,
            oldCampusTownId: oldTown.id,
            historyRecord: recordIfOldTown,
          },
        })
      }
    },
  })
  const [AddCentreCampus] = useMutation(ADD_CENTRE_CAMPUS, {
    onCompleted: (data) => {
      const oldCampus = centre?.campus
      const newCampus = data.updateCentres.centres[0].campus
      if (!oldCampus) {
        //If There is no old campus
        let recordIfNoOldCampus = `${
          initialValues.centreName
        } Centre has been moved to ${newCampus.name} ${capitalise(
          church.church
        )} `

        LogCentreHistory({
          variables: {
            centreId: centreId,
            newLeaderId: '',
            oldLeaderId: '',
            newCampusTownId: newCampus.id,
            oldCampusTownId: oldCampus.id,
            historyRecord: recordIfNoOldCampus,
          },
        })
      } else {
        //If there is an old Campus

        //Break Link to the Old Campus
        RemoveCentreCampus({
          variables: {
            campusId: oldCampus.id,
            centreId: centreId,
          },
        })

        let recordIfOldCampus = `${
          initialValues.centreName
        } Centre has been moved from ${oldCampus.name} ${capitalise(
          church.church
        )} to ${newCampus.name} ${capitalise(church.church)}`

        //After Adding the centre to a campus/town, then you log that change.
        LogCentreHistory({
          variables: {
            centreId: centreId,
            newLeaderId: '',
            oldLeaderId: '',
            newCampusTownId: newCampus.id,
            oldCampusTownId: oldCampus.id,
            historyRecord: recordIfOldCampus,
          },
        })
      }
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    if (church.church === 'town') {
      setTownId(values.campusTownSelect)
    }
    if (church.church === 'campus') {
      setCampusId(values.campusTownSelect)
    }

    UpdateCentre({
      variables: {
        centreId: centreId,
        centreName: values.centreName,
        leaderId: values.leaderId,
        campusTownId: values.campusTownSelect,
      },
    })

    //Log if Centre Name Changes
    if (values.centreName !== initialValues.centreName) {
      LogCentreHistory({
        variables: {
          centreId: centreId,
          newLeaderId: '',
          oldLeaderId: '',
          oldCampusTownId: '',
          newCampusTownId: '',
          historyRecord: `Centre name has been changed from ${initialValues.centreName} to ${values.centreName}`,
        },
      })
    }

    //Log if the Leader Changes
    if (values.leaderId !== initialValues.leaderId) {
      MakeCentreLeader({
        variables: {
          oldLeaderId: initialValues.leaderId,
          newLeaderId: values.leaderId,
          centreId: centreId,
        },
      }).catch((err) => alert(err))
    }

    //Log If The TownCampus Changes
    if (values.campusTownSelect !== initialValues.campusTownSelect) {
      if (church.church === 'town') {
        RemoveCentreTown({
          variables: {
            campusId: initialValues.campusTownSelect,
            centreId: centreId,
          },
        })
        AddCentreTown({
          variables: {
            townId: values.campusTownSelect,
            centreId: centreId,
          },
        })
      } else if (church.church === 'campus') {
        RemoveCentreCampus({
          variables: {
            campusId: initialValues.campusTownSelect,
            centreId: centreId,
          },
        })
        AddCentreCampus({
          variables: {
            campusId: values.campusTownSelect,
            centreId: centreId,
          },
        })
      }
    }

    //For the adding and removing of bacentas
    const oldBacentaList = initialValues.bacentas.map((bacenta) => {
      return bacenta.id
    })

    const newBacentaList = values.bacentas.map((bacenta) => {
      return bacenta.id ? bacenta.id : bacenta
    })

    const removeBacentas = oldBacentaList.filter(function (value) {
      return !newBacentaList.includes(value)
    })

    const addBacentas = values.bacentas.filter(function (value) {
      return !oldBacentaList.includes(value.id)
    })

    RemoveBacentaFromCentre({
      variables: {
        centreId: centreId,
        bacentaId: removeBacentas,
      },
    })

    addBacentas.forEach((bacenta) => {
      if (bacenta.centre) {
        RemoveBacentaFromCentre({
          variables: {
            centreId: bacenta.centre.id,
            bacentaId: [bacenta.id],
          },
        })
      } else {
        //Bacenta has no previous centre and is now joining. ie. RemoveBacentaFromCentre won't run
        LogBacentaHistory({
          variables: {
            bacentaId: bacenta.id,
            newLeaderId: '',
            oldLeaderId: '',
            newCentreId: centreId,
            oldCentreId: '',
            historyRecord: `${bacenta.name} 
              Bacenta has been started again under ${initialValues.centreName} Centre`,
          },
        })
      }

      AddCentreBacentas({
        variables: {
          centreId: centreId,
          bacentaId: bacenta.id,
        },
      })
    })

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    history.push(`/${church.subChurch}/displaydetails`)
  }

  return (
    <CentreForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`${capitalise(church.subChurch)} Update Form`}
      loadingState={centreLoading}
    />
  )
}

export default UpdateCentre
