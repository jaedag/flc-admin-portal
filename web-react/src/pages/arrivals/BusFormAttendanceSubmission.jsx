import { useMutation, useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import { ServiceContext } from 'contexts/ServiceContext'
import { Formik, Form } from 'formik'
import { transformCloudinaryImg } from 'global-utils'
import React from 'react'
import * as Yup from 'yup'
import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { DISPLAY_BUSSING_RECORDS } from './arrivalsQueries'
import { CONFIRM_BUSSING_BY_ADMIN } from './arrivalsMutations'
import { useNavigate } from 'react-router'
import FormikControl from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'

const BusFormAttendanceSubmission = () => {
  const navigate = useNavigate()
  const { bacentaId } = useContext(ChurchContext)
  const { bussingRecordId } = useContext(ServiceContext)

  const { data, loading, error } = useQuery(DISPLAY_BUSSING_RECORDS, {
    variables: { bussingRecordId: bussingRecordId, bacentaId: bacentaId },
  })
  const [ConfirmBussingByAdmin] = useMutation(CONFIRM_BUSSING_BY_ADMIN)

  const bussing = data?.bussingRecords[0]
  const church = data?.bacentas[0]
  const initialValues = {
    attendance: '',
    bussingTopUp: '',
  }

  const validationSchema = Yup.object({
    bussingTopUp: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .required('This is a required field'),
    attendance: Yup.number()
      .typeError('Please enter a valid number')
      .positive()
      .integer('You cannot have attendance with decimals!')
      .required('This is a required field'),
  })

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    ConfirmBussingByAdmin({
      variables: {
        bussingRecordId: bussingRecordId,
        attendance: parseInt(values.attendance),
        bussingTopUp: parseFloat(values.bussingTopUp),
      },
    }).then(() => {
      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate(`/bacenta/bussing-details`)
    })
  }

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <PlaceholderCustom as="h3" loading={loading}>
          <HeadingPrimary>{`${church?.__typename} Attendance Form`}</HeadingPrimary>
        </PlaceholderCustom>
        <PlaceholderCustom as="h6" loading={loading}>
          <HeadingSecondary>{`${church?.name} ${church?.__typename}`}</HeadingSecondary>
          <p>{`Picture Submitted by ${bussing?.created_by.fullName}`}</p>
        </PlaceholderCustom>
      </Container>

      <div className="text-center">
        <h6>Bussing Pictures</h6>
        {bussing?.bussingPictures.map((picture, index) => {
          return (
            <img
              key={index}
              className="report-picture"
              src={transformCloudinaryImg(picture, 'large')}
            />
          )
        })}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount={true}
      >
        {(formik) => (
          <Container>
            <Form>
              <FormikControl
                control="input"
                name="attendance"
                label="Attendance (from Picture)*"
                className="form-control"
              />
              <FormikControl
                control="input"
                name="bussingTopUp"
                label="Bussing Top Up Given From the Church*"
                className="form-control"
              />
              <div className="d-flex justify-content-center">
                <SubmitButton formik={formik} />
              </div>
            </Form>
          </Container>
        )}
      </Formik>
    </BaseComponent>
  )
}

export default BusFormAttendanceSubmission
