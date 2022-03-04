import { useMutation, useQuery } from '@apollo/client'
import BaseComponent from 'components/base-component/BaseComponent'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { makeSelectOptions } from 'global-utils'
import { CONSTITUENCY_DROPDOWN, GET_STREAMS } from 'queries/ListQueries'
import React, { useContext } from 'react'
import { ChurchContext } from 'contexts/ChurchContext'
import FormikControl from 'components/formik-components/FormikControl'
import PlusSign from 'components/buttons/PlusMinusSign/PlusSign'
import MinusSign from 'components/buttons/PlusMinusSign/MinusSign'
import { MAKE_COUNCIL_INACTIVE } from 'pages/directory/update/CloseChurchMutations'
import { useNavigate } from 'react-router'
import Popup from 'components/Popup/Popup'
import RoleView from 'auth/RoleView'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import SubmitButton from 'components/formik-components/SubmitButton'
import { permitAdmin } from 'permission-utils'

const CouncilForm = ({ initialValues, onSubmit, title, newCouncil }) => {
  const { togglePopup, isOpen, clickCard, councilId } =
    useContext(ChurchContext)
  const { theme } = useContext(MemberContext)

  const navigate = useNavigate()
  const { data, loading, error } = useQuery(GET_STREAMS)
  const [CloseDownCouncil] = useMutation(MAKE_COUNCIL_INACTIVE)

  const streamOptions = makeSelectOptions(data?.streams)

  const validationSchema = Yup.object({
    name: Yup.string().required(`Council Name is a required field`),
    leaderId: Yup.string().required(
      'Please choose a leader from the drop down'
    ),
    constituencies: newCouncil
      ? null
      : Yup.array().of(
          Yup.object().required('Please pick a constituency from the dropdown')
        ),
  })

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <Container>
        <HeadingPrimary>{title}</HeadingPrimary>
        <HeadingSecondary>{initialValues.name + ' Council'}</HeadingSecondary>
      </Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => (
          <Container className="py-4">
            <Form>
              <div className="form-group">
                <Row className="row-cols-1 row-cols-md-2">
                  {/* <!-- Basic Info Div --> */}
                  <Col className="mb-2">
                    <RoleView roles={permitAdmin('GatheringService')}>
                      <Row className="form-row">
                        <Col>
                          <FormikControl
                            control="select"
                            name="stream"
                            label="Select a Stream"
                            options={streamOptions}
                            defaultOption="Select a Stream"
                          />
                        </Col>
                      </Row>
                    </RoleView>

                    <FormikControl
                      control="input"
                      name="name"
                      label={`Name of Council`}
                      placeholder={`Name of Council`}
                    />

                    <Row className="d-flex align-items-center mb-3">
                      <RoleView roles={permitAdmin('Stream')}>
                        <Col>
                          <FormikControl
                            control="memberSearch"
                            name="leaderId"
                            label="Choose a Leader"
                            placeholder="Start typing..."
                            initialValue={initialValues?.leaderName}
                            setFieldValue={formik.setFieldValue}
                            aria-describedby="Member Search Box"
                            error={formik.errors.leaderId}
                          />
                        </Col>
                      </RoleView>
                    </Row>

                    <small className="pt-2">
                      {`Select any constituencies that are being moved to this Council`}
                    </small>
                    <FieldArray name="constituencies">
                      {(fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps
                        const { values } = form
                        const { constituencies } = values

                        return (
                          <>
                            {constituencies.map((constituency, index) => (
                              <Row key={index} className="form-row">
                                <Col>
                                  <FormikControl
                                    control="combobox"
                                    name={`constituencies[${index}]`}
                                    placeholder="Constituency Name"
                                    initialValue={constituency?.name}
                                    setFieldValue={formik.setFieldValue}
                                    optionsQuery={CONSTITUENCY_DROPDOWN}
                                    queryVariable="nameSearch"
                                    suggestionText="name"
                                    suggestionID="id"
                                    dataset="constituencyDropdown"
                                    church="bacenta"
                                    returnObject={!newCouncil && true}
                                    aria-describedby="Bacenta Name"
                                    error={
                                      formik.errors.constituencies &&
                                      formik.errors.constituencies[index]
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

              <SubmitButton formik={formik} />
            </Form>

            {isOpen && (
              <Popup handleClose={togglePopup}>
                Are you sure you want to close down this fellowship?
                <Button
                  variant="primary"
                  type="submit"
                  className={`btn-main ${theme}`}
                  onClick={() => {
                    CloseDownCouncil({
                      variables: {
                        councilId: councilId,
                      },
                    })
                      .then((res) => {
                        clickCard(res.data.CloseDownCouncil)
                        togglePopup()
                        navigate(`/council/displayall`)
                      })
                      .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.error(error)
                        alert(
                          `There was an error closing down this council`,
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

            {!newCouncil && (
              <Button
                variant="primary"
                size="lg"
                disabled={formik.isSubmitting}
                className={`btn-secondary ${theme} mt-3`}
                onClick={togglePopup}
              >
                {`Close Down Council`}
              </Button>
            )}
          </Container>
        )}
      </Formik>
    </BaseComponent>
  )
}

export default CouncilForm
