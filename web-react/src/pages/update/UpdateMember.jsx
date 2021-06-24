import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import {
  makeSelectOptions,
  parsePhoneNum,
  PHONE_NUM_REGEX_VALIDATION,
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  TITLE_OPTIONS,
  parseNeoDate,
} from '../../global-utils'
import FormikControl from '../../components/formik-components/FormikControl'
import { UPDATE_MEMBER_MUTATION } from '../../queries/UpdateMutations'
import { DISPLAY_MEMBER } from '../../queries/ReadQueries'
import { HeadingBar } from '../../components/HeadingBar/HeadingBar'
import NavBar from '../../components/nav/NavBar'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
import Spinner from '../../components/Spinner.jsx'
import {
  GET_MINISTRIES,
  BISHOP_BACENTA_DROPDOWN,
} from '../../queries/ListQueries'
import { MemberContext } from '../../contexts/MemberContext'
import PlusSign from '../../components/buttons/PlusSign'
import MinusSign from '../../components/buttons/MinusSign'
import { ChurchContext } from '../../contexts/ChurchContext'
import RoleView from '../../auth/RoleView'

const UpdateMember = () => {
  const { memberId } = useContext(MemberContext)
  const { bishopId } = useContext(ChurchContext)

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
    email: member?.email ? member?.email : '',
    dob: member?.dob ? parseNeoDate(member.dob.date) : '',
    maritalStatus: member?.maritalStatus ? member?.maritalStatus.status : '',
    occupation: member?.occupation?.occupation ?? '',
    pictureUrl: member?.pictureUrl ? member?.pictureUrl : '',
    bacenta: member?.bacenta ? member?.bacenta.name : '',
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

  //All of the Hooks!
  const {
    data: ministriesData,
    loading: ministriesLoading,
    error: ministriesError,
  } = useQuery(GET_MINISTRIES)

  const [UpdateMember] = useMutation(UPDATE_MEMBER_MUTATION)

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

  if (memberError || ministriesError || memberId === '') {
    return <ErrorScreen />
  } else if (memberLoading || ministriesLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else {
    const ministryOptions = makeSelectOptions(ministriesData.ministries)

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
                                : memberData.displayMember?.pictureUrl
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
                          label="First Name*"
                          className="form-control"
                          control="input"
                          name="firstName"
                          placeholder="First Name"
                          aria-describedby="firstNameHelp"
                        />
                      </div>
                      <div className="col">
                        <FormikControl
                          label="Middle Name"
                          className="form-control"
                          control="input"
                          name="middleName"
                          placeholder="Other Names"
                          aria-describedby="middleNameHelp"
                        />
                      </div>
                      <div className="col">
                        <FormikControl
                          label="Last Name*"
                          className="form-control"
                          control="input"
                          name="lastName"
                          placeholder="Last Name"
                          aria-describedby="lastNameHelp"
                        />
                      </div>
                      <div className="col">
                        <FormikControl
                          label="Gender*"
                          className="form-control"
                          control="select"
                          name="gender"
                          placeholder="Gender"
                          options={GENDER_OPTIONS}
                          defaultOption="Gender"
                        />
                      </div>
                      <div className="col">
                        <FormikControl
                          label="Phone Number*"
                          className="form-control"
                          control="input"
                          placeholder="Eg. +233 241 23 456"
                          id="phoneNumber"
                          name="phoneNumber"
                        />
                      </div>
                      <div className="col">
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

                    <div className="form-row row-cols-2">
                      <div className="col">
                        <FormikControl
                          label="Marital Status*"
                          className="form-control"
                          control="select"
                          name="maritalStatus"
                          placeholder="Marital Status"
                          options={MARITAL_STATUS_OPTIONS}
                          defaultOption="Marital Status"
                        />
                      </div>
                      <div className="col">
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
                      <div className="col-8">
                        <FormikControl
                          label="Email Address*"
                          className="form-control"
                          control="input"
                          name="email"
                          placeholder="Enter Email Address"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="col-8">
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

                    <div className="form-row row-cols-2">
                      <div className="col">
                        <FormikControl
                          control="combobox2"
                          name="bacenta"
                          label="Bacenta*"
                          placeholder={member.bacenta?.name ?? 'Bacenta Name'}
                          setFieldValue={formik.setFieldValue}
                          optionsQuery={BISHOP_BACENTA_DROPDOWN}
                          queryVariable1="id"
                          variable1={bishopId}
                          queryVariable2="bacentaName"
                          suggestionText="name"
                          suggestionID="id"
                          dataset="bishopBacentaDropdown"
                          aria-describedby="Bacenta Name"
                          className="form-control"
                        />
                      </div>
                      <div className="col">
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
                  <RoleView roles={['federalAdmin']}>
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
                                  <div
                                    key={index}
                                    className="form-row row-cols"
                                  >
                                    <div className="col">
                                      <FormikControl
                                        className="form-control"
                                        control="select"
                                        options={TITLE_OPTIONS}
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
                                      <MinusSign
                                        onClick={() => remove(index)}
                                      />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        }}
                      </FieldArray>
                    </div>
                  </RoleView>
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

export default UpdateMember
