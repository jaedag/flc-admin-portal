import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'

import { parsePhoneNum, throwErrorMsg } from '../../global-utils'
import { UPDATE_MEMBER_MUTATION } from './UpdateMutations'
import { DISPLAY_MEMBER } from '../display/ReadQueries'

import { MemberContext } from '../../contexts/MemberContext'
import MemberForm from '../../components/reusable-forms/MemberForm'
import { ADD_MEMBER_TITLE_MUTATION } from 'pages/create/CreateMutations'
import { filterPastoralTitles } from 'components/reusable-forms/form-utils'

const UpdateMember = () => {
  const { memberId } = useContext(MemberContext)

  const {
    data: memberData,
    error: memberError,
    loading: memberLoading,
  } = useQuery(DISPLAY_MEMBER, {
    variables: { id: memberId },
  })
  const [isLoading, setIsLoading] = useState(false)
  const member = memberData?.members[0]

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
    fellowship: member?.fellowship ? member?.fellowship?.name : '',
    ministry: member?.ministry ? member?.ministry?.id : '',

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

  const history = useHistory()

  const [UpdateMember] = useMutation(UPDATE_MEMBER_MUTATION)
  const [AddMemberTitle] = useMutation(ADD_MEMBER_TITLE_MUTATION)

  const onSubmit = async (values, onSubmitProps) => {
    setIsLoading(true)
    const { setSubmitting, resetForm } = onSubmitProps
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

        setSubmitting(false)
        resetForm()
        history.push('/member/displaydetails')
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
      loading={memberLoading || isLoading}
      update
    />
  )
}

export default UpdateMember
