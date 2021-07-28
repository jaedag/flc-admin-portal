import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_SONTA_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../contexts/ChurchContext'
import { NEW_SONTA_LEADER } from './MakeLeaderMutations'
import SontaForm from 'components/reusable-forms/SontaForm'
import { throwErrorMsg } from 'global-utils'

function CreateSonta() {
  const { clickCard, townId, campusId, church } = useContext(ChurchContext)

  const history = useHistory()

  const [CreateSonta] = useMutation(CREATE_SONTA_MUTATION)
  const [NewSontaLeader] = useMutation(NEW_SONTA_LEADER)

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    CreateSonta({
      variables: {
        ministryId: values.ministrySelect,
        townCampusId: church.church === 'town' ? townId : campusId,
        leaderId: values.leaderId,
      },
    })
      .then((res) => {
        clickCard(res.data.CreateSonta.sontas[0])
        NewSontaLeader({
          variables: {
            leaderId: values.leaderId,
            sontaId: res.data.CreateSonta.sontas[0].id,
          },
        }).catch((error) =>
          throwErrorMsg('There was an error adding leader', error)
        )
        history.push('/sonta/displaydetails')
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
      })
      .catch((error) =>
        throwErrorMsg('There was an error creating sonta', error)
      )
  }

  return (
    <SontaForm onSubmit={onSubmit} title="Start a New Sonta" newSonta={true} />
  )
}

export default CreateSonta
