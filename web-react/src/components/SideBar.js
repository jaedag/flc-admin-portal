import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import FormikControl from '../components/formik-components/FormikControl'
import { useCombobox } from 'downshift'
import { useQuery } from '@apollo/client'
import { jobs } from '../queries/MembersDataQuery'
import Spinner from './Spinner'

export const SideBar = () => {
  const { data: occupationData, loading: occupationLoading } = useQuery(jobs)

  const initialValues = {
    gender: '',
    maritalStatus: '',
    age: '',
    profession: '',
    town: '',
    yearAppointed: '',
  }

  const [inputItems, setInputItems] = useState([])
  const [users, setUsers] = useState([])
  const [occupation, setOccupation] = useState('')
  console.log(occupation)
  useEffect(() => {
    setUsers(['beef', 'turkey', 'Munching'])
  }, [])

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        users.filter((item) =>
          item.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },
  })

  const genderOptions = [
    { key: 'Male', value: 'Male' },
    { key: 'Female', value: 'Female' },
  ]
  const maritalStatusOptions = [
    { key: 'Single', value: 'Single' },
    { key: 'Married', value: 'Married' },
  ]

  const onSubmit = (values, onSubmitProps) => {
    console.log('Form data', values)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
  }
  if (occupationData) {
    console.log(occupationData.Occupation)
    return (
      <nav id="sidebarMenu" className="d-md-block sidebar collapse">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formik) => (
            <div className="container">
              <Form>
                <div className="form-group ">
                  <h3>Filters</h3>
                  <div className="container-fluid infobar">Basic Info</div>
                  <div className="row row-cols-1">
                    {/* <!-- Basic Info Div --> */}
                    <div className="col pb-2">
                      <FormikControl
                        label="Gender"
                        className="form-control"
                        control="radio"
                        name="gender"
                        options={genderOptions}
                      />
                    </div>
                    <div className="col pb-2">
                      <FormikControl
                        label="Marital Status"
                        className="form-control"
                        control="radio"
                        name="maritalStatus"
                        options={maritalStatusOptions}
                      />
                    </div>
                    <div className="col pb-2">
                      <FormikControl
                        label="Age"
                        className="form-control"
                        control="input"
                        name="age"
                        placeholder="Enter an Age"
                      />
                    </div>
                    <div className="col pb-2">
                      <FormikControl
                        label="Occupation"
                        className="form-control"
                        name="occupation"
                        placeholder="Occupation"
                        control="input"
                      />
                      <div {...getComboboxProps()}>
                        <input
                          {...getInputProps()}
                          placeholder="Search"
                          size="large"
                        />
                      </div>
                      <ul {...getMenuProps()}>
                        {isOpen &&
                          inputItems.map((item, index) => (
                            <span
                              key={item}
                              {...getItemProps({ item, index })}
                              onClick={() => {
                                setOccupation(item)
                              }}
                            >
                              <li
                                style={
                                  highlightedIndex === index
                                    ? { background: '#690c13' }
                                    : {}
                                }
                              >
                                {item}
                              </li>
                            </span>
                          ))}
                      </ul>
                    </div>
                    <div className="col pb-2">
                      <FormikControl
                        className="form-control"
                        name="centre"
                        placeholder="Branch"
                        control="input"
                      />
                    </div>
                    <div className="col pb-4">
                      <FormikControl
                        className="form-control"
                        name="yearAppointed"
                        placeholder="Year Appointed"
                        control="input"
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center m">
                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    className="btn btn-primary px-4 py-3"
                  >
                    Apply Filters
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </nav>
    )
  } else if (occupationLoading) {
    return (
      <nav id="sidebarMenu" className="d-md-block sidebar collapse">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formik) => (
            <div className="container">
              <Form>
                <div className="form-group pt-5">
                  <h3>Filters</h3>
                  <div className="container-fluid infobar">Basic Info</div>
                  <div className="row row-cols-1">
                    {/* <!-- Basic Info Div --> */}
                    <div className="col pb-2">
                      <FormikControl
                        label="Gender"
                        className="form-control"
                        control="radio"
                        name="gender"
                        options={genderOptions}
                      />
                    </div>
                    <div className="col pb-2">
                      <FormikControl
                        label="Marital Status"
                        className="form-control"
                        control="radio"
                        name="maritalStatus"
                        options={maritalStatusOptions}
                      />
                    </div>
                    <div className="col pb-2">
                      <FormikControl
                        label="Age"
                        className="form-control"
                        control="input"
                        name="age"
                        placeholder="Enter an Age"
                      />
                    </div>
                    <div className="col pb-2">
                      <FormikControl
                        label="Occupation"
                        className="form-control"
                        name="occupation"
                        placeholder="Occupation"
                        control="input"
                      />
                      <div {...getComboboxProps()}>
                        <input
                          {...getInputProps()}
                          placeholder="Search"
                          size="large"
                        />
                      </div>
                      <ul {...getMenuProps()}>
                        <Spinner />
                      </ul>
                    </div>
                    <div className="col pb-2">
                      <FormikControl
                        className="form-control"
                        name="centre"
                        placeholder="Branch"
                        control="input"
                      />
                    </div>
                    <div className="col pb-4">
                      <FormikControl
                        className="form-control"
                        name="yearAppointed"
                        placeholder="Year Appointed"
                        control="input"
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center m">
                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    className="btn btn-primary px-4 py-3"
                  >
                    Apply Filters
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </nav>
    )
  }
}
