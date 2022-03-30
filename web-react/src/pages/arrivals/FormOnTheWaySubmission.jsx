import FormikControl from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { Form, Formik, FieldArray } from 'formik'
import { useMutation, useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import * as Yup from 'yup'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { BACENTA_ARRIVALS } from './arrivalsQueries'
import { ChurchContext } from 'contexts/ChurchContext'
import BaseComponent from 'components/base-component/BaseComponent'
import PlusSign from 'components/buttons/PlusMinusSign/PlusSign'
import MinusSign from 'components/buttons/PlusMinusSign/MinusSign'
import {
  RECORD_BUSSING_FROM_BACENTA,
  SET_BUSSING_SUPPORT,
} from './arrivalsMutations'
import { MOMO_NUM_REGEX } from 'global-utils'
import { parseDate } from 'date-utils'
import { ServiceContext } from 'contexts/ServiceContext'
import { MOBILE_NETWORK_OPTIONS } from './arrivals-utils'

const FormOnTheWaySubmission = () => {
  const navigate = useNavigate()
  const { bacentaId, clickCard } = useContext(ChurchContext)
  const { bussingRecordId } = useContext(ServiceContext)
  const initialValues = {
    attendance: '',
    bussingPictures: [''],
    bussingCost: '',
    numberOfBusses: '',
    numberOfCars: '',
    mobileNetwork: '',
    momoName: '',
    momoNumber: '',
  }

  const { data, loading, error } = useQuery(BACENTA_ARRIVALS, {
    variables: { id: bacentaId },
  })

  const bacenta = data?.bacentas[0]
  const [RecordBussingFromBacenta] = useMutation(RECORD_BUSSING_FROM_BACENTA)
  const [SetBussingSupport] = useMutation(SET_BUSSING_SUPPORT)

  const validationSchema = Yup.object({
    attendance: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .integer('You cannot have attendance with decimals!')
      .required('This is a required field'),
    bussingPictures: Yup.array()
      .max(4, 'You cannot upload more than four pictures per bacenta')
      .of(Yup.string().required('You must upload a bussing picture')),
    bussingCost: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .required('This is a required field'),
    numberOfBusses: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .integer('You cannot have busses with decimals!')
      .required('This is a required field'),
    numberOfCars: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .integer('You cannot have busses with decimals!'),
    momoNumber: Yup.string().matches(
      MOMO_NUM_REGEX,
      `Enter a valid MoMo Number without spaces. eg. (02XXXXXXXX)`
    ),
    momoName: Yup.string().when('momoNumber', {
      is: (momoNumber) => momoNumber && momoNumber.length > 0,
      then: Yup.string().required('Please enter the Momo Name'),
    }),
    mobileNetwork: Yup.string().when('momoNumber', {
      is: (momoNumber) => momoNumber && momoNumber.length > 0,
      then: Yup.string().required('Please enter the Mobile Network'),
    }),
  })

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    RecordBussingFromBacenta({
      variables: {
        attendance: parseInt(values.attendance),
        bussingRecordId: bussingRecordId,
        bussingPictures: values.bussingPictures,
        bussingCost: parseFloat(values.bussingCost),
        numberOfBusses: parseInt(values.numberOfBusses),
        numberOfCars: parseInt(values.numberOfCars || 0),
        mobileNetwork: values.mobileNetwork,
        momoName: values.momoName,
        momoNumber: values.momoNumber,
      },
    }).then(async (res) => {
      clickCard(res.data.RecordBussingFromBacenta)
      await SetBussingSupport({
        variables: {
          bussingRecordId: bussingRecordId,
        },
      })

      onSubmitProps.resetForm()
      onSubmitProps.setSubmitting(false)
      navigate(`/bacenta/bussing-details`)
    })
  }

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount={true}
      >
        {(formik) => (
          <Container>
            <HeadingPrimary loading={loading}>
              Record Bussing Data
            </HeadingPrimary>
            <HeadingSecondary loading={loading}>
              {bacenta?.name} Bacenta
            </HeadingSecondary>
            <HeadingSecondary loading={loading}>
              Code of The Day:{' '}
            </HeadingSecondary>
            <HeadingPrimary className="fw-bold">
              {bacenta?.arrivalsCodeOfTheDay}
            </HeadingPrimary>

            <Form>
              <Row className="row-cols-1 row-cols-md-2 mt-2">
                <Col className="mb-2">
                  <small htmlFor="dateofservice" className="form-text label">
                    Date of Service
                  </small>
                  <HeadingPrimary>
                    {parseDate(bacenta?.bussing[0].serviceDate.date)}
                  </HeadingPrimary>

                  <FormikControl
                    control="input"
                    name="attendance"
                    label="Attendance*"
                  />
                  <FormikControl
                    control="input"
                    name="bussingCost"
                    label="Bussing Cost (in Cedis)*"
                  />

                  <FormikControl
                    control="input"
                    name="numberOfBusses"
                    label="Number of Busses *"
                  />
                  <FormikControl
                    control="input"
                    name="numberOfCars"
                    label="Number of Cars"
                  />
                  <FormikControl
                    control="select"
                    name="mobileNetwork"
                    label="Mobile Network"
                    options={MOBILE_NETWORK_OPTIONS}
                  />
                  <FormikControl
                    control="input"
                    name="momoNumber"
                    label="MoMo Number"
                    defaultOption="Choose a Network"
                  />
                  <FormikControl
                    control="input"
                    name="momoName"
                    label="MoMo Name"
                  />
                  <FieldArray name="bussingPictures">
                    {(fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps
                      const { values } = form
                      const { bussingPictures } = values

                      const pictureLimit = 4
                      return (
                        <>
                          {bussingPictures.map((bussingPicture, index) => (
                            <Row key={index} className="form-row">
                              <Col>
                                <FormikControl
                                  label="Upload A Bussing Picture"
                                  control="imageUpload"
                                  name={`bussingPictures[${index}]`}
                                  uploadPreset={
                                    process.env.REACT_APP_CLOUDINARY_BUSSING
                                  }
                                  placeholder="Choose"
                                  setFieldValue={formik.setFieldValue}
                                  aria-describedby="UploadBussingPicture"
                                />
                              </Col>
                              <Col className="col-auto d-flex">
                                {index < pictureLimit - 1 && (
                                  <PlusSign
                                    onClick={() =>
                                      bussingPictures.length < pictureLimit &&
                                      push()
                                    }
                                  />
                                )}
                                {index > 0 && (
                                  <MinusSign onClick={() => remove(index)} />
                                )}
                              </Col>
                            </Row>
                          ))}
                        </>
                      )
                    }}
                  </FieldArray>
                </Col>

                <div className="d-flex justify-content-center">
                  <SubmitButton formik={formik} />
                </div>
              </Row>
            </Form>
          </Container>
        )}
      </Formik>
    </BaseComponent>
  )
}

export default FormOnTheWaySubmission
