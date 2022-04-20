import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, throwErrorMsg } from '../../../global-utils'
import { GET_GATHERINGSERVICE_STREAMS } from '../../../queries/ListQueries'
import {
  UPDATE_STREAM_MUTATION,
  ADD_STREAM_GATHERINGSERVICE,
  REMOVE_STREAM_GATHERINGSERVICE,
  REMOVE_COUNCIL_STREAM,
  ADD_STREAM_COUNCILS,
} from './UpdateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { DISPLAY_STREAM } from '../display/ReadQueries'
import { LOG_STREAM_HISTORY, LOG_COUNCIL_HISTORY } from './LogMutations'
import { MAKE_STREAM_LEADER } from './ChangeLeaderMutations'
import StreamForm from 'pages/directory/reusable-forms/StreamForm'
import { getChurchIdsFromObject } from './update-utils'
import { MAKE_COUNCIL_INACTIVE } from './CloseChurchMutations'

const UpdateStream = () => {
  const { streamId, clickCard } = useContext(ChurchContext)
  const { data, loading } = useQuery(DISPLAY_STREAM, {
    variables: { id: streamId },
  })

  const navigate = useNavigate()
  const stream = data?.streams[0]

  const initialValues = {
    name: stream?.name,
    leaderName: stream?.leader?.fullName ?? '',
    leaderId: stream?.leader?.id || '',
    gatheringService: stream?.gatheringService?.id ?? '',
    councils: stream?.councils?.length ? stream.councils : [''],
  }

  const [LogStreamHistory] = useMutation(LOG_STREAM_HISTORY, {
    refetchQueries: [{ query: DISPLAY_STREAM, variables: { id: streamId } }],
  })
  const [LogCouncilHistory] = useMutation(LOG_COUNCIL_HISTORY, {
    refetchQueries: [{ query: DISPLAY_STREAM, variables: { id: streamId } }],
  })

  const [MakeStreamLeader] = useMutation(MAKE_STREAM_LEADER)
  const [UpdateStream] = useMutation(UPDATE_STREAM_MUTATION, {
    refetchQueries: [
      {
        query: GET_GATHERINGSERVICE_STREAMS,
        variables: { id: initialValues.gatheringService },
      },
    ],
  })

  //Changes downwards. ie. Council Changes underneath stream
  const [CloseDownCouncil] = useMutation(MAKE_COUNCIL_INACTIVE)
  const [AddStreamCouncils] = useMutation(ADD_STREAM_COUNCILS)
  const [RemoveCouncilStream] = useMutation(REMOVE_COUNCIL_STREAM, {
    onCompleted: (data) => {
      const prevStream = data.updateCouncils.councils[0]
      const council = data.updateCouncils.councils[0]
      let newStreamId = ''
      let oldStreamId = ''
      let historyRecord

      if (prevStream?.id === streamId) {
        //Council has previous stream which is current stream and is going
        oldStreamId = streamId
        newStreamId = ''
        historyRecord = `${council.name} Council has been closed down under ${initialValues.name} Stream`
      } else if (prevStream.id !== streamId) {
        //Council has previous stream which is not current stream and is joining
        oldStreamId = prevStream.id
        newStreamId = streamId
        historyRecord = `${council.name} Council has been moved to ${initialValues.name} Stream from ${prevStream.name} Stream`
      }

      //After removing the council from a stream, then you log that change.
      LogCouncilHistory({
        variables: {
          councilId: council.id,
          newLeaderId: '',
          oldLeaderId: '',
          newstreamId: newStreamId,
          oldstreamId: oldStreamId,
          historyRecord: historyRecord,
        },
      })
    },
  })

  //Changes upwards. it. Changes to the GatheringService the Stream Campus is under
  const [RemoveStreamGatheringService] = useMutation(
    REMOVE_STREAM_GATHERINGSERVICE
  )
  const [AddStreamGatheringService] = useMutation(ADD_STREAM_GATHERINGSERVICE, {
    onCompleted: (data) => {
      if (!stream?.gatheringService.name) {
        //If There is no old GatheringService
        let recordIfNoOldGatheringService = `${initialValues.name} Stream has been moved to ${data.updateStreams.streams[0].gatheringService.name} GatheringService`

        LogStreamHistory({
          variables: {
            streamId: streamId,
            newLeaderId: '',
            oldLeaderId: '',
            newGatheringServiceId:
              data.updateStreams.streams[0].gatheringService.id,
            oldGatheringServiceId: stream?.gatheringService.id,
            historyRecord: recordIfNoOldGatheringService,
          },
        })
      } else {
        //If there is an old GatheringService

        let recordIfOldGatheringService = `${initialValues.name} Stream has been moved from ${stream?.gatheringService.name} GatheringService to ${data.updateStreams.streams[0].gatheringService.name} GatheringService`

        //After Adding the stream to a gatheringService, then you log that change.
        LogStreamHistory({
          variables: {
            streamId: streamId,
            newLeaderId: '',
            oldLeaderId: '',
            newGatheringServiceId:
              data.updateStreams.streams[0].gatheringService.id,
            oldGatheringServiceId: stream?.gatheringService.id,
            historyRecord: recordIfOldGatheringService,
          },
        })
      }
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    clickCard({ id: values.gatheringService, __typename: 'GatheringService' })
    try {
      await UpdateStream({
        variables: {
          streamId: streamId,
          name: values.name,
          gatheringServiceId: values.gatheringService,
        },
      })
    } catch (err) {
      throwErrorMsg('There was a problem updating this stream', err)
    }

    //Log if Stream Name Changes
    if (values.name !== initialValues.name) {
      await LogStreamHistory({
        variables: {
          streamId: streamId,
          newLeaderId: '',
          oldLeaderId: '',
          oldGatheringServiceId: '',
          newGatheringServiceId: '',
          historyRecord: `Stream name has been changed from ${initialValues.name} to ${values.name}`,
        },
      })
    }

    //Log if the Leader Changes
    if (values.leaderId !== initialValues.leaderId) {
      try {
        await MakeStreamLeader({
          variables: {
            oldLeaderId: initialValues.leaderId || 'old-leader',
            newLeaderId: values.leaderId,
            streamId: streamId,
          },
        })
        alertMsg('Leader Changed Successfully')
        navigate(`/stream/displaydetails`)
      } catch (err) {
        throwErrorMsg('There was a problem changing the Overseer', err)
      }
    }

    //Log if GatheringService Changes
    if (values.gatheringService !== initialValues.gatheringService) {
      try {
        await RemoveStreamGatheringService({
          variables: {
            gatheringServiceId: initialValues.gatheringService,
            streamId: streamId,
          },
        })
        await AddStreamGatheringService({
          variables: {
            gatheringServiceId: values.gatheringService,
            streamId: streamId,
          },
        })
      } catch (error) {
        throwErrorMsg(error)
      }
    }

    //For the Adding and Removing of Councils
    const oldCouncilList = initialValues.councils.map((council) => council)

    const newCouncilList = values.councils.map((council) => council)

    const removeCouncils = oldCouncilList.filter((value) => {
      return !getChurchIdsFromObject(newCouncilList).includes(value.id)
    })

    const addCouncils = values.councils.filter((value) => {
      return !getChurchIdsFromObject(oldCouncilList).includes(value.id)
    })

    removeCouncils.forEach(async (council) => {
      try {
        await CloseDownCouncil({
          variables: {
            streamId: streamId,
            councilId: council.id,
          },
        })
      } catch (error) {
        throwErrorMsg(error)
      }
    })

    addCouncils.forEach(async (council) => {
      try {
        if (council.stream) {
          await RemoveCouncilStream({
            variables: {
              streamId: council.stream.id,
              councilId: council.id,
            },
          })
        } else {
          //Council has no previous stream and is now joining. ie. RemoveCouncilStream won't run
          await LogCouncilHistory({
            variables: {
              councilId: council.id,
              newLeaderId: '',
              oldLeaderId: '',
              newstreamId: streamId,
              oldstreamId: '',
              historyRecord: `${council.name} Council has been started again under ${initialValues.name} Stream`,
            },
          })
        }

        await AddStreamCouncils({
          variables: {
            streamId: streamId,
            councilId: council.id,
          },
        })
      } catch (error) {
        throwErrorMsg(error)
      }
    })

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    navigate(`/stream/displaydetails`)
  }

  return (
    <StreamForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Update Stream Form`}
      loading={loading || !initialValues.name}
      newStream={false}
    />
  )
}

export default UpdateStream
