import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, FieldArray } from 'formik'
import FormikControl from '../components/formik-components/FormikControl'

import { ADD_LEADER_HISTORY_MUTATION } from '../queries/CreateMutations'
import { DISPLAY_MEMBER } from '../queries/DisplayQueries'
import { HeadingBar } from '../components/HeadingBar'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { ChurchContext } from '../context/ChurchContext'
import PlusSign from '../components/PlusSign'
import MinusSign from '../components/MinusSign'

export const AddLeadershipHistory = () => {
  const initialValues = {
    pastoralHistory: [
      {
        historyRecord: '',
        historyDate: '',
      },
    ],
  }

  const { id } = useContext(ChurchContext)

  const history = useHistory()
  const {
    data: memberData,
    error: memberError,
    loading: memberLoading,
  } = useQuery(DISPLAY_MEMBER, {
    variables: { id: id },
  })
  const [AddLeaderHistory] = useMutation(ADD_LEADER_HISTORY_MUTATION)

  const onSubmit = async (values, onSubmitProps) => {
    AddLeaderHistory({
      variables: {
        id: id,
        pastoralHistory: values.pastoralHistory,
      },
    })

    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    history.push('/member/displaydetails')
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
                                  <PlusSign />
                                </button>
                                {index > 0 && (
                                  <button
                                    className="plus-button rounded"
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    <MinusSign />
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
