import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CAMPUS_CENTRES, GET_TOWN_CENTRES } from '../../queries/ListQueries'
import { UPDATE_SONTA_MUTATION } from './UpdateMutations'
import { ChurchContext } from '../../contexts/ChurchContext'
import { DISPLAY_SONTA } from '../display/ReadQueries'
import { LOG_SONTA_HISTORY } from './LogMutations'
import { MAKE_SONTA_LEADER } from './ChangeLeaderMutations'
import SontaForm from 'components/reusable-forms/SontaForm'
import { throwErrorMsg } from 'global-utils'

const UpdateSonta = () => {
  const {
    church,
    sontaId,
    townId,
    setTownId,
    setCampusId,
    campusId,
  } = useContext(ChurchContext)

  const { data: sontaData, loading: sontaLoading } = useQuery(DISPLAY_SONTA, {
    variables: { id: sontaId },
  })

  const history = useHistory()
  const sonta = sontaData?.sontas[0]

  const initialValues = {
    sontaName: sonta?.name,
    leaderName: sonta?.leader.fullName ?? '',
    leaderId: sonta?.leader?.id || '',
    ministrySelect: sonta?.ministry.id || '',
    campusTown: church.church === 'town' ? sonta?.town?.id : sonta?.campus?.id,
  }

  const [LogSontaHistory] = useMutation(LOG_SONTA_HISTORY, {
    refetchQueries: [{ query: DISPLAY_SONTA, variables: { id: sontaId } }],
  })

  const [MakeSontaLeader] = useMutation(MAKE_SONTA_LEADER)
  const [UpdateSonta] = useMutation(UPDATE_SONTA_MUTATION, {
    refetchQueries: [
      { query: GET_TOWN_CENTRES, variables: { id: townId } },
      { query: GET_CAMPUS_CENTRES, variables: { id: campusId } },
      {
        query: GET_TOWN_CENTRES,
        variables: { id: initialValues.campusTown },
      },
      {
        query: GET_CAMPUS_CENTRES,
        variables: { id: initialValues.campusTown },
      },
    ],
  })

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    if (church.church === 'town') {
      setTownId(values.campusTown)
    }
    if (church.church === 'campus') {
      setCampusId(values.campusTown)
    }

    //Log if Sonta Name Changes
    if (values.sontaName !== initialValues.sontaName) {
      LogSontaHistory({
        variables: {
          sontaId: sontaId,
          newLeaderId: '',
          oldLeaderId: '',
          historyRecord: `Sonta name has been changed from ${initialValues.sontaName} to ${values.sontaName}`,
        },
      })
    }

    //Log if the Leader Changes
    if (values.leaderId !== initialValues.leaderId) {
      MakeSontaLeader({
        variables: {
          oldLeaderId: initialValues.leaderId,
          newLeaderId: values.leaderId,
          sontaId: sontaId,
        },
      }).catch((err) => throwErrorMsg('There was an error adding leader', err))
    }

    UpdateSonta({
      variables: {
        sontaId: sontaId,
        sontaName: values.sontaName,
        leaderId: values.leaderId,
      },
    })
      .then(() => history.push(`/sonta/displaydetails`))
      .catch((error) =>
        throwErrorMsg('There was an error updating this sonta', error)
      )

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
  }

  return (
    <SontaForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title="Sonta Update Form"
      loading={sontaLoading}
    />
  )
}

export default UpdateSonta
