import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwErrorMsg } from '../../global-utils'
import { GET_COUNCIL_CONSTITUENCIES } from '../../queries/ListQueries'
import { CREATE_CONSTITUENCY_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../contexts/ChurchContext'
import { NEW_CONSTITUENCY_LEADER } from './MakeLeaderMutations'
import ConstituencyForm from '../../components/reusable-forms/ConstituencyForm'

const CreateConstituency = () => {
  const { clickCard, councilId, setConstituencyId, setCouncilId } =
    useContext(ChurchContext)

  const history = useHistory()

  const initialValues = {
    name: '',
    leaderId: '',
    councilSelect: councilId,
    bacentas: [''],
  }

  const [NewConstituencyLeader] = useMutation(NEW_CONSTITUENCY_LEADER)
  const [CreateConstituency] = useMutation(CREATE_CONSTITUENCY_MUTATION, {
    refetchQueries: [
      { query: GET_COUNCIL_CONSTITUENCIES, variables: { id: councilId } },
    ],
    onCompleted: (newConstituencyData) => {
      setConstituencyId(newConstituencyData.CreateConstituency.id)
      history.push(`/constituency/displaydetails`)
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    setCouncilId(values.councilSelect)

    CreateConstituency({
      variables: {
        name: values.name,
        leaderId: values.leaderId,
        councilId: values.councilSelect,
        bacentas: values.bacentas,
      },
    })
      .then((res) => {
        clickCard(res.data.CreateConstituency)
        NewConstituencyLeader({
          variables: {
            leaderId: values.leaderId,
            constituencyId:
              res.data.CreateConstituency.council.constituencies[0].id,
          },
        }).catch((error) => {
          throwErrorMsg('There was an error adding leader', error)
        })

        history.push(`/constituency/displaydetails`)
      })
      .catch((error) => throwErrorMsg('There was an error', error))

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
  }

  return (
    <ConstituencyForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Create a New Constituency`}
      newConstituency={true}
    />
  )
}

export default CreateConstituency
