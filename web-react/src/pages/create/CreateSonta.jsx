import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../components/formik-components/FormikControl'

import {
  GET_BISHOP_CAMPUSES,
  GET_BISHOP_TOWNS,
  GET_CAMPUS_CENTRES,
  GET_TOWN_CENTRES,
  BISHOP_MEMBER_DROPDOWN,
  GET_MINISTRIES,
} from '../../queries/ListQueries.js'
import { CREATE_SONTA_MUTATION } from '../../queries/CreateMutations'
import NavBar from '../../components/nav/NavBar'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
import { ChurchContext } from '../../contexts/ChurchContext'
import { capitalise, makeSelectOptions } from '../../global-utils'

function CreateSonta() {
  const initialValues = {
    ministryId: '',
    leaderId: '',
    campusTownSelect: '',
  }

  const { church, bishopId, setTownId, setCampusId, setSontaId } =
    useContext(ChurchContext)
  const history = useHistory()

  const validationSchema = Yup.object({
    campusTownSelect: Yup.string().required(
      `You must choose a ${church.chuch}`
    ),
    ministrySelect: Yup.string().required('You must choose a ministry'),
    leaderId: Yup.string().required('Please choose a leader from the dropdown'),
  })

  const [CreateSonta] = useMutation(CREATE_SONTA_MUTATION, {
    onCompleted: (data) => {
      setSontaId(data.CreateSonta.id)
    },
    refetchQueries: [
      { query: GET_CAMPUS_CENTRES, variables: { id: bishopId } },
      { query: GET_TOWN_CENTRES, variables: { id: bishopId } },
    ],
  })

  const { data: townListData, loading: townListLoading } = useQuery(
    GET_BISHOP_TOWNS,
    {
      variables: { id: bishopId },
    }
  )
  const { data: campusListData, loading: campusListLoading } = useQuery(
    GET_BISHOP_CAMPUSES,
    {
      variables: { id: bishopId },
    }
  )
  const { data: ministryListData, loading: ministryListLoading } =
    useQuery(GET_MINISTRIES)

  if (townListData && campusListData && ministryListData) {
    const townOptions = makeSelectOptions(townListData.townList)
    const campusOptions = makeSelectOptions(campusListData.campusList)
    const ministryOptions = makeSelectOptions(ministryListData.ministryList)

    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      if (church.church === 'town') {
        setTownId(values.campusTownSelect)
      } else if (church.church === 'campus') {
        setCampusId(values.campusTownSelect)
      }

      CreateSonta({
        variables: {
          ministryId: values.ministrySelect,
          leaderId: values.leaderId,
          townCampusId: values.campusTownSelect,
        },
      }).then(() => {
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        history.push('/sonta/displaydetails')
      })
    }

    return (
      <>
        <NavBar />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <div className="body-card py-4 container mt-5">
              <div className="container infobar">Start a New Sonta</div>
              <Form>
                <div className="form-group">
                  <div className="row row-cols-1 row-cols-md-2">
                    {/* <!-- Basic Info Div --> */}
                    <div className="col mb-2">
                      <div className="form-row row-cols-2">
                        <div className="col-10">
                          <FormikControl
                            className="form-control"
                            control="select"
                            name="campusTownSelect"
                            options={
                              church.church === 'town'
                                ? townOptions
                                : campusOptions
                            }
                            defaultOption={`Select a ${capitalise(
                              church.church
                            )}`}
                          />
                        </div>
                      </div>

                      <div className="form-row row-cols-3">
                        <div className="col-10">
                          <FormikControl
                            className="form-control"
                            label="Ministry*"
                            control="select"
                            name="ministrySelect"
                            options={ministryOptions}
                            defaultOption="Ministry"
                          />
                        </div>
                      </div>
                      <div className="row d-flex align-items-center">
                        <div className="col">
                          <FormikControl
                            control="combobox2"
                            name="leaderId"
                            placeholder="Select a Leader"
                            setFieldValue={formik.setFieldValue}
                            optionsQuery={BISHOP_MEMBER_DROPDOWN}
                            queryVariable1="id"
                            variable1={bishopId}
                            queryVariable2="nameSearch"
                            suggestionText="name"
                            suggestionID="id"
                            dataset="bishopMemberDropdown"
                            aria-describedby="Bishop Member List"
                            className="form-control"
                            error={formik.errors.leaderId}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center m">
                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    className="btn btn-primary px-5 py-3"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </>
    )
  } else if (townListLoading || campusListLoading || ministryListLoading) {
    return <LoadingScreen />
  } else {
    return <ErrorScreen />
  }
}

export default CreateSonta
