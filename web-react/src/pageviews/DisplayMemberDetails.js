import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { NavBar } from '../components/NavBar'
import { MemberCard } from '../components/MemberCard'
import { DISPLAY_MEMBER } from '../queries/DisplayQueries'
import SpinnerPage from '../components/SpinnerPage'
import { MemberContext } from '../context/MemberContext'

export const DisplayMemberDetails = () => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const { memberID } = useContext(MemberContext)

  const {
    data: memberData,
    error: memberError,
    loading: memberLoading,
  } = useQuery(DISPLAY_MEMBER, {
    variables: { memberID: memberID },
  })

  console.log(memberData)

  if (memberError) {
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
  } else if (memberLoading) {
    // Spinner Icon for Loading Screens
    return (
      <React.Fragment>
        <NavBar />
        <SpinnerPage />
      </React.Fragment>
    )
  }
  return (
    <div className="container pt-5">
      <NavBar />

      <div className="container pt-2">
        <div className="row mb-4">
          <div className="col">
            <h3 className="font-weight-bold mb-3">
              Display Member Information
            </h3>
            <p className="infobar">Basic Info</p>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2">
          {/* Member Picture Profile Page */}
          <div className="col">
            <div className="row">
              <div className="col">
                <MemberCard
                  title={`${memberData.displayMember.firstName} ${memberData.displayMember.lastName}`}
                >
                  <div className="row row-cols-1 my-2">
                    <div className="col d-flex justify-content-center">
                      <img
                        src={`${memberData.displayMember.pictureUrl}`}
                        className="m-2 img-fluid rounded profile-img"
                        alt="current member"
                      />
                    </div>

                    <div className="col d-flex justify-content-center mt-2">
                      <h5 className="font-weight-bold ">
                        {memberData.displayMember.title.title}

                        {`${memberData.displayMember.firstName} ${memberData.displayMember.lastName}`}
                      </h5>
                    </div>
                    <div className="col d-flex justify-content-center mb-2">
                      <p className="font-weight-light card-text">
                        {memberData.displayMember.centre.name}
                      </p>
                    </div>
                    <div className="col d-flex justify-content-center  mt-2">
                      <button
                        type="submit"
                        className="btn btn-primary mt-2 p-3 card-text text-center"
                      >
                        Make Leader
                      </button>
                    </div>
                  </div>
                </MemberCard>
              </div>
            </div>

            {/* Leadership History Timeline */}
            {memberData.displayMember.leadershipHistory[0] ? (
              <div className="row">
                <div className="col">
                  <MemberCard title="History Timeline">
                    <div className="row">
                      <ul className="timeline">
                        {memberData.displayMember.leadershipHistory.map(
                          (element, index) =>
                            index < 3 && (
                              <li key={index}>
                                <p className="timeline-text">
                                  {element.historyRecord}
                                  <br />
                                  <small>
                                    {element.historyStartDate.date.formatted}
                                  </small>
                                </p>
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  </MemberCard>
                </div>
              </div>
            ) : null}
          </div>

          {/* Bio Information */}
          <div className="col">
            <div className="row">
              <div className="col">
                <MemberCard title="Bio">
                  <div className="container p-2">
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">First Name</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.firstName}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">Last Name</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">
                          Email Address
                        </p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.email}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">
                          Date of Birth
                        </p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {`${memberData.displayMember.dob.date.day} ${
                            monthNames[memberData.displayMember.dob.date.month]
                          } ${memberData.displayMember.dob.date.year}`}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">Gender</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.gender.gender}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">
                          Marital Status
                        </p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.maritalStatus.status}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">Occupation</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.occupation.occupation}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">Phone Number</p>
                      </div>
                      <div className="col">
                        <a
                          className="font-weight-bold card-text"
                          href={`tel:${memberData.displayMember.phoneNumber}`}
                        >
                          {memberData.displayMember.phoneNumber}
                        </a>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">
                          WhatsApp Number
                        </p>
                      </div>
                      <div className="col">
                        <a
                          className="font-weight-bold card-text"
                          href={`https://wa.me/${memberData.displayMember.whatsappNumber}`}
                        >
                          {memberData.displayMember.whatsappNumber}
                        </a>
                      </div>
                    </div>
                  </div>
                </MemberCard>
              </div>
            </div>
            {/* Current Church Status */}
            <div className="row">
              <div className="col">
                <MemberCard title="Current Church Activity">
                  <div className="container p-2">
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">Town</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.centre.community.town.name}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">Community</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.centre.community.name}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">
                          Centre Shepherd
                        </p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {`${memberData.displayMember.centre.leader.firstName} ${memberData.displayMember.centre.leader.lastName}`}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">
                          Sonta Shepherd
                        </p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {`${memberData.displayMember.sonta.leader.firstName} ${memberData.displayMember.sonta.leader.lastName}`}
                        </p>
                      </div>
                    </div>
                    {memberData.displayMember.title[0] ? (
                      <div>
                        <div className="row mb-2">
                          <div className="col">
                            <p className="text-secondary card-text">Title</p>
                          </div>
                          <div className="col">
                            <p className="font-weight-bold card-text">
                              {memberData.displayMember.title[0].Title.title}
                            </p>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col">
                            <p className="text-secondary card-text">
                              Year Appointed
                            </p>
                          </div>
                          <div className="col">
                            <p className="font-weight-bold card-text">
                              {
                                memberData.displayMember.title[0].yearAppointed
                                  .year
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </MemberCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
