import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_BACENTA_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../contexts/ChurchContext'
import { NEW_BACENTA_LEADER } from './MakeLeaderMutations'
import BacentaForm from 'components/reusable-forms/BacentaForm'

const CreateBacenta = () => {
  const initialValues = {
    bacentaName: '',
    leaderId: '',
    townSelect: '',
    centreSelect: '',
    meetingDay: '',
    venueLatitude: '',
    venueLongitude: '',
  }

  const { clickCard, setBacentaId } = useContext(ChurchContext)

  const history = useHistory()

  const [NewBacentaLeader] = useMutation(NEW_BACENTA_LEADER)
  const [CreateBacenta] = useMutation(CREATE_BACENTA_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    CreateBacenta({
      variables: {
        bacentaName: values.bacentaName,
        centreId: values.centreSelect,
        meetingDay: values.meetingDay,
        leaderId: values.leaderId,
        venueLongitude: parseFloat(values.venueLongitude),
        venueLatitude: parseFloat(values.venueLatitude),
      },
    })
      .then((res) => {
        clickCard(res.data.CreateBacenta.id)
        NewBacentaLeader({
          variables: {
            leaderId: values.leaderId,
            bacentaId: res.data.CreateBacenta.id,
          },
        })
          .then(() => {
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
          })
          .catch((error) => alert('There was an error', error))

        setBacentaId(res.data.CreateBacenta.id)
        history.push('/bacenta/displaydetails')
      })
      .catch((error) => alert('There was an error', error))
  }
  return (
    <BacentaForm
      title="Start a New Bacenta"
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  )
}

export default CreateBacenta
