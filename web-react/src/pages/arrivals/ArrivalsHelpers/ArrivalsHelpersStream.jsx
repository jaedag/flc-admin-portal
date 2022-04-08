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
  MAKE_STREAMARRIVALS_HELPER,
  REMOVE_ALL_STREAMARRIVALS_HELPERS,
  REMOVE_STREAMARRIVALS_HELPER,
  STREAM_ARRIVALS_HELPERS,
} from './ArrivalsHelpersGQL'
import { alertMsg, throwErrorMsg } from 'global-utils'
import Popup from 'components/Popup/Popup'
import FormikControl from 'components/formik-components/FormikControl'
import SubmitButton from 'components/formik-components/SubmitButton'
import NoData from '../CompNoData'
import usePopup from 'hooks/usePopup'

const ArrivalsHelpersStream = () => {
  const { streamId } = useContext(ChurchContext)
  const { isOpen, togglePopup } = usePopup()

  const { data, loading, error } = useQuery(STREAM_ARRIVALS_HELPERS, {
    variables: { id: streamId },
  })
  const stream = data?.streams[0]

  const [MakeStreamArrivalsHelper] = useMutation(MAKE_STREAMARRIVALS_HELPER, {
    refetchQueries: [
      {
        query: STREAM_ARRIVALS_HELPERS,
        variables: { id: streamId },
      },
    ],
  })

  const [RemoveStreamArrivalsHelper] = useMutation(
    REMOVE_STREAMARRIVALS_HELPER,
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

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)

    MakeStreamArrivalsHelper({
      variables: {
        streamId: streamId,
        arrivalsHelperId: values.helperSelect,
      },
    })
      .then(() => {
        togglePopup()
        onSubmitProps.setSubmitting(false)
        alert('Arrivals Helper has been added successfully')
      })
      .catch((e) => throwErrorMsg(e))
  }

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>{`${stream?.name} Arrivals Helpers`}</HeadingPrimary>
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

              stream?.arrivalsHelpers.map(async (helper) => {
                try {
                  await RemoveStreamArrivalsHelper({
                    variables: {
                      streamId: streamId,
                      arrivalsHelperId: helper.id,
                    },
                  })
                } catch (error) {
                  throwErrorMsg('error', error)
                }

                alertMsg(`${helper.fullName} Deleted Successfully`)
              })
            }
          }}
        >
          Delete All Helpers
        </Button>

        {stream?.arrivalsHelpers.map((helper, i) => (
          <div key={i}>
            <MemberDisplayCard key={i} member={helper} />
            <Button
              onClick={() => {
                const confirmBox = window.confirm(
                  `Do you want to delete ${helper.fullName} as a helper`
                )

                if (confirmBox === true) {
                  RemoveStreamArrivalsHelper({
                    variables: {
                      streamId: streamId,
                      arrivalsHelperId: helper.id,
                    },
                  }).then(() =>
                    alertMsg(`${helper.fullName} Deleted Successfully`)
                  )
                }
              }}
            >
              Delete
            </Button>
          </div>
        ))}

        {!stream?.arrivalsHelpers.length && (
          <NoData text="There are no arrivals helpers" />
        )}
      </Container>
    </BaseComponent>
  )
}

export default ArrivalsHelpersStream
