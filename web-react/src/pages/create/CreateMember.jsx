import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { parsePhoneNum, throwErrorMsg } from '../../global-utils'
import {
  ADD_MEMBER_TITLE_MUTATION,
  CREATE_MEMBER_MUTATION,
} from './CreateMutations'
import NavBar from '../../components/nav/NavBar'
import { ChurchContext } from '../../contexts/ChurchContext'
import { MemberContext } from '../../contexts/MemberContext'
import MemberForm from '../../components/reusable-forms/MemberForm'
import { filterPastoralTitles } from 'components/reusable-forms/form-utils'

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

        bacenta: values.bacenta,
        ministry: values.ministry,
      },
    }).then((res) => {
      pastoralAppointment.forEach((title) => {
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

      // AddMemberTitle({
      //   variables: {
      //     memberId: res.data.CreateMember.id,
      //     title: pastoralAppointment.map((title) => title.title),
      //     status: true,
      //     date: pastoralAppointment.map((title) => title.date),
      //   },
      // }).catch((error) =>
      //   throwErrorMsg(`There was a problem creating member`, error)
      // )

      setSubmitting(false)
      resetForm()
    })
    history.push('/member/displaydetails')
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
