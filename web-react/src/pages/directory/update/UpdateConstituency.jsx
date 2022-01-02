import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, throwErrorMsg } from '../../../global-utils'
import { GET_COUNCIL_CONSTITUENCIES } from '../../../queries/ListQueries'
import {
  UPDATE_CONSTITUENCY_MUTATION,
  ADD_CONSTITUENCY_COUNCIL,
  REMOVE_CONSTITUENCY_COUNCIL,
  REMOVE_BACENTA_CONSTITUENCY,
  ADD_CONSTITUENCY_BACENTAS,
} from './UpdateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { DISPLAY_CONSTITUENCY } from '../display/ReadQueries'
import { LOG_CONSTITUENCY_HISTORY, LOG_BACENTA_HISTORY } from './LogMutations'
import { MAKE_CONSTITUENCY_LEADER } from './ChangeLeaderMutations'
import ConstituencyForm from 'components/reusable-forms/ConstituencyForm'

const UpdateConstituency = () => {
  const { constituencyId, setCouncilId } = useContext(ChurchContext)
  const { data, loading } = useQuery(DISPLAY_CONSTITUENCY, {
    variables: { id: constituencyId },
  })

  const navigate = useNavigate()
  const constituency = data?.constituencies[0]

  const initialValues = {
    name: constituency?.name,
    leaderName: constituency?.leader?.fullName ?? '',
    leaderId: constituency?.leader?.id || '',
    councilSelect: constituency?.council?.id ?? '',
    bacentas: constituency?.bacentas?.length ? constituency.bacentas : [''],
  }

  const [LogConstituencyHistory] = useMutation(LOG_CONSTITUENCY_HISTORY, {
    refetchQueries: [
      { query: DISPLAY_CONSTITUENCY, variables: { id: constituencyId } },
    ],
  })
  const [LogBacentaHistory] = useMutation(LOG_BACENTA_HISTORY, {
    refetchQueries: [
      { query: DISPLAY_CONSTITUENCY, variables: { id: constituencyId } },
    ],
  })

  const [MakeConstituencyLeader] = useMutation(MAKE_CONSTITUENCY_LEADER)
  const [UpdateConstituency] = useMutation(UPDATE_CONSTITUENCY_MUTATION, {
    refetchQueries: [
      {
        query: GET_COUNCIL_CONSTITUENCIES,
        variables: { id: initialValues.council },
      },
    ],
  })

  //Changes downwards. ie. Bacenta Changes underneath constituency
  const [AddConstituencyBacentas] = useMutation(ADD_CONSTITUENCY_BACENTAS)
  const [RemoveBacentaConstituency] = useMutation(REMOVE_BACENTA_CONSTITUENCY, {
    onCompleted: (data) => {
      const prevConstituency = data.updateConstituencies.constituencies[0]
      const bacenta = data.updateBacentas.bacentas[0]
      let newConstituencyId = ''
      let oldConstituencyId = ''
      let historyRecord

      if (prevConstituency?.id === constituencyId) {
        //Bacenta has previous constituency which is current constituency and is going
        oldConstituencyId = constituencyId
        newConstituencyId = ''
        historyRecord = `${bacenta.name} Bacenta has been closed down under ${initialValues.name} Constituency`
      } else if (prevConstituency.id !== constituencyId) {
        //Bacenta has previous constituency which is not current constituency and is joining
        oldConstituencyId = prevConstituency.id
        newConstituencyId = constituencyId
        historyRecord = `${bacenta.name} Bacenta has been moved to ${initialValues.name} Constituency from ${prevConstituency.name} Constituency`
      }

      //After removing the bacenta from a constituency, then you log that change.
      LogBacentaHistory({
        variables: {
          bacentaId: bacenta.id,
          newLeaderId: '',
          oldLeaderId: '',
          newconstituencyId: newConstituencyId,
          oldconstituencyId: oldConstituencyId,
          historyRecord: historyRecord,
        },
      })
    },
  })

  //Changes upwards. it. Changes to the Council the Constituency Campus is under
  const [RemoveConstituencyCouncil] = useMutation(REMOVE_CONSTITUENCY_COUNCIL)
  const [AddConstituencyCouncil] = useMutation(ADD_CONSTITUENCY_COUNCIL, {
    onCompleted: (data) => {
      if (!constituency?.council.name) {
        //If There is no old Council
        let recordIfNoOldCouncil = `${initialValues.name} Constituency has been moved to ${data.updateConstituencies.constituencies[0].council.name} Council`

        LogConstituencyHistory({
          variables: {
            constituencyId: constituencyId,
            newLeaderId: '',
            oldLeaderId: '',
            newCouncilId:
              data.updateConstituencies.constituencies[0].council.id,
            oldCouncilId: constituency?.council.id,
            historyRecord: recordIfNoOldCouncil,
          },
        })
      } else {
        //If there is an old Council

        //Break Link to the Old Council
        RemoveConstituencyCouncil({
          variables: {
            councilId: initialValues.council,
            constituencyId: constituencyId,
          },
        })

        let recordIfOldCouncil = `${initialValues.name} Constituency has been moved from ${constituency?.council.name} Council to ${data.updateConstituencies.constituencies[0].council.name} Council`

        //After Adding the constituency to a council, then you log that change.
        LogConstituencyHistory({
          variables: {
            constituencyId: constituencyId,
            newLeaderId: '',
            oldLeaderId: '',
            newCouncilId:
              data.updateConstituencies.constituencies[0].council.id,
            oldCouncilId: constituency?.council.id,
            historyRecord: recordIfOldCouncil,
          },
        })
      }
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    setCouncilId(values.council)

    UpdateConstituency({
      variables: {
        constituencyId: constituencyId,
        name: values.name,
        councilId: values.council,
      },
    })

    //Log if Constituency Name Changes
    if (values.name !== initialValues.name) {
      LogConstituencyHistory({
        variables: {
          constituencyId: constituencyId,
          newLeaderId: '',
          oldLeaderId: '',
          oldCouncilId: '',
          newCouncilId: '',
          historyRecord: `Constituency name has been changed from ${initialValues.name} to ${values.name}`,
        },
      })
    }

    //Log if the Leader Changes
    if (values.leaderId !== initialValues.leaderId) {
      return MakeConstituencyLeader({
        variables: {
          oldLeaderId: initialValues.leaderId,
          newLeaderId: values.leaderId,
          constituencyId: constituencyId,
        },
      })
        .then(() => {
          alertMsg('Leader Changed Successfully')
          navigate(`/constituency/displaydetails`)
        })
        .catch((err) =>
          throwErrorMsg('There was a problem changing the CO', err)
        )
    }

    //Log if Council Changes
    if (values.council !== initialValues.council) {
      RemoveConstituencyCouncil({
        variables: {
          councilId: initialValues.council,
          constituencyId: constituencyId,
        },
      })
      AddConstituencyCouncil({
        variables: {
          councilId: values.council,
          constituencyId: constituencyId,
        },
      })
    }

    //For the Adding and Removing of Bacentas
    const oldBacentaList = initialValues.bacentas.map((bacenta) => {
      return bacenta.id
    })

    const newBacentaList = values.bacentas.map((bacenta) => {
      return bacenta.id ? bacenta.id : bacenta
    })

    const removeBacentas = oldBacentaList.filter((value) => {
      return !newBacentaList.includes(value)
    })

    const addBacentas = values.bacentas.filter((value) => {
      return !oldBacentaList.includes(value.id)
    })

    removeBacentas.forEach((bacenta) => {
      RemoveBacentaConstituency({
        variables: {
          constituencyId: constituencyId,
          bacentaId: bacenta,
        },
      })
    })

    addBacentas.forEach((bacenta) => {
      if (bacenta.constituency) {
        RemoveBacentaConstituency({
          variables: {
            constituencyId: bacenta.constituency.id,
            bacentaId: bacenta.id,
          },
        })
      } else {
        //Bacenta has no previous constituency and is now joining. ie. RemoveBacentaConstituency won't run
        LogBacentaHistory({
          variables: {
            bacentaId: bacenta.id,
            newLeaderId: '',
            oldLeaderId: '',
            newconstituencyId: constituencyId,
            oldconstituencyId: '',
            historyRecord: `${bacenta.name} Bacenta has been started again under ${initialValues.name} Constituency`,
          },
        })
      }

      AddConstituencyBacentas({
        variables: {
          constituencyId: constituencyId,
          bacentaId: bacenta.id,
        },
      })
    })

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    navigate(`/constituency/displaydetails`)
  }

  return (
    <ConstituencyForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Update Constituency Form`}
      loading={loading || !initialValues.name}
      newConstituency={false}
    />
  )
}

export default UpdateConstituency
