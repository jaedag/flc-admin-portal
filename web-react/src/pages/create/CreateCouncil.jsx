import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwErrorMsg } from '../../global-utils'
import { CREATE_COUNCIL_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../contexts/ChurchContext'
import { NEW_COUNCIL_LEADER } from './MakeLeaderMutations'
import CouncilForm from 'components/reusable-forms/CouncilForm'

const CreateCouncil = () => {
  const { clickCard, streamId, setStreamId, setCouncilId } =
    useContext(ChurchContext)

  const navigate = useNavigate()

  const initialValues = {
    councilName: '',
    leaderId: '',
    streamSelect: streamId,
    constituencies: [''],
  }

  const [NewCouncilLeader] = useMutation(NEW_COUNCIL_LEADER)
  const [CreateCouncil] = useMutation(CREATE_COUNCIL_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    setStreamId(values.streamSelect)

    CreateCouncil({
      variables: {
        name: values.name,
        leaderId: values.leaderId,
        streamId: values.streamSelect,
        bacentas: values.bacentas,
      },
    })
      .then((res) => {
        clickCard(res.data.CreateCouncil)
        NewCouncilLeader({
          variables: {
            leaderId: values.leaderId,
            councilId: res.data.CreateCouncil.id,
          },
        }).catch((error) => {
          throwErrorMsg('There was an error adding leader', error)
        })

        setCouncilId(res.data.CreateCouncil.id)
        navigate(`/council/displaydetails`)
      })
      .catch((error) => {
        throwErrorMsg('There was an error creating council', error)
      })

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
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
