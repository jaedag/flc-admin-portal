import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_CENTRE_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../contexts/ChurchContext'
import { NEW_CENTRE_LEADER } from './MakeLeaderMutations'
import CentreForm from '../../components/reusable-forms/CentreForm'
import { throwErrorMsg } from 'global-utils'

const CreateCentre = () => {
  const initialValues = {
    centreName: '',
    leaderId: '',
    campusTownSelect: '',
    bacentas: [''],
  }

  const { church, clickCard, setTownId, setCampusId } =
    useContext(ChurchContext)
  const history = useHistory()

  const [NewCentreLeader] = useMutation(NEW_CENTRE_LEADER)
  const [CreateCentre] = useMutation(CREATE_CENTRE_MUTATION)

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    if (church.church === 'town') {
      setTownId(values.campusTownSelect)
    } else if (church.church === 'campus') {
      setCampusId(values.campusTownSelect)
    }

    CreateCentre({
      variables: {
        centreName: values.centreName,
        townCampusId: values.campusTownSelect,
        leaderId: values.leaderId,
        bacentas: values.bacentas,
      },
    })
      .then((res) => {
        clickCard(res.data.CreateCentre)
        NewCentreLeader({
          variables: {
            leaderId: values.leaderId,
            centreId: res.data.CreateCentre.id,
          },
        }).catch((error) =>
          throwErrorMsg('There was an error adding leader', error)
        )

        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        history.push('/centre/displaydetails')
      })
      .catch((error) =>
        throwErrorMsg('There was an error creating centre', error)
      )
  }

  return (
    <CentreForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title="Start a New Centre"
      newCentre={true}
    />
  )
}
export default CreateCentre
