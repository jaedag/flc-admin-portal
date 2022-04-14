import { useQuery } from '@apollo/client'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import React, { useContext } from 'react'
import {
  GENDER_OPTIONS,
  isAuthorised,
  makeSelectOptions,
  MARITAL_STATUS_OPTIONS,
  PHONE_NUM_REGEX,
} from '../../../global-utils'
import { GET_MINISTRIES } from '../../../queries/ListQueries'
import ErrorScreen from '../../../components/base-component/ErrorScreen'
import FormikControl from '../../../components/formik-components/FormikControl'
import { HeadingPrimary } from '../../../components/HeadingPrimary/HeadingPrimary'
import { Col, Container, Row } from 'react-bootstrap'
import LoadingScreen from 'components/base-component/LoadingScreen'
import { permitAdmin } from 'permission-utils'
import SubmitButton from 'components/formik-components/SubmitButton'
import { MemberContext } from 'contexts/MemberContext'

const MemberForm = ({ initialValues, onSubmit, title, loading, update }) => {
  const { data: ministriesData, loading: ministriesLoading } =
    useQuery(GET_MINISTRIES)
  const { currentUser } = useContext(MemberContext)

  const canChangeEmail = () => {
    if (!update) {
      return true
    }
    if (update && isAuthorised(permitAdmin('Stream'), currentUser.roles)) {
      return true
    }

    return false
  }

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
    fellowship: Yup.object().required(
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
                    {canChangeEmail() && (
                      <Col sm={10}>
                        <FormikControl
                          label="Email Address*"
                          control="input"
                          name="email"
                          placeholder="Enter Email Address"
                          aria-describedby="emailHelp"
                        />
                      </Col>
                    )}

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
                        initialValue={initialValues?.fellowship?.name || null}
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

                <SubmitButton formik={formik} />
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
