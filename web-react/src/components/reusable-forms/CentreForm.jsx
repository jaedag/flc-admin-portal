import { useMutation, useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { capitalise, makeSelectOptions } from 'global-utils'
import {
  COUNCIL_MEMBER_DROPDOWN,
  GET_COUNCIL_CAMPUSES,
  GET_COUNCIL_TOWNS,
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
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { MemberContext } from 'contexts/MemberContext'

const CentreForm = ({ initialValues, onSubmit, title, newCentre }) => {
  const {
    church,
    togglePopup,
    isOpen,
    clickCard,
    centreId,
    councilId,
  } = useContext(ChurchContext)
  const { theme } = useContext(MemberContext)
  const history = useHistory()

  const [CloseDownCentre] = useMutation(MAKE_CENTRE_INACTIVE)
  const {
    data: townsData,
    loading: townsLoading,
    error: townsError,
  } = useQuery(GET_COUNCIL_TOWNS, {
    variables: { id: councilId },
  })
  const {
    data: campusesData,
    loading: campusesLoading,
    error: campusesError,
  } = useQuery(GET_COUNCIL_CAMPUSES, {
    variables: { id: councilId },
  })

  const townOptions = makeSelectOptions(townsData?.councils[0]?.towns)
  const campusOptions = makeSelectOptions(campusesData?.councils[0]?.campuses)

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
      loading={campusesLoading || townsLoading}
      error={townsError || campusesError}
      data={townsData && campusesData}
    >
      <Container>
        <HeadingPrimary>{title}</HeadingPrimary>
        <HeadingSecondary>{initialValues.centreName}</HeadingSecondary>
      </Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Container className="py-4">
            <Form>
              <div className="form-group">
                <Row className="row-cols-1 row-cols-md-2">
                  {/* <!-- Basic Info Div --> */}
                  <Col className="mb-2">
                    <Row className="form-row">
                      <Col>
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
                        <FormikControl
                          className="form-control"
                          control="input"
                          name="centreName"
                          label="Name of Centre"
                          placeholder="Enter Name Here"
                        />
                      </Col>
                    </Row>

                    <Row className="d-flex align-items-center mb-3">
                      <RoleView
                        roles={[
                          'adminFederal',
                          'adminCouncil',
                          'adminCampus',
                          'adminTown',
                          'leaderCampus',
                          'leaderTown',
                        ]}
                      >
                        <Col>
                          <FormikControl
                            control="combobox2"
                            name="leaderId"
                            initialValue={initialValues?.leaderName}
                            placeholder="Start typing"
                            label="Select a Leader"
                            setFieldValue={formik.setFieldValue}
                            optionsQuery={COUNCIL_MEMBER_DROPDOWN}
                            queryVariable1="id"
                            variable1={councilId}
                            queryVariable2="nameSearch"
                            suggestionText="name"
                            suggestionID="id"
                            dataset="councilMemberDropdown"
                            aria-describedby="Bishop Member List"
                            className="form-control"
                            error={formik.errors.leaderId}
                          />
                        </Col>
                      </RoleView>
                    </Row>

                    <small>
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
                              <Row key={index} className="form-row">
                                <Col>
                                  <FormikControl
                                    control="combobox2"
                                    name={`bacentas[${index}]`}
                                    initialValue={bacenta?.name}
                                    placeholder="Enter Bacenta Name"
                                    setFieldValue={formik.setFieldValue}
                                    optionsQuery={BISHOP_BACENTA_DROPDOWN}
                                    queryVariable1="id"
                                    variable1={councilId}
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
                                </Col>
                                <Col className="col-auto d-flex">
                                  <PlusSign onClick={() => push()} />
                                  {index > 0 && (
                                    <MinusSign onClick={() => remove(index)} />
                                  )}
                                </Col>
                              </Row>
                            ))}
                          </>
                        )
                      }}
                    </FieldArray>
                  </Col>
                </Row>
              </div>

              <Button
                variant="primary"
                size="lg"
                type="submit"
                className={`btn-main ${theme}`}
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <>
                    <Spinner animation="grow" size="sm" />
                    <span> Submitting</span>
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
            </Form>
            {isOpen && (
              <Popup handleClose={togglePopup}>
                Are you sure you want to close down this centre?
                <Button
                  variant="primary"
                  type="submit"
                  className={`btn-main ${theme}`}
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
                </Button>
                <Button
                  variant="primary"
                  className={`btn-secondary mt-2 ${theme}`}
                  onClick={togglePopup}
                >
                  No, take me back
                </Button>
              </Popup>
            )}
            {!newCentre && (
              <Button
                variant="primary"
                size="lg"
                disabled={formik.isSubmitting}
                className={`btn-secondary ${theme} mt-3`}
                onClick={togglePopup}
              >
                Close Down Centre
              </Button>
            )}
          </Container>
        )}
      </Formik>
    </BaseComponent>
  )
}

export default CentreForm
