import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { parsePhoneNum } from '../../global-utils'
import {
  ADD_MEMBER_TITLE_MUTATION,
  CREATE_MEMBER_MUTATION,
} from './CreateMutations'
import NavBar from '../../components/nav/NavBar'
import { ChurchContext } from '../../contexts/ChurchContext'
import { MemberContext } from '../../contexts/MemberContext'
import MemberForm from '../../components/reusable-forms/MemberForm'

const CreateMember = () => {
  const initialValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    phoneNumber: '',
    whatsappNumber: '',
    email: '',
    dob: '',
    maritalStatus: '',
    occupation: '',
    pictureUrl: '',
    bacenta: '',
    ministry: '',

    pastoralHistory: [
      {
        historyRecord: '',
        historyDate: '',
      },
    ],
    pastoralAppointment: [
      {
        title: 'Pastor',
        date: '',
      },
      {
        title: 'Reverend',
        date: '',
      },
      {
        title: 'Bishop',
        date: '',
      },
    ],
  }

  const { clickCard } = useContext(ChurchContext)
  const { setMemberId } = useContext(MemberContext)

  //All of the Hooks!

  const [CreateMember] = useMutation(CREATE_MEMBER_MUTATION, {
    onCompleted: (newMemberData) => {
      clickCard(newMemberData.CreateMember)
      setMemberId(newMemberData.CreateMember.id)
    },
  })

  const [AddMemberTitle] = useMutation(ADD_MEMBER_TITLE_MUTATION)

  const history = useHistory()

  const onSubmit = async (values, onSubmitProps) => {
    const { setSubmitting, resetForm } = onSubmitProps
    // Variables that are not controlled by formik

    let pastoralAppointment = values.pastoralAppointment.filter(
      (pastoralAppointment) => {
        if (pastoralAppointment.date) {
          return pastoralAppointment
        }
        return null
      }
    )

    CreateMember({
      variables: {
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        gender: values.gender,
        phoneNumber: parsePhoneNum(values.phoneNumber),
        whatsappNumber: parsePhoneNum(values.whatsappNumber),
        email: values.email.trim(),
        dob: values.dob,
        maritalStatus: values.maritalStatus,
        occupation: values.occupation,
        pictureUrl: values.pictureUrl,

        bacenta: values.bacenta,
        ministry: values.ministry,
      },
    }).then((res) => {
      pastoralAppointment.forEach((apppointmentDetails) => {
        AddMemberTitle({
          variables: {
            memberId: res.data.CreateMember.id,
            title: apppointmentDetails.title,
            status: true,
            date: apppointmentDetails.date,
          },
        })
      })
      setSubmitting(false)
      resetForm()
      history.push('/member/displaydetails')
    })
  }

  return (
    <>
      <NavBar />
      <MemberForm
        title="Register a New Member"
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </>
  )
}

export default CreateMember
