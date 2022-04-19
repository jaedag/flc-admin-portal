import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwErrorMsg } from '../../../global-utils'
import { CREATE_COUNCIL_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_COUNCIL_LEADER } from './MakeLeaderMutations'
import CouncilForm from 'pages/directory/reusable-forms/CouncilForm'

const CreateCouncil = () => {
  const { clickCard, streamId } = useContext(ChurchContext)

  const navigate = useNavigate()

  const initialValues = {
    name: '',
    leaderId: '',
    stream: streamId,
    constituencies: [''],
  }

  const [NewCouncilLeader] = useMutation(NEW_COUNCIL_LEADER)
  const [CreateCouncil] = useMutation(CREATE_COUNCIL_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    clickCard({ id: values.stream, __typename: 'Stream' })
    try {
      const res = await CreateCouncil({
        variables: {
          name: values.name,
          leaderId: values.leaderId,
          streamId: values.stream,
          constituencies: values.constituencies,
        },
      })
      clickCard(res.data.CreateCouncil)

      try {
        await NewCouncilLeader({
          variables: {
            leaderId: values.leaderId,
            councilId: res.data.CreateCouncil.id,
          },
        })
      } catch (error) {
        throwErrorMsg('There was an error adding leader', error)
      }
    } catch (error) {
      throwErrorMsg('There was an error creating council', error)
    }

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    navigate(`/council/displaydetails`)
  }

  return (
    <CouncilForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Create a New Council`}
      newCouncil
    />
  )
}

export default CreateCouncil
