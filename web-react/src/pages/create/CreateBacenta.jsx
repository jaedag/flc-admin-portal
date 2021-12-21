import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_BACENTA_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../contexts/ChurchContext'
import { NEW_BACENTA_LEADER } from './MakeLeaderMutations'
import BacentaForm from '../../components/reusable-forms/BacentaForm'
import { throwErrorMsg } from 'global-utils'

const CreateBacenta = () => {
  const initialValues = {
    name: '',
    leaderId: '',
    campusTownSelect: '',
    fellowships: [''],
  }

  const { church, clickCard, setTownId, setCampusId } =
    useContext(ChurchContext)
  const history = useHistory()

  const [NewBacentaLeader] = useMutation(NEW_BACENTA_LEADER)
  const [CreateBacenta] = useMutation(CREATE_BACENTA_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    if (church.church === 'town') {
      setTownId(values.campusTownSelect)
    } else if (church.church === 'campus') {
      setCampusId(values.campusTownSelect)
    }

    CreateBacenta({
      variables: {
        name: values.name,
        townCampusId: values.campusTownSelect,
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
        history.push('/bacenta/displaydetails')
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
