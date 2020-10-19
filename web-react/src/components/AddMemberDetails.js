import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { jobs } from '../queries/membersData'
import { NEW_MEMBER } from '../queries/addMember'

export const AddMemberDetails = () => {
  const { data: work } = useQuery(jobs)
  const [addMember] = useMutation(NEW_MEMBER)

  const initialData = {
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    phoneNumber: '',
    whatsApp: '',
    maritalStatus: '',
    gender: '',
    occupation: '',
    church: '',
    ministry: '',
  }

  const [member, setMember] = useState(initialData)

  const handleInput = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    setMember({
      ...member,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addMember({
      variables: {
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        phoneNumber: member.phoneNumber,
        whatsAppNumber: member.whatsApp,
        dob: member.dob,
        ministry: member.ministry,
        occupation: member.occupation,
        bacenta: member.church,
        maritalStatus: member.maritalStatus,
        gender: member.gender,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log('Error: ', err))
    // console.log(member)
  }
  return (
    <div className="justify-content-center middlestuff">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <div className="container px-1">
          <div className="row">
            <div className="col-md-9">
              <p className="h5">Basic Info</p>
              <div className="container mx-0">
                <div className="row">
                  <div className="col-md-4 ml-0 pl-0 justify-content-center">
                    <div className="card card-body justify-content-center">
                      <h1 className="h2">Picture</h1>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-primary btn-large my-3">
                        Upload File
                      </button>
                    </div>
                  </div>

                  <div className="col-md-8">
                    <form className="needs-validation" noValidate>
                      <div className="row">
                        <div className="col-md-6 mb-3 p-2">
                          <input
                            type="text"
                            className="form-control border "
                            onChange={handleInput}
                            name="firstName"
                            placeholder="First Name"
                            required
                          />
                          <div className="invalid-feedback">
                            Valid first name is required.
                          </div>
                        </div>
                        <div className="col-md-6 mb-3 p-2">
                          <input
                            type="text"
                            className="form-control border "
                            onChange={handleInput}
                            name="lastName"
                            placeholder="Last Name"
                            required
                          />
                          <div className="invalid-feedback">
                            Valid last name is required.
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-9 mb-3 p-2">
                          <input
                            type="email"
                            className="form-control border "
                            onChange={handleInput}
                            name="email"
                            placeholder="Email"
                            required
                          />
                          <div className="invalid-feedback">
                            Valid email is required.
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-9 mb-3 p-2">
                          <label htmlFor="dob">Date of Birth</label>
                          <input
                            type="date"
                            className="form-control border"
                            onChange={handleInput}
                            name="dob"
                            placeholder="dd/mm/yyyy"
                            required
                          />
                          <div className="invalid-feedback">
                            Valid Date of Birth is required.
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3 p-2">
                          <input
                            type="tel"
                            className="form-control border "
                            onChange={handleInput}
                            name="phoneNumber"
                            placeholder="Phone Number"
                            required
                          />
                          <div className="invalid-feedback">
                            Valid Phone Number is required.
                          </div>
                        </div>

                        <div className="col-md-6 mb-3 p-2">
                          <input
                            type="tel"
                            className="form-control border "
                            onChange={handleInput}
                            name="whatsApp"
                            placeholder="WhatsApp"
                            required
                          />
                          <div className="invalid-feedback">
                            Valid first name is required.
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-9 mb-3 p-2">
                          <select
                            className="custom-select border "
                            name="gender"
                            onChange={handleInput}
                          >
                            <option defaultValue>Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-9 mb-3 p-2">
                          <select
                            className="custom-select border "
                            name="maritalStatus"
                            onChange={handleInput}
                          >
                            <option defaultValue>Marital Status</option>
                            <option>Single</option>
                            <option>Married</option>
                          </select>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-9 mb-3 p-2">
                          <select
                            className="custom-select border"
                            onChange={handleInput}
                            name="occupation"
                          >
                            <option defaultValue>Profession</option>
                            {work ? (
                              work.Occupation.map((job, index) => {
                                return (
                                  <option key={index}>{job.occupation}</option>
                                )
                              })
                            ) : (
                              <option>Loading</option>
                            )}
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <p className="h5 px-2">Church Info</p>

              <div className="col mb-3 p-3">
                <select
                  className="custom-select border"
                  onChange={handleInput}
                  name="church"
                >
                  <option defaultValue>Bacenta</option>
                  <option>Columba</option>
                  <option>West End</option>
                  <option>Nyanyano</option>
                  <option>AIT</option>
                  <option>Tetegu</option>
                  <option>Liberia Camp</option>
                  <option>Fiifi Down</option>
                  <option>Iron City</option>
                  <option>Kings</option>
                  <option>Kasoa Main</option>
                  <option>Block Factory</option>
                  <option>St Karols</option>
                  <option>America Down</option>
                  <option>Columba</option>
                </select>
              </div>

              <div className="col mb-3 p-3">
                <select
                  className="custom-select border"
                  onChange={handleInput}
                  name="ministry"
                >
                  <option defaultValue>Sonta</option>
                  <option>Business Community</option>
                  <option>Ushers</option>
                  <option>Communion Stars</option>
                  <option>Greater Love Choir</option>
                  <option>Airport Stars</option>
                  <option>Dancing Stars</option>
                  <option>Film Stars</option>
                </select>
              </div>

              <div
                className="justify-content-center p-3 push align-bottom"
                onClick={handleInput}
              >
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary btn-block my-3 align-baseline"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
