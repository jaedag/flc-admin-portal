import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, capitalise, throwErrorMsg } from '../../global-utils'

import { GET_CONSTITUENCY_BACENTAS } from '../../queries/ListQueries'
import {
  ADD_BACENTA_FELLOWSHIPS,
  REMOVE_BACENTA_CONSTITUENCY,
  UPDATE_BACENTA_MUTATION,
  REMOVE_FELLOWSHIP_BACENTA,
  ADD_BACENTA_CONSTITUENCY,
} from './UpdateMutations'
import { ChurchContext } from '../../contexts/ChurchContext'
import { DISPLAY_BACENTA } from '../display/ReadQueries'
import { LOG_BACENTA_HISTORY, LOG_FELLOWSHIP_HISTORY } from './LogMutations'
import { MAKE_BACENTA_LEADER } from './ChangeLeaderMutations'
import BacentaForm from '../../components/reusable-forms/BacentaForm'
import { MAKE_FELLOWSHIP_INACTIVE } from './CloseChurchMutations'

const UpdateBacenta = () => {
  const { church, bacentaId, setConstituencyId } = useContext(ChurchContext)
  const { data: bacentaData, loading: bacentaLoading } = useQuery(
    DISPLAY_BACENTA,
    {
      variables: { id: bacentaId },
    }
  )

  const history = useHistory()
  const bacenta = bacentaData?.bacentas[0]

  const initialValues = {
    name: bacenta?.name,
    leaderName: bacenta?.leader?.fullName ?? '',
    leaderId: bacenta?.leader?.id || '',
    constituencySelect: bacenta?.constituency?.id,
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
        query: GET_CONSTITUENCY_BACENTAS,
        variables: { id: initialValues.constituencySelect },
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
        historyRecord = `${fellowship.name} Fellowship has been closed down under ${initialValues.name} Bacenta`
      } else if (prevBacenta.id !== bacentaId) {
        //Fellowship has previous bacenta which is not current bacenta and is joining
        oldBacentaId = prevBacenta.id
        newBacentaId = bacentaId
        historyRecord = `${fellowship.name} Fellowship has been moved to ${initialValues.name} Bacenta from ${prevBacenta.name} Bacenta`
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

  //Changes upwards. ie. Changes to the Constituency the Bacenta is under

  const [RemoveBacentaConstituency] = useMutation(REMOVE_BACENTA_CONSTITUENCY)

  const [AddBacentaConstituency] = useMutation(ADD_BACENTA_CONSTITUENCY, {
    onCompleted: (data) => {
      const oldConstituency = bacenta?.constituency
      const newConstituency = data.updateBacentas.constituencies[0].constituency
      if (!oldConstituency) {
        //If There is no old Constituency
        let recordIfNooldConstituency = `${initialValues.name} Bacenta has been moved to ${newConstituency.name} Constituency`

        LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
            newLeaderId: '',
            oldLeaderId: '',
            newConstituencyId: newConstituency.id,
            oldConstituencyId: oldConstituency.id,
            historyRecord: recordIfNooldConstituency,
          },
        })
      } else {
        //If there is an old Constituency

        //Break Link to the Old Constituency
        RemoveBacentaConstituency({
          variables: {
            constituencyId: oldConstituency.id,
            bacentaId: bacentaId,
          },
        })

        let recordIfoldConstituency = `${initialValues.name} Bacenta has been moved from ${oldConstituency.name} Constituency to ${newConstituency.name} Constituency`

        //After Adding the bacenta to a constituency, then you log that change.
        LogBacentaHistory({
          variables: {
            bacentaId: bacentaId,
            newLeaderId: '',
            oldLeaderId: '',
            newConstituencyId: newConstituency.id,
            oldConstituencyId: oldConstituency.id,
            historyRecord: recordIfoldConstituency,
          },
        })
      }
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)

    setConstituencyId(values.constituencySelect)

    //Log if Bacenta Name Changes
    if (values.name !== initialValues.name) {
      LogBacentaHistory({
        variables: {
          bacentaId: bacentaId,
          newLeaderId: '',
          oldLeaderId: '',
          oldConstituencyId: '',
          newConstituencyId: '',
          historyRecord: `Bacenta name has been changed from ${initialValues.name} to ${values.name}`,
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

    //Log If The Constituency Changes
    if (values.constituencySelect !== initialValues.constituencySelect) {
      RemoveBacentaConstituency({
        variables: {
          constituencyId: initialValues.constituencySelect,
          bacentaId: bacentaId,
        },
      })
      AddBacentaConstituency({
        variables: {
          constituencyId: values.constituencySelect,
          bacentaId: bacentaId,
        },
      })
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
              Fellowship has been started again under ${initialValues.name} Bacenta`,
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
        name: values.name,
        leaderId: values.leaderId,
        constituencyId: values.constituencySelect,
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
