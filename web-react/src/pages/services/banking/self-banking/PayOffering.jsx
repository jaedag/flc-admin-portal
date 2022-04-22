import { useMutation, useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import { ServiceContext } from 'contexts/ServiceContext'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import {
  DISPLAY_OFFERING_DETAILS,
  PAY_OFFERING_MUTATION,
} from './bankingQueries'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { MOMO_NUM_REGEX, throwErrorMsg } from 'global-utils'
import FormikControl from 'components/formik-components/FormikControl'
import { MOBILE_NETWORK_OPTIONS } from 'pages/arrivals/arrivals-utils'
import SubmitButton from 'components/formik-components/SubmitButton'
import { Col, Container, Row } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { parseDate } from 'date-utils'

const PayOffering = (props) => {
  const { church } = props
  const { serviceRecordId } = useContext(ServiceContext)
  const { data, loading, error } = useQuery(DISPLAY_OFFERING_DETAILS, {
    variables: { serviceRecordId: serviceRecordId },
  })
  const [BankServiceOffering] = useMutation(PAY_OFFERING_MUTATION)
  const navigate = useNavigate()
  const service = data?.serviceRecords[0]

  const initialValues = {
    bankingDate: new Date().toISOString().slice(0, 10),
    income: service?.income,
    mobileNetwork: '',
    mobileNumber: '',
  }
  const validationSchema = Yup.object({
    mobileNumber: Yup.string().matches(
      MOMO_NUM_REGEX,
      `Enter a valid MoMo Number without spaces. eg. (02XXXXXXXX)`
    ),
    momoName: Yup.string().when('mobileNumber', {
      is: (mobileNumber) => mobileNumber && mobileNumber.length > 0,
      then: Yup.string().required('Please enter the Momo Name'),
    }),
    mobileNetwork: Yup.string().when('mobileNumber', {
      is: (mobileNumber) => mobileNumber && mobileNumber.length > 0,
      then: Yup.string().required('Please enter the Mobile Network'),
    }),
  })

  const onSubmit = async (values, onSubmitProps) => {
    const { setSubmitting } = onSubmitProps

    setSubmitting(true)
    try {
      BankServiceOffering({
        variables: {
          serviceRecordId: serviceRecordId,
          stream_name: service.stream_name,
          mobileNetwork: values.mobileNetwork,
          mobileNumber: values.mobileNumber,
          momoName: values.momoName,
        },
      })
    } catch (error) {
      throwErrorMsg(error)
    }

    navigate('/self-banking/confirm-payment')
    setSubmitting(false)
  }

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary loading={loading}>Offering Self-Banking</HeadingPrimary>
        <HeadingSecondary loading={loading}>
          {church?.name} {church?.__typename}
        </HeadingSecondary>
        <div>{`Banking Code: ${church?.bankingCode}`} </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <Row className="row-cols-1 row-cols-md-2 mt-2">
                <Col className="mb-2">
                  <small htmlFor="dateofservice" className="form-text label">
                    Date of Service
                  </small>
                  <HeadingPrimary>
                    {parseDate(service?.serviceDate.date)}
                  </HeadingPrimary>

                  <small htmlFor="dateofservice" className="form-text label">
                    Income
                  </small>
                  <div className="fw-bold">{service?.income} GHS</div>
                  <FormikControl
                    control="select"
                    name="mobileNetwork"
                    label="Mobile Network"
                    options={MOBILE_NETWORK_OPTIONS}
                  />
                  <FormikControl
                    control="input"
                    name="mobileNumber"
                    label="MoMo Number"
                    defaultOption="Choose a Network"
                  />
                  <FormikControl
                    control="input"
                    name="momoName"
                    label="MoMo Name"
                  />
                </Col>
              </Row>
              <div className="d-flex justify-content-center">
                <SubmitButton formik={formik}>Make Payment</SubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </BaseComponent>
  )
}

export default PayOffering
