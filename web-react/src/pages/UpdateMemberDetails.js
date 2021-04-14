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

import { UPDATE_MEMBER_MUTATION } from '../queries//UpdateMutations'
import { DISPLAY_MEMBER } from '../queries/ReadQueries'
import { HeadingBar } from '../components/HeadingBar'
import { NavBar } from '../components/nav/NavBar.jsx'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import Spinner from '../components/Spinner'
import { GET_MINISTRIES, BACENTA_DROPDOWN } from '../queries/ListQueries'
import { MemberContext } from '../contexts/MemberContext'
import PlusSign from '../components/buttons/PlusSign.jsx'
import MinusSign from '../components/buttons/MinusSign.jsx'

export const UpdateMemberDetails = () => {
  const { memberId } = useContext(MemberContext)

  const {
    data: memberData,
    error: memberError,
    loading: memberLoading,
  } = useQuery(DISPLAY_MEMBER, {
    variables: { id: memberId },
  })

  const initialValues = {
    firstName: memberData.displayMember.firstName
      ? memberData.displayMember.firstName
      : '',
    middleName: memberData.displayMember.middleName
      ? memberData.displayMember.middleName
      : '',
    lastName: memberData.displayMember.lastName
      ? memberData.displayMember.lastName
      : '',
    gender: memberData.displayMember.gender
      ? memberData.displayMember.gender.gender
      : '',
    phoneNumber: memberData.displayMember.phoneNumber
      ? `+${memberData.displayMember.phoneNumber}`
      : '',
    whatsappNumber: memberData.displayMember.whatsappNumber
      ? `+${memberData.displayMember.whatsappNumber}`
      : '',
    email: memberData.displayMember.email ? memberData.displayMember.email : '',
    dob: memberData.displayMember.dob
      ? memberData.displayMember.dob.date.formatted
      : null,
    maritalStatus: memberData.displayMember.maritalStatus
      ? memberData.displayMember.maritalStatus.status
      : '',
    occupation: memberData.displayMember.occupation
      ? memberData.displayMember.occupation.occupation
      : '',
    pictureUrl: memberData.displayMember.pictureUrl
      ? memberData.displayMember.pictureUrl
      : '',
    bacenta: memberData.displayMember.bacenta
      ? memberData.displayMember.bacenta.name
      : '',
    ministry: memberData.displayMember.ministry
      ? memberData.displayMember.ministry.id
      : '',

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

  const history = useHistory()

  const validationSchema = Yup.object({
    firstName: Yup.string().required('This is a required field'),
    lastName: Yup.string().required('This is a required field'),
    gender: Yup.string().required('This is a required field'),
    email: Yup.string().email('Please enter a valid email address'),
    phoneNumber: Yup.string().matches(
      PHONE_NUM_REGEX_VALIDATION,
      `Phone Number must start with + and country code (eg. '+233')`
    ),
    whatsappNumber: Yup.string()
      .matches(
        PHONE_NUM_REGEX_VALIDATION,
        `Phone Number must start with + and country code (eg. '+233')`
      )
      .required('WhatsApp Number is required'),
    ministry: Yup.string().required('This is a required field'),
  })

  //All of the Hooks!
  const {
    data: ministryListData,
    loading: ministryListLoading,
    error: ministryListError,
  } = useQuery(GET_MINISTRIES)

  const [UpdateMemberDetails] = useMutation(UPDATE_MEMBER_MUTATION, {
    refetchQueries: [{ query: DISPLAY_MEMBER, variables: { id: memberId } }],
  })

  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

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
    //Variables that are not controlled by formik
    if (image) {
      values.pictureUrl = image
    }

    //Formatting of phone number fields
    values.phoneNumber = parsePhoneNum(values.phoneNumber)
    values.whatsappNumber = parsePhoneNum(values.whatsappNumber)

    UpdateMemberDetails({
      variables: {
        id: memberId,
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
      },
    })

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    history.push('/member/displaydetails')
  }

  if (memberError || ministryListError || memberId === '') {
    return <ErrorScreen />
  } else if (memberLoading || ministryListLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
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
              <h3 className="my-3">Edit Member Details</h3>
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
                            src={
                              image
                                ? image
                                : memberData.displayMember.pictureUrl
                            }
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
                    <div className="form-row row-cols-2">
                      <div className="col">
                        <FormikControl
                          className="form-control"
                          control="input"
                          name="firstName"
                          placeholder="First Name*"
                          aria-describedby="firstNameHelp"
                        />
                      </div>
                      <div className="col">
                        <FormikControl
                          className="form-control"
                          control="input"
                          name="middleName"
                          placeholder="Other Names"
                          aria-describedby="middleNameHelp"
                        />
                      </div>
                      <div className="col">
                        <FormikControl
                          className="form-control"
                          control="input"
                          name="lastName"
                          placeholder="Last Name"
                          aria-describedby="lastNameHelp"
                        />
                      </div>
                      <div className="col">
                        <FormikControl
                          className="form-control"
                          control="select"
                          name="gender"
                          placeholder="Gender"
                          options={genderOptions}
                          defaultOption="Gender"
                        />
                      </div>
                      <div className="col">
                        <FormikControl
                          className="form-control"
                          control="input"
                          placeholder="Enter phone number"
                          id="phoneNumber"
                          name="phoneNumber"
                        />
                      </div>
                      <div className="col">
                        <FormikControl
                          className="form-control"
                          control="input"
                          placeholder="Enter Your WhatsApp number"
                          id="whatsappNumber"
                          name="whatsappNumber"
                        />
                      </div>
                    </div>

                    <div className="form-row row-cols-2">
                      <div className="col">
                        <FormikControl
                          className="form-control"
                          control="select"
                          name="maritalStatus"
                          placeholder="Marital Status"
                          options={maritalStatusOptions}
                          defaultOption="Marital Status"
                        />
                      </div>
                      <div className="col">
                        <FormikControl
                          className="form-control"
                          control="input"
                          name="occupation"
                          placeholder="Occupation"
                          aria-describedby="occupationHelp"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-8">
                        <FormikControl
                          className="form-control"
                          control="input"
                          name="email"
                          placeholder="Enter Email Address"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="col-8">
                        <small
                          htmlFor="dateofbirth"
                          className="form-text text-muted"
                        >
                          Date of Birth
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

                    <div className="form-row row-cols-2">
                      <div className="col">
                        <FormikControl
                          control="combobox"
                          name="bacenta"
                          modifier="id-only"
                          initValue={initialValues.bacenta}
                          placeholder="Bacenta name"
                          setFieldValue={formik.setFieldValue}
                          optionsQuery={BACENTA_DROPDOWN}
                          queryVariable="bacentaName"
                          suggestionText="name"
                          suggestionID="id"
                          dataset="bacentaDropdown"
                          aria-describedby="bacenta Name"
                        />
                      </div>
                      <div className="col">
                        <FormikControl
                          className="form-control"
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
                        const { push, remove, form } = fieldArrayProps
                        const { values } = form
                        const { pastoralAppointment } = values

                        return (
                          <div>
                            {pastoralAppointment.map(
                              (pastoralAppointment, index) => (
                                <div key={index} className="form-row row-cols">
                                  <div className="col">
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
                                    {index < 3 && (
                                      <PlusSign onClick={() => push()} />
                                    )}

                                    {index > 0 && (
                                      <MinusSign
                                        onClick={() => remove(index)}
                                      />
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
