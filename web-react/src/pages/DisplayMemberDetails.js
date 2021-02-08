import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { NavBar } from '../components/NavBar'
import { MemberCard } from '../components/MemberCard'
import { DISPLAY_MEMBER } from '../queries/DisplayQueries'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'

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
  const {
    church,
    setBacentaID,
    setCentreID,
    setTownID,
    setCampusID,
    setSontaID,
  } = useContext(ChurchContext)

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

  let rank = []

  if (memberData.displayMember.leadsBacenta[0]) {
    rank.push({
      desc: `Bacenta Leader of ${memberData.displayMember.leadsBacenta[0].name}`,
      link: '/bacenta/displaydetails',
      setter: { setBacentaID },
    })
  }
  if (memberData.displayMember.leadsCentre[0]) {
    rank.push({
      desc: `Centre Leader of ${memberData.displayMember.leadsCentre.name}`,
      link: '/centre/displaydetails',
      setter: { setCentreID },
    })
  }
  if (memberData.displayMember.townGSO[0]) {
    rank.push({
      desc: `Con Rep of ${memberData.displayMember.townGSO.name}`,
      link: '/town/displaydetails',
      set: { setTownID },
    })
  }
  if (memberData.displayMember.campusGSO[0]) {
    rank.push({
      detail: memberData.displayMember.campusGSO.map((campus) => ({
        desc: `Con Rep of ${campus.name}`,
        id: campus.campusID,
        setter: { setCampusID },
      })),
      link: '/campus/displaydetails',
    })
  }
  if (memberData.displayMember.leadsSonta[0]) {
    rank.push({
      detail: memberData.displayMember.leadsSonta.map((sonta) => ({
        desc: `Sonta Leader of ${sonta.name}`,
        id: sonta.sontaID,
      })),
      link: '/sonta/displaydetails',
      setter: { setSontaID },
    })
  }
  if (memberData.displayMember.leadsMinistry[0]) {
    rank.push({
      desc: `Ministry Leader of ${memberData.displayMember.leadsMinistry.name}`,
      link: '',
      setMinistryID: '',
    })
  }
  if (memberData.displayMember.townBishop[0]) {
    rank.push({
      desc: `Town Bishop`,
      link: '/dashboard',
    })
  }

  if (memberData.displayMember.campusBishop[0]) {
    rank.push({
      desc: `Campus Bishop`,
      link: '/dashboard',
    })
  }
  // console.log(rank)

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
                  editlink="/member/editmember"
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
                        {
                          //Rank Discussions
                          !rank === []
                            ? rank.map((rank, i) => (
                                <Link key={i} to={rank.link}>
                                  {rank.detail.map((detail, i) => (
                                    <p
                                      key={i}
                                      onClick={() => {
                                        detail.set(detail.id)
                                      }}
                                    >
                                      {detail.desc}
                                    </p>
                                  ))}
                                </Link>
                              ))
                            : null
                        }
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
                <MemberCard title="Bio" editlink="/member/editmember">
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
                          {memberData.displayMember.gender
                            ? memberData.displayMember.gender.gender
                            : null}
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
                          {memberData.displayMember.maritalStatus
                            ? memberData.displayMember.maritalStatus.status
                            : null}
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
                            : '-'}
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
                  <MemberCard title="History Timeline" editlink="#">
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
                <MemberCard title="Current Church Activity" editlink="#">
                  <div className="container p-2">
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">Bishop</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.bacenta
                            ? memberData.displayMember.bacenta.name
                              ? `${
                                  memberData.displayMember.bacenta.centre[
                                    `${church.church}`
                                  ].bishop.firstName
                                } ${
                                  memberData.displayMember.bacenta.centre[
                                    `${church.church}`
                                  ].bishop.lastName
                                }`
                              : null
                            : null}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">Bacenta</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.bacenta
                            ? memberData.displayMember.bacenta.name
                              ? memberData.displayMember.bacenta.name
                              : null
                            : null}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col">
                        <p className="text-secondary card-text">Ministry</p>
                      </div>
                      <div className="col">
                        <p className="font-weight-bold card-text">
                          {memberData.displayMember.ministry
                            ? `${memberData.displayMember.ministry.name}`
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
