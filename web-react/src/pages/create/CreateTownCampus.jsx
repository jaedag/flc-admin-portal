import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { capitalise, throwErrorMsg } from '../../global-utils'
import {
  GET_COUNCIL_TOWNS,
  GET_BISHOP_CAMPUSES,
} from '../../queries/ListQueries'
import { CREATE_TOWN_MUTATION, CREATE_CAMPUS_MUTATION } from './CreateMutations'
import { ChurchContext } from '../../contexts/ChurchContext'
import { NEW_CAMPUS_LEADER, NEW_TOWN_LEADER } from './MakeLeaderMutations'
import CampusTownForm from '../../components/reusable-forms/CampusTownForm'

const CreateTownCampus = () => {
  const { church, clickCard, bishopId, setTownId, setBishopId } = useContext(
    ChurchContext
  )

  const history = useHistory()

  const initialValues = {
    campusTownName: '',
    leaderId: '',
    bishopSelect: '',
    centres: [''],
  }

  const [NewTownLeader] = useMutation(NEW_TOWN_LEADER)
  const [CreateTown] = useMutation(CREATE_TOWN_MUTATION, {
    refetchQueries: [{ query: GET_COUNCIL_TOWNS, variables: { id: bishopId } }],
    onCompleted: (newTownData) => {
      setTownId(newTownData.CreateTown.id)
      history.push(`/${church.church}/displaydetails`)
    },
  })

  const [NewCampusLeader] = useMutation(NEW_CAMPUS_LEADER)
  const [CreateCampus] = useMutation(CREATE_CAMPUS_MUTATION, {
    refetchQueries: [
      { query: GET_BISHOP_CAMPUSES, variables: { id: bishopId } },
    ],
  })

  //onSubmit receives the form state as argument
  const onSubmit = (values, onSubmitProps) => {
    setBishopId(values.bishopSelect)

    if (church.church === 'town') {
      CreateTown({
        variables: {
          townName: values.campusTownName,
          leaderId: values.leaderId,
          bishopId: values.bishopSelect,
          centres: values.centres,
        },
      })
        .then((res) => {
          clickCard(res.data.CreateTown.bishop.isBishopForTown[0])
          NewTownLeader({
            variables: {
              leaderId: values.leaderId,
              townId: res.data.CreateTown.bishop.isBishopForTown[0].id,
            },
          }).catch((error) => {
            throwErrorMsg('There was an error adding leader', error)
          })

          history.push(`/${church.church}/displaydetails`)
        })
        .catch((error) => throwErrorMsg('There was an error', error))
    } else if (church.church === 'campus') {
      CreateCampus({
        variables: {
          campusName: values.campusTownName,
          leaderId: values.leaderId,
          bishopId: values.bishopSelect,
          centres: values.centres,
        },
      })
        .then((res) => {
          clickCard(res.data.CreateCampus.bishop.isBishopForCampus[0])
          NewCampusLeader({
            variables: {
              leaderId: values.leaderId,
              campusId: res.data.CreateCampus.bishop.isBishopForCampus[0].id,
            },
          }).catch((error) => {
            throwErrorMsg('There was an error adding leader', error)
          })

          history.push(`/${church.church}/displaydetails`)
        })
        .catch((error) => {
          throwErrorMsg('There was an error creating campus', error)
        })
    }

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
  }

  return (
    <CampusTownForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Create a New ${capitalise(church.church)}`}
      newConstituency={true}
    />
  )
}

export default CreateTownCampus
