import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import {
  makeSelectOptions,
  parsePhoneNum,
  PHONE_NUM_REGEX_VALIDATION,
} from '../global-utils'
import FormikControl from '../components/formik-components/FormikControl.jsx'
import {
  ADD_MEMBER_TITLE_MUTATION,
  CREATE_MEMBER_MUTATION,
} from '../queries/CreateMutations'
import { HeadingBar } from '../components/HeadingBar'
import { NavBar } from '../components/nav/NavBar.jsx'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import Spinner from '../components/Spinner'
import { GET_MINISTRIES, BACENTA_DROPDOWN } from '../queries/ListQueries'
import { ChurchContext } from '../contexts/ChurchContext'
import { MemberContext } from '../contexts/MemberContext'
import PlusSign from '../components/buttons/PlusSign.jsx'
import MinusSign from '../components/buttons/MinusSign.jsx'

export const CreateMember = () => {
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

  const genderOptions = [
    { key: 'Male', value: 'Male' },
    { key: 'Female', value: 'Female' },
  ]
  const maritalStatusOptions = [
    { key: 'Single', value: 'Single' },
    { key: 'Married', value: 'Married' },
  ]

  const titleOptions = [
    { key: 'Pastor', value: 'Pastor' },
    { key: 'Reverend', value: 'Reverend' },
    { key: 'Bishop', value: 'Bishop' },
  ]

  const { clickCard } = useContext(ChurchContext)
  const { setMemberId } = useContext(MemberContext)

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is a required field'),
    lastName: Yup.string().required('Last Name is a required field'),
    gender: Yup.string().required('Gender is a required field'),
    email: Yup.string().email('Please enter a valid email address'),
    maritalStatus: Yup.string().required('Marital Status is a required field'),
    dob: Yup.string().required('Date of Birth is a required field'),
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
    bacenta: Yup.string().required('Bacenta is a required field'),
    ministry: Yup.string().required('Ministry is a required field'),
  })

  //All of the Hooks!
  const {
    data: ministryListData,
    loading: ministryListLoading,
    error: ministryListError,
  } = useQuery(GET_MINISTRIES)

  const [AddMemberTitle] = useMutation(ADD_MEMBER_TITLE_MUTATION, {
    onCompleted: (details) => {
      console.log(details)
    },
  })

  const [CreateMember] = useMutation(CREATE_MEMBER_MUTATION, {
    onCompleted: (newMemberData) => {
      clickCard(newMemberData.CreateMember)
      setMemberId(newMemberData.CreateMember.id)
    },
  })

  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const uploadImage = async (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'admin-portal')

    setLoading(true)

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/firstlovecenter/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
    setLoading(false)
  }

  const onSubmit = async (values, onSubmitProps) => {
    const { setSubmitting, resetForm } = onSubmitProps
    // Variables that are not controlled by formik
    values.pictureUrl = image

    //Formatting of phone number fields
    values.phoneNumber = parsePhoneNum(values.phoneNumber)
    values.whatsappNumber = parsePhoneNum(values.whatsappNumber)

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
        phoneNumber: values.phoneNumber,
        whatsappNumber: values.whatsappNumber,
        email: values.email,
        dob: values.dob,
        maritalStatus: values.maritalStatus,
        occupation: values.occupation,
        pictureUrl: values.pictureUrl,

        bacenta: values.bacenta,
        ministry: values.ministry,

        // pastoralAppointment: values.pastoralAppointment,
        // pastoralHistory: values.pastoralHistory,
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
    })

    setSubmitting(false)
    resetForm()
    history.push('/member/displaydetails')
  }

  if (ministryListLoading) {
    return <LoadingScreen />
  } else if (ministryListError) {
    return <ErrorScreen />
  } else {
    const ministryOptions = makeSelectOptions(ministryListData.ministryList)

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
                <div className="row row-cols-1">
                  {/* <!-- Basic Info Div --> */}
                  {/* Photo Upload with Cloudinary */}
                  <div className="row" />
                  <div className="col my-3">
                    <HeadingBar title="Basic Info" />
                    <div className="container text-center my-2">
                      {loading ? (
                        <div className="container my-3">
                          <Spinner />
                        </div>
                      ) : (
                        <div>
                          <img
                            src={image}
                            className="profile-img rounded my-3"
                            alt=""
                          />
                        </div>
                      )}
                      <label>
                        <input
                          style={{ display: 'none' }}
                          type="file"
                          name="picture"
                          placeholder="Upload an Image"
                          accept="image/png, image/jpeg"
                          onChange={uploadImage}
                        />
                        <p className="btn btn-primary btn-medium text-center mb-4">
                          Upload Picture
                        </p>
                      </label>
                    </div>
                    <p className="text-center text-danger">
                      <small>
                        Please note that * are required to submit the form
                      </small>
                    </p>
                    <div className="form-row row-cols-1 row-cols-md-2">
                      <div className="col-10">
                        <FormikControl
                          label="First Name*"
                          className="form-control"
                          control="input"
                          name="firstName"
                          placeholder="First Name"
                          aria-describedby="firstNameHelp"
                        />
                      </div>
                      <div className="col-10">
                        <FormikControl
                          label="Middle Name"
                          className="form-control"
                          control="input"
                          name="middleName"
                          placeholder="Other Names"
                          aria-describedby="middleNameHelp"
                        />
                      </div>
                      <div className="col-10">
                        <FormikControl
                          label="Last Name*"
                          className="form-control"
                          control="input"
                          name="lastName"
                          placeholder="Last Name"
                          aria-describedby="lastNameHelp"
                        />
                      </div>
                      <div className="col-10">
                        <FormikControl
                          label="Gender*"
                          className="form-control"
                          control="select"
                          name="gender"
                          placeholder="Gender"
                          options={genderOptions}
                          defaultOption="Gender"
                        />
                      </div>
                      <div className="col-10">
                        <FormikControl
                          label="Phone Number*"
                          className="form-control"
                          control="input"
                          placeholder="Eg. +233 241 23 456"
                          id="phoneNumber"
                          name="phoneNumber"
                        />
                      </div>
                      <div className="col-10">
                        <FormikControl
                          label="WhatsApp Number*"
                          className="form-control"
                          control="input"
                          placeholder="Eg. +233 241 23 456"
                          id="whatsappNumber"
                          name="whatsappNumber"
                        />
                      </div>
                    </div>

                    <div className="form-row row-cols-1 row-cols-md-2">
                      <div className="col-10">
                        <FormikControl
                          label="Marital Status*"
                          className="form-control"
                          control="select"
                          name="maritalStatus"
                          placeholder="Marital Status"
                          options={maritalStatusOptions}
                          defaultOption="Marital Status"
                        />
                      </div>
                      <div className="col-10">
                        <FormikControl
                          label="Occupation"
                          className="form-control"
                          control="input"
                          name="occupation"
                          placeholder="Occupation"
                          aria-describedby="occupationHelp"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-10">
                        <FormikControl
                          label="Email Address*"
                          className="form-control"
                          control="input"
                          name="email"
                          placeholder="Enter Email Address"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="col-10">
                        <small htmlFor="dateofbirth" className="form-text ">
                          Date of Birth*{' '}
                          <i className="text-secondary">(Day/Month/Year)</i>
                        </small>
                        <FormikControl
                          className="form-control"
                          control="input"
                          name="dob"
                          type="date"
                          placeholder="dd/mm/yyyy"
                          aria-describedby="dateofbirth"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!--End of Basic Info Section--> */}

                  {/* <!-- Beginning of Church Info Section--> */}
                  <div className="col my-4">
                    <HeadingBar title="Church Info" />

                    <div className="form-row row-cols-1 row-cols-md-2">
                      <div className="col-10">
                        <FormikControl
                          control="combobox"
                          label="Bacenta*"
                          name="bacenta"
                          modifier="id-only"
                          placeholder="Bacenta"
                          setFieldValue={formik.setFieldValue}
                          optionsQuery={BACENTA_DROPDOWN}
                          queryVariable="bacentaName"
                          suggestionText="name"
                          suggestionID="id"
                          dataset="bacentaDropdown"
                          aria-describedby="Bacenta Name"
                        />
                      </div>
                      <div className="col-10">
                        <FormikControl
                          className="form-control"
                          label="Ministry*"
                          control="select"
                          name="ministry"
                          options={ministryOptions}
                          defaultOption="Ministry"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!-- End of Church Info Section--> */}

                  {/* <!-- Beginning of Pastoral Appointments Section--> */}
                  <div className="col my-4">
                    <HeadingBar title="Pastoral Appointments (if any)" />
                    <FieldArray name="pastoralAppointment">
                      {(fieldArrayProps) => {
                        const { remove, form } = fieldArrayProps
                        const { values } = form
                        const { pastoralAppointment } = values

                        return (
                          <div>
                            {pastoralAppointment.map(
                              (pastoralAppointment, index) => (
                                <div key={index} className="form-row">
                                  <div className="col-auto">
                                    <FormikControl
                                      className="form-control"
                                      control="select"
                                      options={titleOptions}
                                      defaultOption="Title"
                                      name={`pastoralAppointment[${index}].title`}
                                    />
                                  </div>
                                  <div className="col">
                                    <FormikControl
                                      className="form-control"
                                      placeholder="Date"
                                      control="input"
                                      type="date"
                                      name={`pastoralAppointment[${index}].date`}
                                    />
                                  </div>
                                  <div className="col d-flex">
                                    {index > 0 && (
                                      <MinusSign onClick={() => remove()} />
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )
                      }}
                    </FieldArray>
                  </div>
                  {/* <!--End of Pastoral Appointments Section--> */}

                  {/* <!--Beginning of Pastoral History Section--> */}
                  <div className="col my-4">
                    <HeadingBar title="Pastoral History" />
                    <FieldArray name="pastoralHistory">
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps
                        const { values } = form
                        const { pastoralHistory } = values

                        return (
                          <div>
                            {pastoralHistory.map((pastoralHistory, index) => (
                              <div key={index} className="form-row row-cols">
                                <div className="col-7">
                                  <FormikControl
                                    className="form-control"
                                    placeholder="History Entry"
                                    control="input"
                                    name={`pastoralHistory[${index}].historyRecord`}
                                  />
                                </div>
                                <div className="col">
                                  <FormikControl
                                    className="form-control"
                                    placeholder="Year"
                                    control="input"
                                    name={`pastoralHistory[${index}].historyDate`}
                                  />
                                </div>
                                <div className="col d-flex">
                                  <PlusSign onClick={() => push()} />
                                  {index > 0 && (
                                    <MinusSign onClick={() => remove(index)} />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                      }}
                    </FieldArray>
                    <div className="row mt-4">
                      <div className="col d-flex justify-content-center">
                        <button
                          type="submit"
                          disabled={!formik.isValid || formik.isSubmitting}
                          className="btn btn-primary btn-medium my-3 text-center"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <!--End of Pastoral History Section--> */}
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </>
    )
  }
}
