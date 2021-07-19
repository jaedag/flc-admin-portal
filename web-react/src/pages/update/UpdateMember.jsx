import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'

import { parsePhoneNum, parseNeoDate } from '../../global-utils'
import { UPDATE_MEMBER_MUTATION } from './UpdateMutations'
import { DISPLAY_MEMBER } from '../display/ReadQueries'
import NavBar from '../../components/nav/NavBar'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
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

  const member = memberData?.members[0]
  console.log(member)
  const initialValues = {
    firstName: member?.firstName ?? '',
    middleName: member?.middleName ?? '',
    lastName: member?.lastName ?? '',
    gender: member?.gender?.gender ?? '',
    phoneNumber: member?.phoneNumber ? `+${member?.phoneNumber}` : '',
    whatsappNumber: member?.whatsappNumber ? `+${member?.whatsappNumber}` : '',
    email: member?.email ?? '',
    dob: member?.dob ? parseNeoDate(member.dob.date) : '',
    maritalStatus: member?.maritalStatus?.status ?? '',
    occupation: member?.occupation?.occupation ?? '',
    pictureUrl: member?.pictureUrl ?? '',
    bacenta: member?.bacenta ? member?.bacenta?.name : '',
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
    //Variables that are not controlled by formik

    const pastoralAppointment = filterPastoralTitles(values.pastoralAppointment)

    UpdateMember({
      variables: {
        id: memberId,
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
      AddMemberTitle({
        variables: {
          memberId: res.data.UpdateMemberDetails.id,
          title: pastoralAppointment.map((title) => title.title),
          status: true,
          date: pastoralAppointment.map((title) => title.date),
        },
      })

      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      history.push('/member/displaydetails')
    })
  }

  if (memberError || memberId === '') {
    return <ErrorScreen />
  } else if (memberLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else {
    return (
      <>
        <NavBar />
        <MemberForm
          title="Edit Member Details"
          initialValues={initialValues}
          onSubmit={onSubmit}
        />
      </>
    )
  }
}

export default UpdateMember
