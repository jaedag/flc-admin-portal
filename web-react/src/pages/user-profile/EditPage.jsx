import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { parsePhoneNum } from '../../global-utils'

import { UPDATE_MEMBER_MUTATION } from '../update/UpdateMutations'
import {
  DISPLAY_MEMBER_BIO,
  DISPLAY_MEMBER_CHURCH,
} from '../display/ReadQueries'

import { MemberContext } from '../../contexts/MemberContext'
import MemberForm from '../../components/reusable-forms/MemberForm'
import BaseComponent from 'components/base-component/BaseComponent'

const UserProfileEditPage = () => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const {
    data: memberData,
    error: memberError,
    loading: memberLoading,
  } = useQuery(DISPLAY_MEMBER_BIO, {
    variables: { id: currentUser.id },
  })
  const { data: churchData } = useQuery(DISPLAY_MEMBER_CHURCH, {
    variables: { id: currentUser.id },
  })
  const member = memberData?.members[0]
  const memberChurch = churchData?.members[0]

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
    fellowship: memberChurch?.fellowship?.name ?? '',
    ministry: memberChurch?.ministry ? memberChurch?.ministry.id : '',

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

        fellowship: values.fellowship,
        ministry: values.ministry,
      },
    })

    onSubmitProps.setSubmitting(false)
    navigate(`/user-profile`)
  }

  return (
    <BaseComponent
      loading={memberLoading}
      error={memberError || currentUser.id === ''}
      data={memberData}
    >
      <MemberForm
        title="Edit Your Details"
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </BaseComponent>
  )
}

export default UserProfileEditPage
