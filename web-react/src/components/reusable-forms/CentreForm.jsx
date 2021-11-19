import { useMutation, useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { capitalise, makeSelectOptions } from 'global-utils'
import {
  BISHOP_MEMBER_DROPDOWN,
  GET_BISHOP_CAMPUSES,
  GET_BISHOP_TOWNS,
} from 'queries/ListQueries'
import React, { useContext } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import FormikControl from 'components/formik-components/FormikControl'
import PlusSign from 'components/buttons/PlusMinusSign/PlusSign'
import MinusSign from 'components/buttons/PlusMinusSign/MinusSign'
import { BISHOP_BACENTA_DROPDOWN } from 'components/formik-components/ComboboxQueries'
import { useHistory } from 'react-router'
import { MAKE_CENTRE_INACTIVE } from 'pages/update/CloseChurchMutations'
import Popup from 'components/Popup/Popup'
import RoleView from 'auth/RoleView'

const CentreForm = ({
  initialValues,
  onSubmit,
  title,
  loadingState,
  newCentre,
}) => {
  const {
    church,
    togglePopup,
    isOpen,
    clickCard,
    centreId,
    bishopId,
  } = useContext(ChurchContext)
  const history = useHistory()

  const [CloseDownCentre] = useMutation(MAKE_CENTRE_INACTIVE)
  const {
    data: townsData,
    loading: townsLoading,
    error: townsError,
  } = useQuery(GET_BISHOP_TOWNS, {
    variables: { id: bishopId },
  })
  const {
    data: campusesData,
    loading: campusesLoading,
    error: campusesError,
  } = useQuery(GET_BISHOP_CAMPUSES, {
    variables: { id: bishopId },
  })

  const townOptions = makeSelectOptions(townsData?.members[0].isBishopForTown)
  const campusOptions = makeSelectOptions(
    campusesData?.members[0].isBishopForCampus
  )

  const validationSchema = Yup.object({
    centreName: Yup.string().required('Centre Name is a required field'),
    leaderId: Yup.string().required('Please choose a leader from the dropdown'),
    bacentas: newCentre
      ? null
      : Yup.array().of(
          Yup.object().required('Please pick a bacenta from the dropdown')
        ),
  })

  return (
    <BaseComponent
      loadingState={campusesLoading || townsLoading || loadingState}
      errorState={townsError || campusesError}
      data={townsData && campusesData}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="py-4 container mt-5">
            <div className="container infobar">{title}</div>
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
                          label={`Select a ${capitalise(church.church)}`}
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
                          control="input"
                          name="centreName"
                          label="Name of Centre"
                          placeholder="Enter Name Here"
                        />
                      </div>
                    </div>
                    <div className="row d-flex align-items-center">
                      <RoleView
                        roles={[
                          'adminFederal',
                          'adminBishop',
                          'adminCampus',
                          'adminTown',
                          'leaderCampus',
                          'leaderTown',
                        ]}
                      >
                        <div className="col">
                          <FormikControl
                            control="combobox2"
                            name="leaderId"
                            initialValue={initialValues?.leaderName}
                            placeholder="Start typing"
                            label="Select a Leader"
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
                      </RoleView>
                    </div>

                    <small className="pt-2">
                      List any Bacentas that are being moved to this Centre
                    </small>
                    <FieldArray name="bacentas">
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps
                        const { values } = form
                        const { bacentas } = values

                        return (
                          <>
                            {bacentas.map((bacenta, index) => (
                              <div key={index} className="form-row row-cols">
                                <div className="col-9">
                                  <FormikControl
                                    control="combobox2"
                                    name={`bacentas[${index}]`}
                                    initialValue={bacenta?.name}
                                    placeholder="Enter Bacenta Name"
                                    setFieldValue={formik.setFieldValue}
                                    optionsQuery={BISHOP_BACENTA_DROPDOWN}
                                    queryVariable1="id"
                                    variable1={bishopId}
                                    queryVariable2="bacentaName"
                                    suggestionText="name"
                                    suggestionID="id"
                                    returnObject={!newCentre && true}
                                    church="bacenta"
                                    dataset="bishopBacentaDropdown"
                                    aria-describedby="Bacenta Name"
                                    className="form-control"
                                    error={
                                      formik.errors.bacentas &&
                                      formik.errors.bacentas[index]
                                    }
                                  />
                                </div>
                                <div className="col d-flex">
                                  <PlusSign onClick={() => push()} />
                                  {index > 0 && (
                                    <MinusSign onClick={() => remove(index)} />
                                  )}
                                </div>
                              </div>
                            ))}
                          </>
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
            {isOpen && (
              <Popup handleClose={togglePopup}>
                Are you sure you want to close down this centre?
                <div
                  className="btn btn-primary"
                  onClick={() => {
                    CloseDownCentre({
                      variables: {
                        centreId: centreId,
                      },
                    })
                      .then((res) => {
                        clickCard(
                          res.data.CloseDownCentre?.campus ||
                            res.data.CloseDownCentre?.town
                        )
                        togglePopup()
                        history.push(`/${church.church}/displaydetails`)
                      })
                      .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.error(error)
                        alert(
                          'There was an error closing down this centre',
                          error
                        )
                      })
                  }}
                >
                  {`Yes, I'm sure`}
                </div>
                <div className="btn btn-primary" onClick={togglePopup}>
                  No, take me back
                </div>
              </Popup>
            )}
            {!newCentre && (
              <div className="btn btn-primary" onClick={togglePopup}>
                Close Down Centre
              </div>
            )}
          </div>
        )}
      </Formik>
    </BaseComponent>
  )
}

export default CentreForm
