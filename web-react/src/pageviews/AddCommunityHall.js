import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/formik-components/FormikControl'

import {
  GET_CAMPUSES,
  GET_TOWNS,
  CENTRE_DROPDOWN,
} from '../queries/ListQueries'
import {
  CREATE_HALL_MUTATION,
  CREATE_COMMUNITY_MUTATION,
} from '../queries/AdditionMutations'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import {
  ChurchContext,
  ApostleContext,
  CampusTownContext,
  CommunityHallContext,
} from '../context/ChurchContext'

function AddCommunityHall() {
  //Context Declarations
  const { apostleID } = useContext(ApostleContext)
  const { setCampusID, setTownID } = useContext(CampusTownContext)
  const { setHallID, setCommunityID } = useContext(CommunityHallContext)
  const { church, capitalise, parsePhoneNum, phoneRegExp } = useContext(
    ChurchContext
  )
  const history = useHistory()

  const initialValues = {
    hallCommName: '',
    leaderName: '',
    leaderWhatsapp: '',
    campusTownSelect: '',
    centres: [''],
  }

  const validationSchema = Yup.object({
    campusTownSelect: Yup.string().required(
      `Choose a ${capitalise(church.church)}`
    ),
    hallCommName: Yup.string().required(
      `${capitalise(church.subChurch)} Name is a required field`
    ),
    leaderWhatsapp: Yup.string()
      .matches(
        phoneRegExp,
        `Phone Number must start with + and country code (eg. '+233')`
      )
      .required('Phone Number is required'),
  })

  const [AddHall] = useMutation(CREATE_HALL_MUTATION, {
    onCompleted: (newHallData) => {
      setHallID(newHallData.AddHall.hallID)
    },
  })

  const [AddCommunity] = useMutation(CREATE_COMMUNITY_MUTATION, {
    onCompleted: (newCommunityData) => {
      setCommunityID(newCommunityData.AddCommunity.communityID)
    },
  })

  const {
    data: campusListData,
    loading: campusListLoading,
    error: campusListError,
  } = useQuery(GET_CAMPUSES, {
    variables: { apostleID: apostleID },
  })

  const {
    data: townListData,
    loading: townListLoading,
    error: townListError,
  } = useQuery(GET_TOWNS, {
    variables: { apostleID: apostleID },
  })

  if (campusListError || townListError) {
    return <ErrorScreen />
  } else if (campusListLoading || townListLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else {
    //Refactoring the options into something that can be read by formik
    const campusOptions = campusListData.campusList.map((campus) => ({
      value: campus.campusID,
      key: campus.name,
    }))

    const townOptions = townListData.townList.map((town) => ({
      value: town.townID,
      key: town.name,
    }))

    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      if (church.church === 'campus') {
        setCampusID(values.campusSelect)
        values.leaderWhatsapp = parsePhoneNum(values.leaderWhatsapp)

        AddHall({
          variables: {
            hallName: values.hallCommName,
            lWhatsappNumber: values.leaderWhatsapp,
            campusID: values.campusTownSelect,
            centres: values.centres,
          },
        })
      } else if (church.church === 'town') {
        setTownID(values.townSelect)
        values.leaderWhatsapp = parsePhoneNum(values.leaderWhatsapp)

        AddCommunity({
          variables: {
            communityName: values.hallCommName,
            lWhatsappNumber: values.leaderWhatsapp,
            townID: values.campusTownSelect,
            centres: values.centres,
          },
        })
      }

      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      history.push(`/${church.subChurch}/displaydetails`)
    }

    return (
      <div>
        <NavBar />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <div className="body-card py-4 container mt-5">
              <div className="container infobar">
                {`Start a New ${capitalise(church.subChurch)}`}{' '}
              </div>
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
                            name={`campusTownSelect`}
                            options={
                              church.church === 'campus'
                                ? campusOptions
                                : townOptions
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
                            control="input"
                            name="hallCommName"
                            placeholder={`Name of ${capitalise(
                              church.subChurch
                            )}`}
                          />
                        </div>
                      </div>
                      <div className="row d-flex align-items-center">
                        <div className="col">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="leaderName"
                            placeholder={`Name of ${capitalise(
                              church.subChurch
                            )} Leader`}
                          />
                        </div>
                      </div>
                      <div className="form-row row-cols-3">
                        <div className="col-9">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="leaderWhatsapp"
                            placeholder="Enter Leader WhatsApp No"
                          />
                        </div>
                      </div>
                      <small className="pt-2">
                        {`List any Centres that are being moved to this ${capitalise(
                          church.church
                        )}`}
                      </small>
                      <FieldArray name="centres">
                        {(fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps
                          const { values } = form
                          const { centres } = values

                          return (
                            <div>
                              {centres.map((centres, index) => (
                                <div key={index} className="form-row row-cols">
                                  <div className="col-9">
                                    <FormikControl
                                      control="combobox"
                                      name={`centres[${index}]`}
                                      placeholder="newBacenta Name"
                                      setFieldValue={formik.setFieldValue}
                                      optionsQuery={CENTRE_DROPDOWN}
                                      queryVariable="centreName"
                                      suggestionText="name"
                                      suggestionID="centreID"
                                      dataset="centreDropdown"
                                      aria-describedby="newBacenta Name"
                                      className="form-control"
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
      </div>
    )
  }
}

export default AddCommunityHall
