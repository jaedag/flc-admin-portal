import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { parsePhoneNum, PHONE_NUM_REGEX_VALIDATION } from '../../global-utils'
import {
  ADD_MEMBER_TITLE_MUTATION,
  CREATE_MEMBER_MUTATION,
} from '../../queries/CreateMutations'
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
        email: values.email,
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="body-card container body-container mt-5">
            <h3 className="my-3">Register a New Member</h3>
            <Form className="form-group">
              <MemberForm formik={formik} />
            </Form>
          </div>
        )}
      </Formik>
    </>
  )
}

export default CreateMember
