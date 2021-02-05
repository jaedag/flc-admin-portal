import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, FieldArray } from 'formik'
import FormikControl from '../components/formik-components/FormikControl'

import { ADD_LEADER_HISTORY_MUTATION } from '../queries/AdditionMutations'
import { DISPLAY_MEMBER } from '../queries/DisplayQueries'
import { HeadingBar } from '../components/HeadingBar'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { MemberContext } from '../context/MemberContext'

export const AddLeadershipHistory = () => {
  const initialValues = {
    pastoralHistory: [
      {
        historyRecord: '',
        historyDate: '',
      },
    ],
  }

  const { memberID } = useContext(MemberContext)

  const history = useHistory()
  const {
    data: memberData,
    error: memberError,
    loading: memberLoading,
  } = useQuery(DISPLAY_MEMBER, {
    variables: { memberID: memberID },
  })
  const [AddLeaderHistory] = useMutation(ADD_LEADER_HISTORY_MUTATION)

  const onSubmit = async (values, onSubmitProps) => {
    AddLeaderHistory({
      variables: {
        memberID: memberID,
        pastoralHistory: values.pastoralHistory,
      },
    })

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    history.push('/members/displaydetails')
  }

  if (memberError) {
    return <ErrorScreen />
  } else if (memberLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  }

  return (
    <div>
      <NavBar />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => (
          <div className="body-card container body-container mt-5">
            <h3 className="my-3">{`Add ${memberData.displayMember.firstName} ${memberData.displayMember.lastName} Leadership History`}</h3>
            <Form className="form-group">
              <div className="row row-cols-1">
                {/* <!--Beginning of Pastoral History Section--> */}
                <div className="col my-4">
                  <HeadingBar title="Pastoral History" />
                  <FieldArray name="pastoralHistory">
                    {(fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps
                      const { values } = form
                      const { pastoralHistory } = values

                      return (
                        <div>
                          {pastoralHistory.map((pastoralHistory, index) => (
                            <div key={index} className="form-row row-cols">
                              <div className="col-7">
                                <FormikControl
                                  className="form-control"
                                  placeholder="History Entry"
                                  control="input"
                                  name={`pastoralHistory[${index}].historyRecord`}
                                />
                              </div>
                              <div className="col">
                                <FormikControl
                                  className="form-control"
                                  placeholder="Year"
                                  control="input"
                                  name={`pastoralHistory[${index}].historyDate`}
                                />
                              </div>
                              <div className="col d-flex">
                                <button
                                  className="plus-button rounded mr-2"
                                  type="button"
                                  onClick={() => push()}
                                >
                                  <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="plus"
                                    className="svg-inline--fa fa-plus fa-w-14"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                    />
                                  </svg>
                                </button>
                                {index > 0 && (
                                  <button
                                    className="plus-button rounded"
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    {' '}
                                    <svg
                                      aria-hidden="true"
                                      focusable="false"
                                      data-prefix="fas"
                                      data-icon="minus"
                                      className="svg-inline--fa fa-minus fa-w-14"
                                      role="img"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 448 512"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                      />
                                    </svg>
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    }}
                  </FieldArray>
                  <div className="row mt-4">
                    <div className="col d-flex justify-content-center">
                      <button
                        type="submit"
                        disabled={!formik.isValid || formik.isSubmitting}
                        className="btn btn-primary btn-medium my-3 text-center"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
                {/* <!--End of Pastoral History Section--> */}
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  )
}
