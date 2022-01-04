import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_BACENTA_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_BACENTA_LEADER } from './MakeLeaderMutations'
import BacentaForm from '../../../components/reusable-forms/BacentaForm'
import { throwErrorMsg } from 'global-utils'

const CreateBacenta = () => {
  const { clickCard, constituencyId, setConstituencyId } =
    useContext(ChurchContext)
  const navigate = useNavigate()

  const initialValues = {
    name: '',
    leaderId: '',
    constituencySelect: constituencyId ?? '',
    fellowships: [''],
  }

  const [NewBacentaLeader] = useMutation(NEW_BACENTA_LEADER)
  const [CreateBacenta] = useMutation(CREATE_BACENTA_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false)
    setConstituencyId(values.constituencySelect)

    CreateBacenta({
      variables: {
        name: values.name,
        constituencyId: values.constituencySelect,
        leaderId: values.leaderId,
        fellowships: values.fellowships,
      },
    })
      .then((res) => {
        clickCard(res.data.CreateBacenta)
        NewBacentaLeader({
          variables: {
            leaderId: values.leaderId,
            bacentaId: res.data.CreateBacenta.id,
          },
        }).catch((error) =>
          throwErrorMsg('There was an error adding leader', error)
        )

        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        navigate('/bacenta/displaydetails')
      })
      .catch((error) =>
        throwErrorMsg('There was an error creating bacenta', error)
      )
  }

  return (
    <BacentaForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title="Start a New Bacenta"
      newBacenta={true}
    />
  )
}
export default CreateBacenta
