import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { parsePhoneNum } from '../../global-utils'

import { UPDATE_MEMBER_MUTATION } from '../update/UpdateMutations'
import { DISPLAY_MEMBER } from '../display/ReadQueries'
import NavBar from '../../components/nav/NavBar'
import { MemberContext } from '../../contexts/MemberContext'
import MemberForm from '../../components/reusable-forms/MemberForm'
import BaseComponent from 'components/base-component/BaseComponent'

const UserProfileEditPage = () => {
  const { currentUser } = useContext(MemberContext)
  const history = useHistory()

  const {
    data: memberData,
    error: memberError,
    loading: memberLoading,
  } = useQuery(DISPLAY_MEMBER, {
    variables: { id: currentUser.id },
  })
  const member = memberData?.members[0]
  const initialValues = {
    firstName: member?.firstName ? member?.firstName : '',
    middleName: member?.middleName ? member?.middleName : '',
    lastName: member?.lastName ? member?.lastName : '',
    gender: member?.gender ? member?.gender.gender : '',
    phoneNumber: member?.phoneNumber ? `+${member?.phoneNumber}` : '',
    whatsappNumber: member?.whatsappNumber ? `+${member?.whatsappNumber}` : '',
    email: member?.email ? member?.email : '',
    dob: member?.dob ? member?.dob.date : '',
    maritalStatus: member?.maritalStatus ? member?.maritalStatus.status : '',
    occupation: member?.occupation ? member?.occupation.occupation : '',
    pictureUrl: member?.pictureUrl ? member?.pictureUrl : '',
    bacenta: member?.bacenta?.name ?? '',
    ministry: member?.ministry ? member?.ministry.id : '',

    pastoralHistory: [
      {
        historyRecord: '',
        historyDate: '',
      },
    ],
    pastoralAppointment: [
      {
        title: '',
        date: '',
      },
    ],
  }

  const [UpdateMember] = useMutation(UPDATE_MEMBER_MUTATION)

  const onSubmit = async (values, onSubmitProps) => {
    //Variables that are not controlled by formik

    UpdateMember({
      variables: {
        id: currentUser.id,
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
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
    })

    onSubmitProps.setSubmitting(false)
    history.push(`/user-profile`)
  }

  return (
    <BaseComponent
      loadingState={memberLoading}
      errorState={memberError || currentUser.id === ''}
      data={memberData}
    >
      <NavBar />
      <MemberForm
        title="Edit Your Details"
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </BaseComponent>
  )
}

export default UserProfileEditPage
