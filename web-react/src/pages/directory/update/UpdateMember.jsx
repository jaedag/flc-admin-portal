import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'

import { parsePhoneNum, throwErrorMsg } from '../../../global-utils'
import { UPDATE_MEMBER_MUTATION } from './UpdateMutations'
import {
  DISPLAY_MEMBER_BIO,
  DISPLAY_MEMBER_CHURCH,
} from '../display/ReadQueries'

import { MemberContext } from '../../../contexts/MemberContext'
import MemberForm from '../../../components/reusable-forms/MemberForm'
import { ADD_MEMBER_TITLE_MUTATION } from 'pages/directory/create/CreateMutations'
import { filterPastoralTitles } from 'components/reusable-forms/form-utils'

const UpdateMember = () => {
  const { memberId } = useContext(MemberContext)

  const {
    data: memberData,
    error: memberError,
    loading: memberLoading,
  } = useQuery(DISPLAY_MEMBER_BIO, {
    variables: { id: memberId },
  })
  const { data: churchData } = useQuery(DISPLAY_MEMBER_CHURCH, {
    variables: { id: memberId },
  })
  const member = memberData?.members[0]
  const memberChurch = churchData?.members[0]

  const initialValues = {
    firstName: member?.firstName ?? '',
    middleName: member?.middleName ?? '',
    lastName: member?.lastName ?? '',
    gender: member?.gender?.gender ?? '',
    phoneNumber: member?.phoneNumber ? `+${member?.phoneNumber}` : '',
    whatsappNumber: member?.whatsappNumber ? `+${member?.whatsappNumber}` : '',
    email: member?.email ?? '',
    dob: member?.dob ? member.dob.date : '',
    maritalStatus: member?.maritalStatus?.status ?? '',
    occupation: member?.occupation?.occupation ?? '',
    pictureUrl: member?.pictureUrl ?? '',
    fellowship: memberChurch?.fellowship ? memberChurch?.fellowship?.name : '',
    ministry: memberChurch?.ministry ? memberChurch?.ministry?.id : '',

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

  const navigate = useNavigate()

  const [UpdateMember] = useMutation(UPDATE_MEMBER_MUTATION)
  const [AddMemberTitle] = useMutation(ADD_MEMBER_TITLE_MUTATION)

  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)

    //Variables that are not controlled by formik

    const pastoralAppointment = filterPastoralTitles(values.pastoralAppointment)

    UpdateMember({
      variables: {
        id: memberId,
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

          return AddMemberTitle({
            variables: {
              memberId: res.data.UpdateMemberDetails.id,
              title: title.title,
              status: true,
              date: title.date,
            },
          }).catch((error) =>
            throwErrorMsg(`There was a problem adding member title`, error)
          )
        })

        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        navigate('/member/displaydetails')
      })
      .catch((err) =>
        throwErrorMsg('There was an error creating the member profile\n', err)
      )
  }

  if (memberError) {
    throwErrorMsg(memberError)
  }

  return (
    <MemberForm
      title="Edit Member Details"
      initialValues={initialValues}
      onSubmit={onSubmit}
      loading={memberLoading}
      update
    />
  )
}

export default UpdateMember
