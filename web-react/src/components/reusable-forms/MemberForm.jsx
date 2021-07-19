import { useQuery } from '@apollo/client'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import React, { useContext } from 'react'
import RoleView from '../../auth/RoleView'
import { ChurchContext } from '../../contexts/ChurchContext'
import {
  GENDER_OPTIONS,
  makeSelectOptions,
  MARITAL_STATUS_OPTIONS,
  PHONE_NUM_REGEX_VALIDATION,
  TITLE_OPTIONS,
} from '../../global-utils'
import { GET_MINISTRIES } from '../../queries/ListQueries'
import MinusSign from '../buttons/MinusSign'
import PlusSign from '../buttons/PlusSign'
import ErrorScreen from '../ErrorScreen'
import { BISHOP_BACENTA_DROPDOWN } from '../formik-components/ComboboxQueries'
import FormikControl from '../formik-components/FormikControl'
import { HeadingBar } from '../HeadingBar/HeadingBar'
import Spinner from '../Spinner'

function MemberForm({ initialValues, onSubmit, title }) {
  const { bishopId } = useContext(ChurchContext)
  const { data: ministriesData, loading: ministriesLoading } = useQuery(
    GET_MINISTRIES
  )
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is a required field'),
    lastName: Yup.string().required('Last Name is a required field'),
    gender: Yup.string().required('Gender is a required field'),
    email: Yup.string().email('Please enter a valid email address').trim(),
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

  if (ministriesLoading) {
    return (
      <div className="text-center p-5 m-5">
        <Spinner />
      </div>
    )
  } else if (ministriesData) {
    const ministryOptions = makeSelectOptions(ministriesData.ministries)
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="body-card container body-container mt-5">
            <h3 className="my-3">{title}</h3>
            <Form className="form-group">
              <div className="row row-cols-1">
                {/* <!-- Basic Info Div --> */}
                {/* Photo Upload with Cloudinary */}
                <div className="row" />
                <div className="col my-3">
                  <HeadingBar title="Basic Info" />
                  <FormikControl
                    control="imageUpload"
                    name="pictureUrl"
                    initialValue={initialValues.pictureUrl}
                    uploadPreset={process.env.CLOUDINARY_MEMBERS}
                    placeholder="Upload an Image"
                    setFieldValue={formik.setFieldValue}
                    aria-describedby="ImageUpload"
                  />
                  <p className="text-center text-danger">
                    <small>
                      Please note that * are required to submit the form
                    </small>
                  </p>
                  <div className="form-row row-cols-1 row-cols-md-2 justify-content-center">
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
                        options={GENDER_OPTIONS}
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

                  <div className="form-row row-cols-1 row-cols-md-2 justify-content-center">
                    <div className="col-10">
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
                  <div className="form-row justify-content-center">
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

                  <div className="form-row row-cols-1 row-cols-md-2 justify-content-center">
                    <div className="col-10">
                      <FormikControl
                        control="combobox2"
                        name="bacenta"
                        label="Bacenta*"
                        placeholder="Bacenta Name"
                        setFieldValue={formik.setFieldValue}
                        optionsQuery={BISHOP_BACENTA_DROPDOWN}
                        queryVariable1="id"
                        variable1={bishopId}
                        queryVariable2="bacentaName"
                        suggestionText="name"
                        suggestionID="id"
                        church="bacenta"
                        aria-describedby="Bacenta Name"
                        className="form-control"
                        initialValue={initialValues?.bacenta || null}
                        error={formik.errors.bacenta && formik.errors.bacenta}
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
                <RoleView roles={['adminFederal', 'adminBishop']}>
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
                </RoleView>
                {/* <!--End of Pastoral Appointments Section--> */}

                {/* <!--Beginning of Pastoral History Section--> */}
                <RoleView roles={['adminFederal', 'adminBishop']}>
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
                    {/* <!--End of Pastoral History Section--> */}
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
              </div>
            </Form>
          </div>
        )}
      </Formik>
    )
  } else {
    return <ErrorScreen />
  }
}

export default MemberForm
