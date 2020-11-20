import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { NavBar } from '../components/NavBar'
import { MemberCard } from '../components/MemberCard'
import { DISPLAY_MEMBER } from '../queries/DisplayQueries'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { MemberContext } from '../context/MemberContext'
import { ChurchContext } from '../context/ChurchContext'

export const DisplayMemberDetails = () => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]
  const { memberID } = useContext(MemberContext)
  const { church, capitalise } = useContext(ChurchContext)

  const {
    data: memberData,
    error: memberError,
    loading: memberLoading,
  } = useQuery(DISPLAY_MEMBER, {
    variables: { memberID: memberID },
  })

  if (memberError || memberID === '') {
    return <ErrorScreen />
  } else if (memberLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
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
                        className="m-2 rounded profile-img"
                        alt={`${memberData.displayMember.firstName} ${memberData.displayMember.lastName}`}
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
                        {memberData.displayMember.centre
                          ? `Centre: ${memberData.displayMember.centre.name}`
                          : `Centre: ${null}`}
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
            <div className="row">
              <div className="col">
                {/* Bio Information */}
                <MemberCard title="Bio">
                  <div className="container p-2">
                    <div className="row py-2">
                      <div className="col ">
                        <p className="text-secondary card-text">First Name</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.firstName}
                        </p>
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col">
                        <p className="text-secondary card-text">Last Name</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col">
                        <p className="text-secondary card-text">
                          Email Address
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="font-weight-bold card-text text-truncate">
                          {memberData.displayMember.email}
                        </p>
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col">
                        <p className="text-secondary card-text">
                          Date of Birth
                        </p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.dob
                            ? `${memberData.displayMember.dob.date.day} ${
                                monthNames[
                                  memberData.displayMember.dob.date.month
                                ]
                              } ${memberData.displayMember.dob.date.year}`
                            : null}
                        </p>
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col">
                        <p className="text-secondary card-text">Gender</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.gender.gender}
                        </p>
                      </div>
                    </div>
                    <div className="row py-2">
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
                    <div className="row py-2">
                      <div className="col">
                        <p className="text-secondary card-text">Occupation</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.occupation
                            ? memberData.displayMember.occupation.occupation
                            : 'No Occupation'}
                        </p>
                      </div>
                    </div>
                    <div className="row py-2">
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
                    <div className="row py-2">
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
          </div>

          <div className="col">
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

            {/* Current Church Status */}
            <div className="row">
              <div className="col">
                <MemberCard title="Current Church Activity">
                  <div className="container p-2">
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">{`${capitalise(
                          church.church
                        )}`}</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.centre
                            ? memberData.displayMember.centre[
                                `${church.subChurch}`
                              ][`${church.church}`].name
                            : null}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">{`${capitalise(
                          church.subChurch
                        )}`}</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.centre
                            ? memberData.displayMember.centre[
                                `${church.subChurch}`
                              ].name
                            : null}
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
                          {memberData.displayMember.centre
                            ? `${memberData.displayMember.centre.leader.firstName} ${memberData.displayMember.centre.leader.lastName}`
                            : null}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">Sonta</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.sonta
                            ? `${memberData.displayMember.sonta.name}`
                            : null}
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
                          {memberData.displayMember.sonta.leader
                            ? `${memberData.displayMember.sonta.leader.firstName} ${memberData.displayMember.sonta.leader.lastName}`
                            : null}
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
