import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, capitalise, throwErrorMsg } from '../../global-utils'

import {
  GET_CAMPUS_BACENTAS,
  GET_TOWN_BACENTAS,
} from '../../queries/ListQueries'
import {
  ADD_BACENTA_FELLOWSHIPS,
  ADD_BACENTA_TOWN,
  ADD_BACENTA_CAMPUS,
  REMOVE_BACENTA_TOWN,
  REMOVE_BACENTA_CAMPUS,
  UPDATE_BACENTA_MUTATION,
  REMOVE_FELLOWSHIP_BACENTA,
} from './UpdateMutations'
import { ChurchContext } from '../../contexts/ChurchContext'
import { DISPLAY_BACENTA } from '../display/ReadQueries'
import { LOG_BACENTA_HISTORY, LOG_FELLOWSHIP_HISTORY } from './LogMutations'
import { MAKE_BACENTA_LEADER } from './ChangeLeaderMutations'
import BacentaForm from '../../components/reusable-forms/BacentaForm'
import { MAKE_FELLOWSHIP_INACTIVE } from './CloseChurchMutations'

const UpdateBacenta = () => {
  const { church, bacentaId, setTownId, setCampusId } =
    useContext(ChurchContext)
  const { data: bacentaData, loading: bacentaLoading } = useQuery(
    DISPLAY_BACENTA,
    {
      variables: { id: bacentaId },
    }
  )

  const history = useHistory()
  const bacenta = bacentaData?.bacentas[0]

  const initialValues = {
    bacentaName: bacenta?.name,
    leaderName: bacenta?.leader?.fullName ?? '',
    leaderId: bacenta?.leader?.id || '',
    campusTownSelect:
      church.church === 'town' ? bacenta?.town?.id : bacenta?.campus?.id,
    fellowships: bacenta?.fellowships.length ? bacenta?.fellowships : [''],
  }

  const [LogBacentaHistory] = useMutation(LOG_BACENTA_HISTORY)

  const [LogFellowshipHistory] = useMutation(LOG_FELLOWSHIP_HISTORY, {
    refetchQueries: [{ query: DISPLAY_BACENTA, variables: { id: bacentaId } }],
  })

  const [MakeBacentaLeader] = useMutation(MAKE_BACENTA_LEADER)
  const [UpdateBacenta] = useMutation(UPDATE_BACENTA_MUTATION, {
    refetchQueries: [
      {
        query: GET_TOWN_BACENTAS,
        variables: { id: initialValues.campusTownSelect },
      },
      {
        query: GET_CAMPUS_BACENTAS,
        variables: { id: initialValues.campusTownSelect },
      },
    ],
  })

  //Changes downwards.ie. Changes to the Fellowships underneath the Bacenta
  const [AddBacentaFellowships] = useMutation(ADD_BACENTA_FELLOWSHIPS)
  const [CloseDownFellowship] = useMutation(MAKE_FELLOWSHIP_INACTIVE)
  const [RemoveFellowshipFromBacenta] = useMutation(REMOVE_FELLOWSHIP_BACENTA, {
    onCompleted: (data) => {
      let prevBacenta = data.updateBacentas.bacentas[0]
      let fellowship = data.updateFellowships.fellowships[0]
      let newBacentaId = ''
      let oldBacentaId = ''
      let historyRecord

      if (prevBacenta.id === bacentaId) {
        //Fellowship has previous bacenta which is current bacenta and is going
        oldBacentaId = bacentaId
        newBacentaId = ''
        historyRecord = `${fellowship.name} Fellowship has been closed down under ${initialValues.bacentaName} Bacenta`
      } else if (prevBacenta.id !== bacentaId) {
        //Fellowship has previous bacenta which is not current bacenta and is joining
        oldBacentaId = prevBacenta.id
        newBacentaId = bacentaId
        historyRecord = `${fellowship.name} Fellowship has been moved to ${initialValues.bacentaName} Bacenta from ${prevBacenta.name} Bacenta`
      }

      //After removing the fellowship from a bacenta, then you log that change.
      LogFellowshipHistory({
        variables: {
          fellowshipId: fellowship.id,
          newLeaderId: '',
          oldLeaderId: '',
          newBacentaId: newBacentaId,
          oldBacentaId: oldBacentaId,
          historyRecord: historyRecord,
        },
      })
    },
  })

  //Changes upwards. ie. Changes to the CampusTown the Bacenta is under

  const [RemoveBacentaTown] = useMutation(REMOVE_BACENTA_TOWN)
  const [RemoveBacentaCampus] = useMutation(REMOVE_BACENTA_CAMPUS)
  const [AddBacentaTown] = useMutation(ADD_BACENTA_TOWN, {
    onCompleted: (data) => {
      const oldTown = bacenta?.town
      const newTown = data.updateBacentas.bacentas[0].town
      if (!oldTown) {
        //If There is no old town
        let recordIfNoOldTown = `${oldTown.name} Bacenta has been moved to ${
          newTown.name
        } ${capitalise(church.church)} `

        LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
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
        RemoveBacentaTown({
          variables: {
            townId: oldTown.id,
            bacentaId: bacentaId,
          },
        })

        let recordIfOldTown = `${oldTown.name} Bacenta has been moved from ${
          bacenta?.town.name
        } ${capitalise(church.church)} to ${newTown.name} ${capitalise(
          church.church
        )}`

        //After Adding the bacenta to a campus/town, then you log that change.
        LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
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
  const [AddBacentaCampus] = useMutation(ADD_BACENTA_CAMPUS, {
    onCompleted: (data) => {
      const oldCampus = bacenta?.campus
      const newCampus = data.updateBacentas.bacentas[0].campus
      if (!oldCampus) {
        //If There is no old campus
        let recordIfNoOldCampus = `${
          initialValues.bacentaName
        } Bacenta has been moved to ${newCampus.name} ${capitalise(
          church.church
        )} `

        LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
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
        RemoveBacentaCampus({
          variables: {
            campusId: oldCampus.id,
            bacentaId: bacentaId,
          },
        })

        let recordIfOldCampus = `${
          initialValues.bacentaName
        } Bacenta has been moved from ${oldCampus.name} ${capitalise(
          church.church
        )} to ${newCampus.name} ${capitalise(church.church)}`

        //After Adding the bacenta to a campus/town, then you log that change.
        LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
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
    onSubmitProps.setSubmitting(true)
    if (church.church === 'town') {
      setTownId(values.campusTownSelect)
    }
    if (church.church === 'campus') {
      setCampusId(values.campusTownSelect)
    }

    //Log if Bacenta Name Changes
    if (values.bacentaName !== initialValues.bacentaName) {
      LogBacentaHistory({
        variables: {
          bacentaId: bacentaId,
          newLeaderId: '',
          oldLeaderId: '',
          oldCampusTownId: '',
          newCampusTownId: '',
          historyRecord: `Bacenta name has been changed from ${initialValues.bacentaName} to ${values.bacentaName}`,
        },
      })
    }

    //Log if the Leader Changes
    if (values.leaderId !== initialValues.leaderId) {
      return MakeBacentaLeader({
        variables: {
          oldLeaderId: initialValues.leaderId,
          newLeaderId: values.leaderId,
          bacentaId: bacentaId,
        },
      })
        .then(() => {
          alertMsg('Leader Changed Successfully')
          history.push(`/bacenta/displaydetails`)
        })
        .catch((error) =>
          throwErrorMsg('There was an error changing the leader', error)
        )
    }

    //Log If The TownCampus Changes
    if (values.campusTownSelect !== initialValues.campusTownSelect) {
      if (church.church === 'town') {
        RemoveBacentaTown({
          variables: {
            campusId: initialValues.campusTownSelect,
            bacentaId: bacentaId,
          },
        })
        AddBacentaTown({
          variables: {
            townId: values.campusTownSelect,
            bacentaId: bacentaId,
          },
        })
      } else if (church.church === 'campus') {
        RemoveBacentaCampus({
          variables: {
            campusId: initialValues.campusTownSelect,
            bacentaId: bacentaId,
          },
        })
        AddBacentaCampus({
          variables: {
            campusId: values.campusTownSelect,
            bacentaId: bacentaId,
          },
        })
      }
    }

    //For the adding and removing of fellowships
    const oldFellowshipList = initialValues.fellowships.map((fellowship) => {
      return fellowship.id
    })

    const newFellowshipList = values.fellowships.map((fellowship) => {
      return fellowship.id ? fellowship.id : fellowship
    })

    const removeFellowships = oldFellowshipList.filter(function (value) {
      return !newFellowshipList.includes(value)
    })

    const addFellowships = values.fellowships.filter(function (value) {
      return !oldFellowshipList.includes(value.id)
    })

    if (removeFellowships.length) {
      removeFellowships.forEach((fellowship) => {
        CloseDownFellowship({
          variables: {
            fellowshipId: fellowship ?? '',
          },
        }).catch((error) => throwErrorMsg(error))
      })
    }

    if (addFellowships.length) {
      addFellowships.forEach((fellowship) => {
        if (fellowship.bacenta) {
          RemoveFellowshipFromBacenta({
            variables: {
              bacentaId: fellowship.bacenta.id,
              fellowshipIds: [fellowship.id],
            },
          })
        } else {
          //Fellowship has no previous bacenta and is now joining. ie. CloseDownFellowship won't run
          LogFellowshipHistory({
            variables: {
              fellowshipId: fellowship.id,
              newLeaderId: '',
              oldLeaderId: '',
              newBacentaId: bacentaId,
              oldBacentaId: '',
              historyRecord: `${fellowship.name} 
              Fellowship has been started again under ${initialValues.bacentaName} Bacenta`,
            },
          })
        }

        AddBacentaFellowships({
          variables: {
            bacentaId: bacentaId,
            fellowshipId: [fellowship.id],
          },
        })
      })
    }

    UpdateBacenta({
      variables: {
        bacentaId: bacentaId,
        bacentaName: values.bacentaName,
        leaderId: values.leaderId,
        campusTownId: values.campusTownSelect,
      },
    }).catch((error) =>
      throwErrorMsg('There was an error updating this bacenta', error)
    )

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    history.push(`/bacenta/displaydetails`)
  }

  return (
    <BacentaForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`${capitalise(church.subChurch)} Update Form`}
      loading={bacentaLoading}
    />
  )
}

export default UpdateBacenta
