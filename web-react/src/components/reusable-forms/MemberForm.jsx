import { useQuery } from '@apollo/client'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import RoleView from '../../auth/RoleView'
import {
  GENDER_OPTIONS,
  makeSelectOptions,
  MARITAL_STATUS_OPTIONS,
  PHONE_NUM_REGEX,
  TITLE_OPTIONS,
} from '../../global-utils'
import { GET_MINISTRIES } from '../../queries/ListQueries'
import MinusSign from '../buttons/PlusMinusSign/MinusSign'
import PlusSign from '../buttons/PlusMinusSign/PlusSign'
import ErrorScreen from '../base-component/ErrorScreen'
import FormikControl from '../formik-components/FormikControl'
import { HeadingPrimary } from '../HeadingPrimary/HeadingPrimary'
import { Col, Container, Row } from 'react-bootstrap'
import LoadingScreen from 'components/base-component/LoadingScreen'
import SubmitButton from 'components/formik-components/SubmitButton'
import { permitAdmin } from 'permission-utils'

function MemberForm({ initialValues, onSubmit, title, loading }) {
  const { data: ministriesData, loading: ministriesLoading } =
    useQuery(GET_MINISTRIES)

  const validationSchema = Yup.object({
    pictureUrl: Yup.string().required('You must upload a picture'),
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
        PHONE_NUM_REGEX,
        `Phone Number must start with + and country code (eg. '+233')`
      )
      .required('Phone Number is required'),
    whatsappNumber: Yup.string().matches(
      PHONE_NUM_REGEX,
      `Phone Number must start with + and country code (eg. '+233')`
    ),
    fellowship: Yup.string().required(
      'Please pick a fellowship from the dropdown'
    ),
  })

  if (ministriesLoading || loading) {
    return <LoadingScreen />
  } else if (ministriesData) {
    const ministryOptions = makeSelectOptions(ministriesData.ministries)
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => (
          <Container>
            <h3 className="my-3 text-center">{title}</h3>
            <Form className="form-group">
              <Row className="row-cols-1">
                {/* <!-- Basic Info Div --> */}
                {/* Photo Upload with Cloudinary */}
                <Col className="my-3">
                  <FormikControl
                    control="imageUpload"
                    name="pictureUrl"
                    initialValue={initialValues.pictureUrl}
                    uploadPreset={process.env.REACT_APP_CLOUDINARY_MEMBERS}
                    placeholder="Upload New Picture"
                    setFieldValue={formik.setFieldValue}
                    aria-describedby="ImageUpload"
                  />
                  <p className="text-center text-danger">
                    <small>
                      Please note that * are required to submit the form
                    </small>
                  </p>

                  <div className="form-row row-cols-1 row-cols-md-2 justify-content-center">
                    <HeadingPrimary className="mb-4">Basic Info</HeadingPrimary>
                    <Col sm={10}>
                      <FormikControl
                        label="First Name*"
                        control="input"
                        name="firstName"
                        placeholder="First Name"
                        aria-describedby="firstNameHelp"
                      />
                    </Col>
                    <Col sm={10}>
                      <FormikControl
                        label="Middle Name"
                        control="input"
                        name="middleName"
                        placeholder="Other Names"
                        aria-describedby="middleNameHelp"
                      />
                    </Col>
                    <Col sm={10}>
                      <FormikControl
                        label="Last Name*"
                        control="input"
                        name="lastName"
                        placeholder="Last Name"
                        aria-describedby="lastNameHelp"
                      />
                    </Col>
                    <Col sm={10}>
                      <FormikControl
                        label="Gender*"
                        control="select"
                        name="gender"
                        placeholder="Gender"
                        options={GENDER_OPTIONS}
                        defaultOption="Gender"
                      />
                    </Col>
                    <Col sm={10}>
                      <FormikControl
                        label="Phone Number*"
                        control="input"
                        placeholder="Eg. +233 241 23 456"
                        id="phoneNumber"
                        name="phoneNumber"
                      />
                    </Col>
                    <Col sm={10}>
                      <FormikControl
                        label="WhatsApp Number*"
                        control="input"
                        placeholder="Eg. +233 241 23 456"
                        id="whatsappNumber"
                        name="whatsappNumber"
                      />
                    </Col>
                  </div>

                  <div className="form-row row-cols-1 row-cols-md-2 justify-content-center">
                    <Col sm={10}>
                      <FormikControl
                        label="Marital Status*"
                        control="select"
                        name="maritalStatus"
                        placeholder="Marital Status"
                        options={MARITAL_STATUS_OPTIONS}
                        defaultOption="Marital Status"
                      />
                    </Col>
                    <Col sm={10}>
                      <FormikControl
                        label="Occupation"
                        control="input"
                        name="occupation"
                        placeholder="Occupation"
                        aria-describedby="occupationHelp"
                      />
                    </Col>
                  </div>

                  <div className="form-row justify-content-center">
                    <Col sm={10}>
                      <FormikControl
                        label="Email Address*"
                        control="input"
                        name="email"
                        placeholder="Enter Email Address"
                        aria-describedby="emailHelp"
                      />
                    </Col>

                    <Col sm={10}>
                      <small htmlFor="dateofbirth" className="form-text ">
                        Date of Birth*{' '}
                        <i className="text-secondary">(Day/Month/Year)</i>
                      </small>
                      <FormikControl
                        control="input"
                        name="dob"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        aria-describedby="dateofbirth"
                      />
                    </Col>
                  </div>
                </Col>
                {/* <!--End of Basic Info Section--> */}

                {/* <!-- Beginning of Church Info Section--> */}
                <div className="col my-4">
                  <HeadingPrimary>Church Info</HeadingPrimary>

                  <div className="form-row row-cols-1 row-cols-md-2 justify-content-center">
                    <Col sm={10}>
                      <FormikControl
                        control="fellowshipSearch"
                        name="fellowship"
                        label="Fellowship*"
                        placeholder="Start Typing"
                        setFieldValue={formik.setFieldValue}
                        aria-describedby="Fellowship Name"
                        initialValue={initialValues?.fellowship || null}
                        error={
                          formik.errors.fellowship && formik.errors.fellowship
                        }
                      />
                    </Col>
                    <Col sm={10}>
                      <FormikControl
                        label="Ministry"
                        control="select"
                        name="ministry"
                        options={ministryOptions}
                        defaultOption="Ministry"
                      />
                    </Col>
                  </div>
                </div>
                {/* <!-- End of Church Info Section--> */}

                {/* <!-- Beginning of Pastoral Appointments Section--> */}
                <RoleView roles={permitAdmin('GatheringService')}>
                  <Col className="my-4">
                    <HeadingPrimary>
                      Pastoral Appointments (if any)
                    </HeadingPrimary>
                    <FieldArray name="pastoralAppointment">
                      {(fieldArrayProps) => {
                        const { remove, form } = fieldArrayProps
                        const { values } = form
                        const { pastoralAppointment } = values

                        return (
                          <>
                            {pastoralAppointment.map(
                              (pastoralAppointment, index) => (
                                <Row key={index} className="form-row">
                                  <Col className="col-auto">
                                    <FormikControl
                                      control="select"
                                      options={TITLE_OPTIONS}
                                      defaultOption="Title"
                                      name={`pastoralAppointment[${index}].title`}
                                    />
                                  </Col>
                                  <Col>
                                    <FormikControl
                                      placeholder="Date"
                                      control="input"
                                      type="date"
                                      name={`pastoralAppointment[${index}].date`}
                                    />
                                  </Col>
                                  <Col className="col d-flex">
                                    {index > 0 && (
                                      <MinusSign onClick={() => remove()} />
                                    )}
                                  </Col>
                                </Row>
                              )
                            )}
                          </>
                        )
                      }}
                    </FieldArray>
                  </Col>
                </RoleView>
                {/* <!--End of Pastoral Appointments Section--> */}

                {/* <!--Beginning of Pastoral History Section--> */}
                <RoleView roles={permitAdmin('GatheringService')}>
                  <Col className="my-4">
                    <HeadingPrimary>Pastoral History</HeadingPrimary>
                    <FieldArray name="pastoralHistory">
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps
                        const { values } = form
                        const { pastoralHistory } = values

                        return (
                          <div>
                            {pastoralHistory.map((pastoralHistory, index) => (
                              <Row key={index} className="form-row">
                                <Col className="col-7">
                                  <FormikControl
                                    placeholder="History Entry"
                                    control="input"
                                    name={`pastoralHistory[${index}].historyRecord`}
                                  />
                                </Col>
                                <Col>
                                  <FormikControl
                                    placeholder="Year"
                                    control="input"
                                    name={`pastoralHistory[${index}].historyDate`}
                                  />
                                </Col>
                                <Col className="d-flex">
                                  <PlusSign onClick={() => push()} />
                                  {index > 0 && (
                                    <MinusSign onClick={() => remove(index)} />
                                  )}
                                </Col>
                              </Row>
                            ))}
                          </div>
                        )
                      }}
                    </FieldArray>
                    {/* <!--End of Pastoral History Section--> */}
                  </Col>
                </RoleView>

                <Col>
                  <SubmitButton formik={formik} />
                </Col>
              </Row>
            </Form>
          </Container>
        )}
      </Formik>
    )
  } else {
    return <ErrorScreen />
  }
}

export default MemberForm
