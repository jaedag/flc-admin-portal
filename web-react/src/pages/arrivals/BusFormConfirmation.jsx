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
import { Card, Container } from 'react-bootstrap'
import { DISPLAY_BUSSING_RECORDS } from './arrivalsQueries'
import { CONFIRM_BUSSING_BY_ADMIN } from './arrivalsMutations'
import { useNavigate } from 'react-router'
import FormikControl from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'
import { useState } from 'react'
import { useEffect } from 'react'

const BusFormConfirmation = () => {
  const navigate = useNavigate()
  const { bacentaId } = useContext(ChurchContext)
  const { bussingRecordId } = useContext(ServiceContext)

  const { data, loading, error } = useQuery(DISPLAY_BUSSING_RECORDS, {
    variables: { bussingRecordId: bussingRecordId, bacentaId: bacentaId },
  })
  const [ConfirmBussingByAdmin] = useMutation(CONFIRM_BUSSING_BY_ADMIN)

  const bussing = data?.bussingRecords[0]
  const bacenta = data?.bacentas[0]
  const initialValues = {
    attendance: '',
    bussingTopUp: '',
    comments: '',
  }
  const [bussingMoney, setBussingMoney] = useState(0)

  useEffect(() => {
    setBussingMoney(data?.bacentas[0]?.zone.bussingTopUp)
  }, [data])

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
        comments: values.comments,
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
          <HeadingPrimary>{`${bacenta?.__typename} Attendance Form`}</HeadingPrimary>
        </PlaceholderCustom>
        <PlaceholderCustom as="h6" loading={loading}>
          <HeadingSecondary>{`${bacenta?.name} ${bacenta?.__typename}`}</HeadingSecondary>
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
      <Container>
        <Card>
          <Card.Body>
            <div className="text-secondary">
              Bussing Cost:{' '}
              <span className="fw-bold text-info">
                GHS {bussing?.bussingCost}
              </span>
            </div>
          </Card.Body>
        </Card>
      </Container>

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
                placeholder={bussing?.attendance}
                onChange={(e) => {
                  formik.setFieldValue('attendance', e.target.value)
                  if (e.target.value > 20) {
                    setBussingMoney(bacenta?.zone.bussingTopUp * 1.5)
                  }
                  if (e.target.value < 20) {
                    setBussingMoney(bacenta?.zone.bussingTopUp)
                  }
                }}
              />

              <div>{`Zone ${bacenta?.zone.number} usually receives ${bacenta?.zone.bussingTopUp} GHS`}</div>

              <FormikControl
                control="input"
                name="bussingTopUp"
                label="Bussing Top Up Given From the Church* (in GHS)"
                placeholder={`${bussingMoney}`}
              />
              <FormikControl
                control="textarea"
                name="comments"
                label="Comments"
              />
              <div className="d-flex justify-content-center pt-3">
                <SubmitButton formik={formik} />
              </div>
            </Form>
          </Container>
        )}
      </Formik>
    </BaseComponent>
  )
}

export default BusFormConfirmation
