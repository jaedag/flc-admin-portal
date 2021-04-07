import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { MemberCard } from '../components/MemberCard'
import { DISPLAY_MEMBER } from '../queries/DisplayQueries'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import userIcon from '../img/user.png'
import { Timeline } from '../components/Timeline'

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

  const { memberId } = useContext(MemberContext)
  const { church, capitalise, determineChurch, clickCard } = useContext(
    ChurchContext
  )
  const history = useHistory()

  const { data: memberData, loading: memberLoading } = useQuery(
    DISPLAY_MEMBER,
    {
      variables: { id: memberId },
    }
  )

  if (memberLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (memberData && memberId) {
    let rank = {
      bishop: [],
      campusLeader: [],
      townLeader: [],
      sontaLeader: [],
      basontaLeader: [],
      centreLeader: [],
      bacentaLeader: [],
    }

    const updateRank = (member, churchType) => {
      if (churchType === 'bishop') {
        if (member.townBishop[0]) {
          member.townBishop.map((church) => {
            rank.bishop.push({
              name: church.name,
              church: church,
              id: church.id,
              __typename: church.__typename,
            })
            return null
          })
          return
        } else if (member.campusBishop[0]) {
          member.campusBishop.map((church) => {
            rank.bishop.push({
              name: church.name,
              church: church,
              id: church.id,
              __typename: church.__typename,
            })
            return null
          })
          return
        }
      }

      member[`leads${capitalise(churchType)}`].map((church) => {
        let ch = church.__typename.toLowerCase()

        rank[`${ch}Leader`].push({
          name: church.name,
          centre: church.centre,
          campus: church.campus,
          town: church.town,
          bishop: church.bishop,
          id: church.id,
          link: '',
          __typename: church.__typename,
        })
        return null
      })
      return null
    }

    if (memberData.displayMember.leadsBacenta[0]) {
      updateRank(memberData.displayMember, 'bacenta')
    }
    if (memberData.displayMember.leadsCentre[0]) {
      updateRank(memberData.displayMember, 'centre')
    }
    if (memberData.displayMember.leadsTown[0]) {
      updateRank(memberData.displayMember, 'town')
    }
    if (memberData.displayMember.leadsCampus[0]) {
      updateRank(memberData.displayMember, 'campus')
    }
    if (memberData.displayMember.leadsSonta[0]) {
      updateRank(memberData.displayMember, 'sonta')
    }
    if (memberData.displayMember.leadsBasonta[0]) {
      updateRank(memberData.displayMember, 'basonta')
    }
    if (memberData.displayMember.leadsMinistry[0]) {
      updateRank(memberData.displayMember, 'ministry')
    }
    if (memberData.displayMember.townBishop[0]) {
      updateRank(memberData.displayMember, 'bishop')
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
                          src={
                            memberData.displayMember.pictureUrl
                              ? memberData.displayMember.pictureUrl
                              : userIcon
                          }
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
                        <div className="font-weight-light card-text text-center">
                          {memberData.displayMember.townBishop[0] ? (
                            <span
                              onClick={() => {
                                determineChurch(memberData.displayMember)
                                history.push('/dashboard')
                              }}
                            >{`Bishop in the First Love Centre`}</span>
                          ) : (
                            //Rank Discussions */}
                            Object.entries(rank).map((rank) => {
                              return rank[1].map((place, i) => {
                                // console.log(place)
                                let leader
                                if (place.__typename === ('Campus' || 'Town')) {
                                  leader = 'CO'
                                } else {
                                  leader = 'Leader'
                                }
                                return (
                                  <span
                                    key={i}
                                    onClick={() => {
                                      clickCard(place)
                                      history.push(place.link)
                                    }}
                                  >
                                    <span className="font-weight-bold">{`${place.__typename} ${leader}`}</span>
                                    {` for ${place.name}`}
                                    <br />
                                  </span>
                                )
                              })
                            })
                          )}
                        </div>
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
                                    memberData.displayMember.dob.date.month - 1
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
                          <p className="text-secondary card-text">
                            Phone Number
                          </p>
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
              {memberData.displayMember.history[0] ? (
                <div className="row">
                  <div className="col">
                    <MemberCard title="History Timeline" editlink="#">
                      <div className="row">
                        <Timeline
                          record={memberData.displayMember.history}
                          limit={3}
                        />
                      </div>
                    </MemberCard>
                  </div>
                </div>
              ) : null}

              {/* Current Church Status */}
              <div className="row">
                <div className="col">
                  <MemberCard
                    title="Current Church Activity"
                    editlink="/member/editmember"
                  >
                    <div className="container p-2">
                      <div className="row mb-2">
                        <div className="col">
                          <p className="text-secondary card-text">Bishop</p>
                        </div>
                        <div className="col">
                          <p className="font-weight-bold card-text">
                            {memberData.displayMember?.bacenta?.centre
                              ? memberData.displayMember?.bacenta?.centre[
                                  `${church.church}`
                                ]?.bishop
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
                                  memberData.displayMember.title[0]
                                    .yearAppointed.year
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
  } else {
    return <ErrorScreen />
  }
}
