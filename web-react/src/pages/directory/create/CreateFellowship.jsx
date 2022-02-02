import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_FELLOWSHIP_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { NEW_FELLOWSHIP_LEADER } from './MakeLeaderMutations'
import FellowshipForm from 'components/reusable-forms/FellowshipForm'
import { throwErrorMsg } from 'global-utils'

const CreateFellowship = () => {
  const { clickCard, constituencyId, bacentaId, setFellowshipId } =
    useContext(ChurchContext)
  const navigate = useNavigate()

  const initialValues = {
    name: '',
    leaderId: '',
    constituencySelect: constituencyId ?? '',
    bacenta: bacentaId ?? '',
    meetingDay: '',
    vacationStatus: '',
    venueLatitude: '',
    venueLongitude: '',
  }

  const [NewFellowshipLeader] = useMutation(NEW_FELLOWSHIP_LEADER)
  const [CreateFellowship] = useMutation(CREATE_FELLOWSHIP_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    CreateFellowship({
      variables: {
        name: values.name,
        bacentaId: values.bacenta,
        meetingDay: values.meetingDay,
        leaderId: values.leaderId,
        venueLongitude: parseFloat(values.venueLongitude),
        venueLatitude: parseFloat(values.venueLatitude),
      },
    })
      .then((res) => {
        clickCard(res.data.CreateFellowship)
        NewFellowshipLeader({
          variables: {
            leaderId: values.leaderId,
            fellowshipId: res.data.CreateFellowship.id,
          },
        })
          .then(() => {
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
          })
          .catch((error) =>
            throwErrorMsg('There was an error setting the leader', error)
          )

        setFellowshipId(res.data.CreateFellowship.id)
        navigate('/fellowship/displaydetails')
      })
      .catch((error) =>
        throwErrorMsg('There was an error creating fellowship', error)
      )
  }
  return (
    <FellowshipForm
      title="Start a New Fellowship"
      initialValues={initialValues}
      onSubmit={onSubmit}
      newFellowship={true}
    />
  )
}

export default CreateFellowship
