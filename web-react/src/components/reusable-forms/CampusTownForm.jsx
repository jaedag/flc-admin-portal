import { useMutation, useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { capitalise, makeSelectOptions } from 'global-utils'
import { COUNCIL_MEMBER_DROPDOWN, GET_COUNCILS } from 'queries/ListQueries'
import React, { useContext } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import FormikControl from 'components/formik-components/FormikControl'
import PlusSign from 'components/buttons/PlusMinusSign/PlusSign'
import MinusSign from 'components/buttons/PlusMinusSign/MinusSign'
import { COUNCIL_CENTRE_DROPDOWN } from 'components/formik-components/ComboboxQueries'
import { MAKE_CAMPUSTOWN_INACTIVE } from 'pages/update/CloseChurchMutations'
import { BISH_DASHBOARD_COUNTS } from 'pages/dashboards/DashboardQueries'
import { useHistory } from 'react-router'
import Popup from 'components/Popup/Popup'
import RoleView from 'auth/RoleView'
import { Spinner, Button, Container, Row, Col } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'

const CampusTownForm = ({
  initialValues,
  onSubmit,
  title,
  newConstituency,
}) => {
  const {
    church,
    togglePopup,
    isOpen,
    clickCard,
    campusId,
    townId,
    councilId,
  } = useContext(ChurchContext)
  const { theme } = useContext(MemberContext)

  const history = useHistory()
  const {
    data: councilData,
    loading: councilLoading,
    error: councilError,
  } = useQuery(GET_COUNCILS)
  const [CloseDownCampusTown] = useMutation(MAKE_CAMPUSTOWN_INACTIVE, {
    refetchQueries: [
      { query: BISH_DASHBOARD_COUNTS, variables: { id: councilId } },
    ],
  })

  const townCouncilOptions = makeSelectOptions(
    councilData?.councils.filter(
      (council) => council.towns.length > 0 && council
    )
  )
  const campusCouncilOptions = makeSelectOptions(
    councilData?.councils.filter(
      (council) => council.campuses.length > 0 && council
    )
  )

  const validationSchema = Yup.object({
    campusTownName: Yup.string().required(
      `${capitalise(church.church)} Name is a required field`
    ),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
    centres: newConstituency
      ? null
      : Yup.array().of(
          Yup.object().required('Please pick a centre from the dropdown')
        ),
  })

  return (
    <BaseComponent
      loading={councilLoading}
      error={councilError}
      data={councilData}
    >
      <Container>
        <HeadingPrimary>{title}</HeadingPrimary>
        <HeadingSecondary>
          {initialValues.campusTownName + ' ' + capitalise(church.church)}
        </HeadingSecondary>
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
                          name="councilSelect"
                          label="Select a Council"
                          options={
                            church.church === 'campus'
                              ? campusCouncilOptions
                              : townCouncilOptions
                          }
                          defaultOption="Select a Council"
                        />
                      </Col>
                    </Row>

                    <FormikControl
                      className="form-control"
                      control="input"
                      name="campusTownName"
                      label={`Name of ${capitalise(church.church)}`}
                      placeholder={`Name of ${capitalise(church.church)}`}
                    />

                    <Row className="d-flex align-items-center mb-3">
                      <RoleView
                        roles={[
                          'adminFederal',
                          'adminBishop',
                          'adminCampus',
                          'adminTown',
                        ]}
                      >
                        <Col>
                          <FormikControl
                            control="combobox2"
                            name="leaderId"
                            label="Choose a CO"
                            placeholder="Start typing..."
                            initialValue={initialValues?.leaderName}
                            setFieldValue={formik.setFieldValue}
                            optionsQuery={COUNCIL_MEMBER_DROPDOWN}
                            queryVariable1="id"
                            variable1={councilId}
                            queryVariable2="nameSearch"
                            suggestionText="name"
                            suggestionID="id"
                            dataset="councilMemberDropdown"
                            aria-describedby="Council Member List"
                            className="form-control"
                            error={formik.errors.leaderId}
                          />
                        </Col>
                      </RoleView>
                    </Row>

                    <small className="pt-2">
                      {`Select any centres
                       that are being moved to this ${capitalise(
                         church.church
                       )}`}
                    </small>
                    <FieldArray name="centres">
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps
                        const { values } = form
                        const { centres } = values

                        return (
                          <>
                            {centres.map((centre, index) => (
                              <Row key={index} className="form-row">
                                <Col>
                                  <FormikControl
                                    control="combobox2"
                                    name={`centres[${index}]`}
                                    placeholder="Centre Name"
                                    initialValue={centre?.name}
                                    setFieldValue={formik.setFieldValue}
                                    optionsQuery={COUNCIL_CENTRE_DROPDOWN}
                                    queryVariable1="id"
                                    variable1={councilId}
                                    queryVariable2="nameSearch"
                                    suggestionText="name"
                                    suggestionID="id"
                                    dataset="bishopCentreDropdown"
                                    church="centre"
                                    returnObject={!newConstituency && true}
                                    aria-describedby="Centre Name"
                                    className="form-control"
                                    error={
                                      formik.errors.centres &&
                                      formik.errors.centres[index]
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
                Are you sure you want to close down this bacenta?
                <Button
                  variant="primary"
                  type="submit"
                  className={`btn-main ${theme}`}
                  onClick={() => {
                    CloseDownCampusTown({
                      variables: {
                        campusTownId:
                          church.church === 'campus' ? campusId : townId,
                      },
                    })
                      .then((res) => {
                        clickCard(
                          res.data.CloseDownCampusTown?.campusBishop ??
                            res.data.CloseDownCampusTown?.townBishop
                        )
                        togglePopup()
                        history.push(`/${church.church}/displayall`)
                      })
                      .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.error(error)
                        alert(
                          `There was an error closing down this ${church.church}`,
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

            {!newConstituency && (
              <Button
                variant="primary"
                size="lg"
                disabled={formik.isSubmitting}
                className={`btn-secondary ${theme} mt-3`}
                onClick={togglePopup}
              >
                {`Close Down ${capitalise(church.church)}`}
              </Button>
            )}
          </Container>
        )}
      </Formik>
    </BaseComponent>
  )
}

export default CampusTownForm
