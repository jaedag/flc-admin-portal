import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwErrorMsg } from '../../../global-utils'
import { CREATE_STREAM_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_STREAM_LEADER } from './MakeLeaderMutations'
import StreamForm from 'pages/directory/reusable-forms/StreamForm'

const CreateStream = () => {
  const { clickCard, gatheringServiceId, setGatheringServiceId, setStreamId } =
    useContext(ChurchContext)

  const navigate = useNavigate()

  const initialValues = {
    name: '',
    leaderId: '',
    gatheringService: gatheringServiceId,
    councils: [''],
  }

  const [NewStreamLeader] = useMutation(NEW_STREAM_LEADER)
  const [CreateStream] = useMutation(CREATE_STREAM_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    setGatheringServiceId(values.gatheringService)

    CreateStream({
      variables: {
        name: values.name,
        leaderId: values.leaderId,
        gatheringServiceId: values.gatheringService,
        councils: values.councils,
      },
    })
      .then((res) => {
        clickCard(res.data.CreateStream)
        NewStreamLeader({
          variables: {
            leaderId: values.leaderId,
            streamId: res.data.CreateStream.id,
          },
        }).catch((error) => {
          throwErrorMsg('There was an error adding leader', error)
        })

        setStreamId(res.data.CreateStream.id)
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        navigate(`/stream/displaydetails`)
      })
      .catch((error) => {
        throwErrorMsg('There was an error creating stream', error)
      })
  }

  return (
    <StreamForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Create a New Stream`}
      newStream
    />
  )
}

export default CreateStream
