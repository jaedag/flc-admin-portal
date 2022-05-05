import { useMutation, useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import {
  MAKE_STREAMARRIVALS_COUNTER,
  REMOVE_STREAMARRIVALS_COUNTER,
  STREAM_ARRIVALS_HELPERS,
} from './ArrivalsHelpersGQL'
import { alertMsg, throwErrorMsg } from 'global-utils'
import Popup from 'components/Popup/Popup'
import FormikControl from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'
import NoData from '../CompNoData'
import usePopup from 'hooks/usePopup'

const ArrivalsCounters = () => {
  const { streamId } = useContext(ChurchContext)
  const { isOpen, togglePopup } = usePopup()
  const [submitting, setSubmitting] = useState()

  const { data, loading, error } = useQuery(STREAM_ARRIVALS_HELPERS, {
    variables: { id: streamId },
  })
  const stream = data?.streams[0]

  const [MakeStreamArrivalsCounter] = useMutation(MAKE_STREAMARRIVALS_COUNTER, {
    refetchQueries: [
      {
        query: STREAM_ARRIVALS_HELPERS,
        variables: { id: streamId },
      },
    ],
  })

  const [RemoveStreamArrivalsCounter] = useMutation(
    REMOVE_STREAMARRIVALS_COUNTER,
    {
      refetchQueries: [
        {
          query: STREAM_ARRIVALS_HELPERS,
          variables: { id: streamId },
        },
      ],
    }
  )

  const initialValues = {
    helperName: '',
    helperSelect: '',
  }

  const validationSchema = Yup.object({
    helperSelect: Yup.string().required(
      'Please select a helper from the dropdown'
    ),
  })

  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    try {
      await MakeStreamArrivalsCounter({
        variables: {
          streamId: streamId,
          arrivalsCounterId: values.helperSelect,
        },
      })

      togglePopup()
      onSubmitProps.setSubmitting(false)
      alert('Arrivals Counter has been added successfully')
    } catch (e) {
      onSubmitProps.setSubmitting(false)
      throwErrorMsg(e)
    }
  }

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>{`${stream?.name} Arrivals Counters`}</HeadingPrimary>
        {isOpen && (
          <Popup handleClose={togglePopup}>
            <b>Add Arrivals Helper</b>
            <p>Please enter the name of the new arrivals rep</p>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <Row className="form-row">
                    <Col>
                      <FormikControl
                        control="memberSearch"
                        name="helperSelect"
                        initialValue={initialValues?.helperName}
                        placeholder="Select a Name"
                        setFieldValue={formik.setFieldValue}
                        aria-describedby="Member Search"
                        error={formik.errors.admin}
                      />
                    </Col>
                  </Row>

                  <SubmitButton formik={formik} />
                </Form>
              )}
            </Formik>
          </Popup>
        )}

        <Button onClick={() => togglePopup()}>Add Helpers</Button>

        {stream?.arrivalsCounters.map((counter, i) => (
          <div key={i}>
            <MemberDisplayCard key={i} member={counter} />
            <Button
              disabled={submitting}
              onClick={async () => {
                const confirmBox = window.confirm(
                  `Do you want to delete ${counter.fullName} as a counter`
                )

                if (confirmBox === true) {
                  try {
                    await RemoveStreamArrivalsCounter({
                      variables: {
                        streamId: streamId,
                        arrivalsCounterId: counter.id,
                      },
                    })
                    setSubmitting(false)
                    alertMsg(`${counter.fullName} Deleted Successfully`)
                  } catch (error) {
                    throwErrorMsg(error)
                  }
                }
              }}
            >
              {submitting ? (
                <>
                  <Spinner animation="grow" size="sm" />
                  <span> Submitting</span>
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </div>
        ))}

        {!stream?.arrivalsCounters.length && (
          <NoData text="There are no arrivals helpers" />
        )}
      </Container>
    </BaseComponent>
  )
}

export default ArrivalsCounters
