import BaseComponent from 'components/base-component/BaseComponent'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { capitalise, makeSelectOptions } from 'global-utils'
import {
  BISHOP_MEMBER_DROPDOWN,
  GET_BISHOP_CAMPUSES,
  GET_BISHOP_TOWNS,
  GET_MINISTRIES,
} from 'queries/ListQueries'
import React, { useContext } from 'react'
import FormikControl from 'components/formik-components/FormikControl'
import { ChurchContext } from 'contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { DISPLAY_CAMPUS, DISPLAY_TOWN } from 'pages/display/ReadQueries'
import RoleView from 'auth/RoleView'

const SontaForm = ({
  initialValues,
  onSubmit,
  title,
  loadingState,
  newSonta,
}) => {
  const { church, campusId, townId, bishopId } = useContext(ChurchContext)

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
  const { data: townData, loading: townLoading } = useQuery(DISPLAY_TOWN, {
    variables: { id: church.church === 'town' ? townId : campusId },
  })
  const { data: campusData, loading: campusLoading } = useQuery(
    DISPLAY_CAMPUS,
    {
      variables: { id: church.church === 'town' ? townId : campusId },
    }
  )
  const { data: ministryListData, loading: ministryListLoading } = useQuery(
    GET_MINISTRIES
  )

  const isCampus = church.church === 'campus'
  const campusTownLoading = isCampus ? campusLoading : townLoading
  const campusTownData = isCampus ? campusData?.campuses[0] : townData?.towns[0]

  let initialValuesForNewSonta

  if (newSonta) {
    initialValuesForNewSonta = {
      ministrySelect: '',
      leaderId: '',
      campusTown: campusTownData?.id ?? '',
    }
  }

  const validationSchema = Yup.object({
    ministrySelect: Yup.string().required('You must choose a ministry'),
    leaderId: Yup.string().required('Please choose a leader from the dropdown'),
  })

  const ministryOptions = makeSelectOptions(ministryListData?.ministries)
  const townOptions = makeSelectOptions(townsData?.members[0].isBishopForTown)
  const campusOptions = makeSelectOptions(
    campusesData?.members[0].isBishopForCampus
  )

  const sontasNotInCampusTown = ministryOptions?.filter((ministry) => {
    return !campusTownData?.sontas.some(
      (sonta) => sonta['name'] === `${campusTownData?.name} ${ministry.key}`
    )
  })

  return (
    <BaseComponent
      loadingState={
        campusTownLoading ||
        ministryListLoading ||
        campusesLoading ||
        townsLoading ||
        loadingState
      }
      errorState={townsError || campusesError}
      data={townsData && campusesData && ministryListData}
    >
      <Formik
        initialValues={initialValuesForNewSonta || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="body-card py-4 container mt-5">
            <div className="container infobar">{title}</div>
            <Form>
              <div className="form-group">
                <div className="row row-cols-1 row-cols-md-2">
                  {/* <!-- Create Sonta Div --> */}
                  <div className="col mb-2">
                    <div className="form-row row-cols-2">
                      <div className="col-10">
                        <RoleView roles={['adminFederal', 'adminBishop']}>
                          <FormikControl
                            className="form-control"
                            control="select"
                            label={`Select a ${capitalise(church.church)}`}
                            name="campusTown"
                            options={
                              church.church === 'town'
                                ? townOptions
                                : campusOptions
                            }
                            defaultOption={`Select a ${capitalise(
                              church.church
                            )}`}
                          />
                        </RoleView>
                        <RoleView roles={['adminCampus', 'adminTown']}>
                          <label className="label">{`${capitalise(
                            church.church
                          )}:`}</label>
                          <div className="pl-2">
                            <p>{`${campusTownData?.name} ${capitalise(
                              church.church
                            )}`}</p>
                          </div>
                        </RoleView>
                      </div>
                    </div>

                    <div className="form-row row-cols-3">
                      <div className="col-10">
                        <FormikControl
                          className="form-control"
                          label="Ministry*"
                          control="select"
                          name="ministrySelect"
                          options={
                            newSonta ? sontasNotInCampusTown : ministryOptions
                          }
                          defaultOption="Ministry"
                        />
                      </div>
                    </div>
                    <div className="row d-flex align-items-center">
                      <div className="col">
                        <FormikControl
                          control="combobox2"
                          name="leaderId"
                          initialValue={initialValues?.leaderName}
                          label="Select a Leader"
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
    </BaseComponent>
  )
}

export default SontaForm
