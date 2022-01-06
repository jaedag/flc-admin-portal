import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, throwErrorMsg } from '../../../global-utils'
import { GET_STREAM_COUNCILS } from '../../../queries/ListQueries'
import {
  UPDATE_COUNCIL_MUTATION,
  ADD_COUNCIL_STREAM,
  REMOVE_COUNCIL_STREAM,
  REMOVE_CONSTITUENCY_COUNCIL,
  ADD_COUNCIL_CONSTITUENCIES,
} from './UpdateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { DISPLAY_COUNCIL } from '../display/ReadQueries'
import { LOG_COUNCIL_HISTORY, LOG_CONSTITUENCY_HISTORY } from './LogMutations'
import { MAKE_COUNCIL_LEADER } from './ChangeLeaderMutations'
import CouncilForm from 'components/reusable-forms/CouncilForm'

const UpdateCouncil = () => {
  const { councilId, setStreamId } = useContext(ChurchContext)
  const { data, loading } = useQuery(DISPLAY_COUNCIL, {
    variables: { id: councilId },
  })

  const navigate = useNavigate()
  const council = data?.councils[0]

  const initialValues = {
    name: council?.name,
    leaderName: council?.leader?.fullName ?? '',
    leaderId: council?.leader?.id || '',
    stream: council?.stream?.id ?? '',
    constituencies: council?.constituencies?.length
      ? council.constituencies
      : [''],
  }

  const [LogCouncilHistory] = useMutation(LOG_COUNCIL_HISTORY, {
    refetchQueries: [{ query: DISPLAY_COUNCIL, variables: { id: councilId } }],
  })
  const [LogConstituencyHistory] = useMutation(LOG_CONSTITUENCY_HISTORY, {
    refetchQueries: [{ query: DISPLAY_COUNCIL, variables: { id: councilId } }],
  })

  const [MakeCouncilLeader] = useMutation(MAKE_COUNCIL_LEADER)
  const [UpdateCouncil] = useMutation(UPDATE_COUNCIL_MUTATION, {
    refetchQueries: [
      {
        query: GET_STREAM_COUNCILS,
        variables: { id: initialValues.stream },
      },
    ],
  })

  //Changes downwards. ie. Constituency Changes underneath council
  const [AddCouncilConstituencies] = useMutation(ADD_COUNCIL_CONSTITUENCIES)
  const [RemoveConstituencyCouncil] = useMutation(REMOVE_CONSTITUENCY_COUNCIL, {
    onCompleted: (data) => {
      const prevCouncil = data.updateConstituencies.constituencies[0]
      const constituency = data.updateConstituencies.constituencies[0]
      let newCouncilId = ''
      let oldCouncilId = ''
      let historyRecord

      if (prevCouncil?.id === councilId) {
        //Constituency has previous council which is current council and is going
        oldCouncilId = councilId
        newCouncilId = ''
        historyRecord = `${constituency.name} Constituency has been closed down under ${initialValues.name} Council`
      } else if (prevCouncil.id !== councilId) {
        //Constituency has previous council which is not current council and is joining
        oldCouncilId = prevCouncil.id
        newCouncilId = councilId
        historyRecord = `${constituency.name} Constituency has been moved to ${initialValues.name} Council from ${prevCouncil.name} Council`
      }

      //After removing the constituency from a council, then you log that change.
      LogConstituencyHistory({
        variables: {
          constituencyId: constituency.id,
          newLeaderId: '',
          oldLeaderId: '',
          newcouncilId: newCouncilId,
          oldcouncilId: oldCouncilId,
          historyRecord: historyRecord,
        },
      })
    },
  })

  //Changes upwards. it. Changes to the Stream the Council Campus is under
  const [RemoveCouncilStream] = useMutation(REMOVE_COUNCIL_STREAM)
  const [AddCouncilStream] = useMutation(ADD_COUNCIL_STREAM, {
    onCompleted: (data) => {
      if (!council?.stream.name) {
        //If There is no old Stream
        let recordIfNoOldStream = `${initialValues.name} Council has been moved to ${data.updateConstituencies.constituencies[0].stream.name} Stream`

        LogCouncilHistory({
          variables: {
            councilId: councilId,
            newLeaderId: '',
            oldLeaderId: '',
            newStreamId: data.updateConstituencies.constituencies[0].stream.id,
            oldStreamId: council?.stream.id,
            historyRecord: recordIfNoOldStream,
          },
        })
      } else {
        //If there is an old Stream

        //Break Link to the Old Stream
        RemoveCouncilStream({
          variables: {
            streamId: initialValues.stream,
            councilId: councilId,
          },
        })

        let recordIfOldStream = `${initialValues.name} Council has been moved from ${council?.stream.name} Stream to ${data.updateConstituencies.constituencies[0].stream.name} Stream`

        //After Adding the council to a stream, then you log that change.
        LogCouncilHistory({
          variables: {
            councilId: councilId,
            newLeaderId: '',
            oldLeaderId: '',
            newStreamId: data.updateConstituencies.constituencies[0].stream.id,
            oldStreamId: council?.stream.id,
            historyRecord: recordIfOldStream,
          },
        })
      }
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    setStreamId(values.stream)

    UpdateCouncil({
      variables: {
        councilId: councilId,
        name: values.name,
        streamId: values.stream,
      },
    })
      .then(() => {
        //Log if Council Name Changes
        if (values.name !== initialValues.name) {
          LogCouncilHistory({
            variables: {
              councilId: councilId,
              newLeaderId: '',
              oldLeaderId: '',
              oldStreamId: '',
              newStreamId: '',
              historyRecord: `Council name has been changed from ${initialValues.name} to ${values.name}`,
            },
          })
        }

        //Log if the Leader Changes
        if (values.leaderId !== initialValues.leaderId) {
          return MakeCouncilLeader({
            variables: {
              oldLeaderId: initialValues.leaderId || 'old-leader',
              newLeaderId: values.leaderId,
              councilId: councilId,
            },
          })
            .then(() => {
              alertMsg('Leader Changed Successfully')
              navigate(`/council/displaydetails`)
            })
            .catch((err) =>
              throwErrorMsg('There was a problem changing the Overseer', err)
            )
        }

        //Log if Stream Changes
        if (values.stream !== initialValues.stream) {
          RemoveCouncilStream({
            variables: {
              streamId: initialValues.stream,
              councilId: councilId,
            },
          })
          AddCouncilStream({
            variables: {
              streamId: values.stream,
              councilId: councilId,
            },
          })
        }

        //For the Adding and Removing of Constituencies
        const oldConstituencyList = initialValues.constituencies.map(
          (constituency) => {
            return constituency.id
          }
        )

        const newConstituencyList = values.constituencies.map(
          (constituency) => {
            return constituency.id ? constituency.id : constituency
          }
        )

        const removeConstituencies = oldConstituencyList.filter((value) => {
          return !newConstituencyList.includes(value)
        })

        const addConstituencies = values.constituencies.filter((value) => {
          return !oldConstituencyList.includes(value.id)
        })

        removeConstituencies.forEach((constituency) => {
          RemoveConstituencyCouncil({
            variables: {
              councilId: councilId,
              constituencyId: constituency,
            },
          })
        })

        addConstituencies.forEach((constituency) => {
          if (constituency.council) {
            RemoveConstituencyCouncil({
              variables: {
                councilId: constituency.council.id,
                constituencyId: constituency.id,
              },
            })
          } else {
            //Constituency has no previous council and is now joining. ie. RemoveConstituencyCouncil won't run
            LogConstituencyHistory({
              variables: {
                constituencyId: constituency.id,
                newLeaderId: '',
                oldLeaderId: '',
                newcouncilId: councilId,
                oldcouncilId: '',
                historyRecord: `${constituency.name} Constituency has been started again under ${initialValues.name} Council`,
              },
            })
          }

          AddCouncilConstituencies({
            variables: {
              councilId: councilId,
              constituencyId: constituency.id,
            },
          })
        })

        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        navigate(`/council/displaydetails`)
      })
      .catch((err) =>
        throwErrorMsg('There was a problem updating this council', err)
      )
  }

  return (
    <CouncilForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Update Council Form`}
      loading={loading || !initialValues.name}
      newCouncil={false}
    />
  )
}

export default UpdateCouncil
