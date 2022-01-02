import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_SONTA_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_SONTA_LEADER } from './MakeLeaderMutations'
import SontaForm from 'components/reusable-forms/SontaForm'
import { throwErrorMsg } from 'global-utils'

function CreateSonta() {
  const { clickCard, constituencyId } = useContext(ChurchContext)

  const navigate = useNavigate()

  const [CreateSonta] = useMutation(CREATE_SONTA_MUTATION)
  const [NewSontaLeader] = useMutation(NEW_SONTA_LEADER)

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    CreateSonta({
      variables: {
        ministryId: values.ministrySelect,
        constituencyId: constituencyId,
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
        navigate('/sonta/displaydetails')
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
