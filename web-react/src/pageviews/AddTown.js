import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/formik-components/FormikControl'

import { GET_APOSTLES } from '../queries/ListQueries'
import { CREATE_TOWN_MUTATION } from '../queries/AdditionMutations'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'
import { TownContext } from '../context/ChurchContext'

function AddTown() {
  const initialValues = {
    townName: '',
    townLeaderName: '',
    apostleSelect: '',
  }

  const validationSchema = Yup.object({
    // apostleSelect: Yup.string().required('Choose a Town'),
    townName: Yup.string().required('Centre Name is a required field'),
  })

  const { setTownID } = useContext(TownContext)
  const [AddTown, { data: newTownData }] = useMutation(CREATE_TOWN_MUTATION, {
    onCompleted: (newTownData) => {
      setTownID(newTownData.AddTown.townID)
    },
  })
  console.log(newTownData)
  const history = useHistory()

  const { data: apostleListData, loading: apostleLoadinng } = useQuery(
    GET_APOSTLES
  )

  if (apostleListData) {
    const apostleOptions = [
      { key: 1, value: 'Frank Opoku' },
      { key: 2, value: 'Kent Njeru' },
    ]
    // console.log(apostleListData)
    // const apostleOptions = apostleListData.apostlesList.map((apostle) => ({
    // 	value: apostle.memberID,
    // 	key: `${apostle.firstName} ${apostle.lastName}`
    // }))
    // console.log('Data is here')

    //onSubmit receives the form state as argument
    const onSubmit = (values, onSubmitProps) => {
      setTownID(values.apostleSelect)

      AddTown({
        variables: {
          townName: values.townName,
          townLeaderName: values.townLeaderName,
          lWhatsappNumber: values.commLeaderWhatsapp,
          townID: values.apostleSelect,
        },
      })
      console.log('Form data', values)
      onSubmitProps.setSubmitting(false)
      // onSubmitProps.resetForm()
      history.push('/community/displaydetails')
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
              <div className="container infobar">Start a New Town</div>
              <Form>
                <div className="form-group">
                  <div className="row row-cols-1 row-cols-md-2">
                    {/* <!-- Basic Info Div --> */}
                    <div className="col mb-2">
                      <div className="form-row row-cols-2">
                        <div className="col-8">
                          <FormikControl
                            className="form-control"
                            control="select"
                            name="apostleSelect"
                            options={apostleOptions}
                            // onChange={(e) => {
                            // 	setTownID(e.target.value)
                            // }}
                            defaultOption="Select an Apostle"
                          />
                        </div>
                      </div>

                      <div className="form-row row-cols-3">
                        <div className="col-9">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="townName"
                            placeholder="Name of Town"
                          />
                        </div>
                      </div>
                      <div className="row d-flex align-items-center">
                        <div className="col">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="townLeaderName"
                            placeholder="Name of Town GSO"
                          />
                        </div>
                      </div>
                      <div className="form-row row-cols-3">
                        <div className="col-9">
                          <FormikControl
                            className="form-control"
                            control="input"
                            name="commLeaderWhatsapp"
                            placeholder="Enter Leader WhatsApp No"
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
      </div>
    )
  } else if (apostleLoadinng) {
    return (
      <React.Fragment>
        <NavBar />
        <SpinnerPage />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container full-body-center">
          <p className="text-center full-center">
            There seems to be an error loading data
          </p>
        </div>
      </React.Fragment>
    )
  }
}

export default AddTown
