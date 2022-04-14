import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { parsePhoneNum, throwErrorMsg } from '../../../global-utils'
import {
  ADD_MEMBER_TITLE_MUTATION,
  CREATE_MEMBER_MUTATION,
} from './CreateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import MemberForm from '../reusable-forms/MemberForm'
import { filterPastoralTitles } from 'pages/directory/reusable-forms/form-utils'

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
    fellowship: '',
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

  //All of the Hooks!

  const [CreateMember] = useMutation(CREATE_MEMBER_MUTATION, {
    onCompleted: (newMemberData) => {
      clickCard(newMemberData.CreateMember)
    },
  })

  const [AddMemberTitle] = useMutation(ADD_MEMBER_TITLE_MUTATION)

  const navigate = useNavigate()

  const onSubmit = async (values, onSubmitProps) => {
    const { setSubmitting, resetForm } = onSubmitProps
    setSubmitting(true)
    // Variables that are not controlled by formik

    const pastoralAppointment = filterPastoralTitles(values.pastoralAppointment)

    CreateMember({
      variables: {
        firstName: values.firstName.trim(),
        middleName: values.middleName.trim(),
        lastName: values.lastName.trim(),
        gender: values.gender,
        phoneNumber: parsePhoneNum(values.phoneNumber),
        whatsappNumber: parsePhoneNum(values.whatsappNumber),
        email: values.email.trim().toLowerCase(),
        dob: values.dob,
        maritalStatus: values.maritalStatus,
        occupation: values.occupation,
        pictureUrl: values.pictureUrl,

        fellowship: values.fellowship,
        ministry: values.ministry,
      },
    })
      .then((res) => {
        pastoralAppointment.forEach((title) => {
          if (!title.date) {
            return
          }

          AddMemberTitle({
            variables: {
              memberId: res.data.CreateMember.id,
              title: title.title,
              status: true,
              date: title.date,
            },
          }).catch((error) =>
            throwErrorMsg(`There was a problem adding member title`, error)
          )
        })

        setSubmitting(false)
        resetForm()
        navigate('/member/displaydetails')
      })
      .catch((err) =>
        throwErrorMsg('There was an error creating the member profile\n', err)
      )
  }

  return (
    <>
      <MemberForm
        title="Register a New Member"
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </>
  )
}

export default CreateMember
