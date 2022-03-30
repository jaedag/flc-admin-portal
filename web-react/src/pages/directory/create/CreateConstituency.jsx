import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { throwErrorMsg } from '../../../global-utils'
import { GET_COUNCIL_CONSTITUENCIES } from '../../../queries/ListQueries'
import { CREATE_CONSTITUENCY_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_CONSTITUENCY_LEADER } from './MakeLeaderMutations'
import ConstituencyForm from '../../../components/reusable-forms/ConstituencyForm'

const CreateConstituency = () => {
  const { clickCard, councilId, setConstituencyId, setCouncilId } =
    useContext(ChurchContext)

  const navigate = useNavigate()

  const initialValues = {
    name: '',
    leaderId: '',
    council: councilId,
    bacentas: [''],
  }

  const [NewConstituencyLeader] = useMutation(NEW_CONSTITUENCY_LEADER)
  const [CreateConstituency] = useMutation(CREATE_CONSTITUENCY_MUTATION, {
    refetchQueries: [
      { query: GET_COUNCIL_CONSTITUENCIES, variables: { id: councilId } },
    ],
    onCompleted: (newConstituencyData) => {
      setConstituencyId(newConstituencyData.CreateConstituency.id)
      navigate(`/constituency/displaydetails`)
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    setCouncilId(values.council)

    CreateConstituency({
      variables: {
        name: values.name,
        leaderId: values.leaderId,
        councilId: values.council,
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
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        navigate(`/constituency/displaydetails`)
      })
      .catch((error) => throwErrorMsg('There was an error', error))
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
