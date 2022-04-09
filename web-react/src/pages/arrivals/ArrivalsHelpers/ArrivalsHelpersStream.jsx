import { useMutation, useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import {
  MAKE_STREAMARRIVALS_COUNTER,
  REMOVE_ALL_STREAMARRIVALS_HELPERS,
  REMOVE_STREAMARRIVALS_COUNTER,
  STREAM_ARRIVALS_HELPERS,
} from './ArrivalsHelpersGQL'
import { alertMsg, throwErrorMsg } from 'global-utils'
import Popup from 'components/Popup/Popup'
import FormikControl from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'
import NoData from '../CompNoData'

const ArrivalsHelpersStream = () => {
  const { streamId, isOpen, togglePopup } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(STREAM_ARRIVALS_HELPERS, {
    variables: { id: streamId },
  })
  const stream = data?.streams[0]
  console.log(stream)
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

  const [RemoveAllStreamArrivalsHelpers] = useMutation(
    REMOVE_ALL_STREAMARRIVALS_HELPERS,
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
        <Button
          onClick={async () => {
            const confirmBox = window.confirm(
              `Do you want to delete all helpers`
            )

            if (confirmBox === true) {
              await RemoveAllStreamArrivalsHelpers({
                variables: { streamId: streamId },
              })

              stream?.arrivalsCounters.map(async (counter) => {
                try {
                  await RemoveStreamArrivalsCounter({
                    variables: {
                      streamId: streamId,
                      arrivalsCounterId: counter.id,
                    },
                  })
                } catch (error) {
                  throwErrorMsg('error', error)
                }

                alertMsg(`${counter.fullName} Deleted Successfully`)
              })
            }
          }}
        >
          Delete All Helpers
        </Button>

        {stream?.arrivalsCounters.map((counter, i) => (
          <div key={i}>
            <MemberDisplayCard key={i} member={counter} />
            <Button
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

                    alertMsg(`${counter.fullName} Deleted Successfully`)
                  } catch (error) {
                    throwErrorMsg(error)
                  }
                }
              }}
            >
              Delete
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

export default ArrivalsHelpersStream
