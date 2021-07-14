import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  parsePhoneNum,
  PHONE_NUM_REGEX_VALIDATION,
  parseNeoDate,
} from '../../global-utils'
import { UPDATE_MEMBER_MUTATION } from './UpdateMutations'
import { DISPLAY_MEMBER } from '../display/ReadQueries'
import NavBar from '../../components/nav/NavBar'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
import { MemberContext } from '../../contexts/MemberContext'
import MemberForm from '../../components/reusable-forms/MemberForm'

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
        title: '',
        date: '',
      },
    ],
  }

  const history = useHistory()

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is a required field'),
    lastName: Yup.string().required('Last Name is a required field'),
    gender: Yup.string().required('Gender is a required field'),
    email: Yup.string().email('Please enter a valid email address'),
    maritalStatus: Yup.string().required('Marital Status is a required field'),
    dob: Yup.date()
      .max(new Date(), "You can't be born after today")
      .required('Date of Birth is a required field'),
    phoneNumber: Yup.string()
      .matches(
        PHONE_NUM_REGEX_VALIDATION,
        `Phone Number must start with + and country code (eg. '+233')`
      )
      .required('Phone Number is required'),
    whatsappNumber: Yup.string().matches(
      PHONE_NUM_REGEX_VALIDATION,
      `Phone Number must start with + and country code (eg. '+233')`
    ),
    bacenta: Yup.string().required('Please pick a bacenta from the dropdown'),
    ministry: Yup.string().required('Ministry is a required field'),
  })

  const [UpdateMember] = useMutation(UPDATE_MEMBER_MUTATION)

  const onSubmit = async (values, onSubmitProps) => {
    //Variables that are not controlled by formik

    UpdateMember({
      variables: {
        id: memberId,
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        gender: values.gender,
        phoneNumber: parsePhoneNum(values.phoneNumber),
        whatsappNumber: parsePhoneNum(values.whatsappNumber),
        email: values.email,
        dob: values.dob,
        maritalStatus: values.maritalStatus,
        occupation: values.occupation,
        pictureUrl: values.pictureUrl,

        bacenta: values.bacenta,
        ministry: values.ministry,
      },
    })

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    history.push('/member/displaydetails')
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <div className="body-card container body-container mt-5">
              <h3 className="my-3">Edit Member Details</h3>
              <Form className="form-group">
                <MemberForm formik={formik} initialValues={initialValues} />
              </Form>
            </div>
          )}
        </Formik>
      </>
    )
  }
}

export default UpdateMember
