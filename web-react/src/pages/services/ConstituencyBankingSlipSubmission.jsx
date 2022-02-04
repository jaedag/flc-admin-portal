import FormikControl from 'components/formik-components/FormikControl'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { ServiceContext } from 'contexts/ServiceContext'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import React, { useContext } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import {
  BANKING_SLIP_SUBMISSION,
  CONSTITUENCY_SERVICE_RECORDS,
} from './ServicesQueries'
import { MemberContext } from 'contexts/MemberContext'
import { useMutation, useQuery } from '@apollo/client'
import HeadingSecondary from 'components/HeadingSecondary'
import BaseComponent from 'components/base-component/BaseComponent'
import { useNavigate } from 'react-router'
import { ChurchContext } from 'contexts/ChurchContext'
import { getHumanReadableDate } from 'global-utils'

const ConstituencyBankingSlipSubmission = () => {
  const { serviceRecordId } = useContext(ServiceContext)
  const { theme } = useContext(MemberContext)
  const { setConstituencyId } = useContext(ChurchContext)
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(CONSTITUENCY_SERVICE_RECORDS, {
    variables: { serviceId: serviceRecordId },
  })
  const constituency = data?.serviceRecords[0]?.serviceLog?.constituency[0]
  setConstituencyId(constituency?.id)
  const initialValues = {
    bankingSlip: '',
  }
  const [SubmitBankingSlip] = useMutation(BANKING_SLIP_SUBMISSION)

  const validationSchema = Yup.object({
    bankingSlip: Yup.string().required('You must upload a banking slip'),
  })

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    SubmitBankingSlip({
      variables: {
        serviceRecordId: serviceRecordId,
        bankingSlip: values.bankingSlip,
      },
    }).then(() => {
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()

      navigate(`/constituency/service-details`)
    })
  }

  return (
    <BaseComponent loading={loading} error={error} data={data && constituency}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount={true}
      >
        {(formik) => (
          <Container>
            <HeadingPrimary>Banking Slip Submission</HeadingPrimary>
            <HeadingSecondary>{constituency?.name}</HeadingSecondary>
            <p>
              Date of Joint Service Code:{' '}
              {getHumanReadableDate(data.serviceRecords[0].serviceDate.date)}
            </p>
            <p>Expected Income: {data.serviceRecords[0].income}</p>
            <Form>
              <Row className="row-cols-1 row-cols-md-2 mt-5">
                <Col className="mb-2">
                  <FormikControl
                    label="Upload a Picture of Your Banking Slip"
                    control="imageUpload"
                    name="bankingSlip"
                    uploadPreset={process.env.REACT_APP_CLOUDINARY_BANKING}
                    placeholder="Choose"
                    setFieldValue={formik.setFieldValue}
                    aria-describedby="UploadBankingSlip"
                  />
                </Col>

                <div className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className={`btn-main ${theme}`}
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Submit
                  </Button>
                </div>
              </Row>
            </Form>
          </Container>
        )}
      </Formik>
    </BaseComponent>
  )
}

export default ConstituencyBankingSlipSubmission
