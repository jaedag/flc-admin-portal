import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import NavBar from '../../components/nav/NavBar'
import MemberDetailsCard from '../../components/card/MemberDetailsCard'
import { DISPLAY_MEMBER } from '../../queries/ReadQueries'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
import { MemberContext } from '../../contexts/MemberContext'
import { ChurchContext } from '../../contexts/ChurchContext'
import userIcon from '../../img/user.png'
import Timeline from '../../components/Timeline/Timeline'
import { getNameWithTitle, MONTH_NAMES, capitalise } from '../../global-utils'

const DisplayMemberDetails = () => {
  const { memberId } = useContext(MemberContext)
  const { church, determineStream, clickCard } = useContext(ChurchContext)
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
    const member = memberData.members[0]
    let nameAndTitle = getNameWithTitle(member)

    //To Display Ranks on the Member Card
    let rank = {
      bishop: [],
      campusLeader: [],
      townLeader: [],
      sontaLeader: [],
      basontaLeader: [],
      centreLeader: [],
      bacentaLeader: [],
      bishopAdmin: [],
      constituencyAdmin: [],
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

      if (churchType === 'bishopAdmin') {
        member.isBishopAdminFor.map((adminFor) => {
          rank.bishopAdmin.push({
            admin: true,
            name: `Bishop ${adminFor.firstName} ${adminFor.lastName}`,
            id: adminFor.id,
            __typename: 'Bishop',
          })
          return null
        })
        return
      }

      if (churchType === 'constituencyAdmin') {
        if (member.isCampusAdminFor[0]) {
          member.isCampusAdminFor.map((adminFor) => {
            rank.constituencyAdmin.push({
              constituency: true,
              name: `${adminFor.name}`,
              id: adminFor.id,
              __typename: adminFor.__typename,
            })
            return null
          })
          return
        } else if (member.isTownAdminFor[0]) {
          member.isTownAdminFor.map((adminFor) => {
            rank.constituencyAdmin.push({
              constituency: true,
              name: `${adminFor.name}`,
              id: adminFor.id,
              __typename: adminFor.__typename,
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
          sonta: church.sonta,
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

    if (member.leadsBacenta[0]) {
      updateRank(member, 'bacenta')
    }
    if (member.leadsCentre[0]) {
      updateRank(member, 'centre')
    }
    if (member.leadsTown[0]) {
      updateRank(member, 'town')
    }
    if (member.leadsCampus[0]) {
      updateRank(member, 'campus')
    }
    if (member.leadsSonta[0]) {
      updateRank(member, 'sonta')
    }
    if (member.leadsBasonta[0]) {
      updateRank(member, 'basonta')
    }
    if (member.leadsMinistry[0]) {
      updateRank(member, 'ministry')
    }
    if (member.townBishop[0]) {
      updateRank(member, 'bishop')
    }
    if (member.campusBishop[0]) {
      updateRank(member, 'bishop')
    }
    if (member.isBishopAdminFor[0]) {
      updateRank(member, 'bishopAdmin')
    }
    if (member.isCampusAdminFor[0]) {
      updateRank(member, 'constituencyAdmin')
    }
    if (member.isTownAdminFor[0]) {
      updateRank(member, 'constituencyAdmin')
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
                  <MemberDetailsCard
                    editlink="/member/editmember"
                    title={nameAndTitle}
                  >
                    <div className="row row-cols-1 my-2">
                      <div className="col d-flex justify-content-center">
                        <img
                          src={member.pictureUrl ? member.pictureUrl : userIcon}
                          className="m-2 rounded profile-img"
                          alt={`${member.fullName}`}
                        />
                      </div>

                      <div className="col d-flex justify-content-center mt-2">
                        <h5 className="font-weight-bold ">
                          {`${member.fullName}`}
                        </h5>
                      </div>
                      <div className="col d-flex justify-content-center mb-2">
                        <div className="font-weight-light card-text text-center">
                          {member.townBishop[0] || member.campusBishop[0] ? (
                            <span
                              onClick={() => {
                                determineStream(member)
                                history.push('/dashboard')
                              }}
                            >{`Bishop in the First Love Centre`}</span>
                          ) : (
                            //Rank Discussions */}
                            Object.entries(rank).map((rank) => {
                              return rank[1].map((place, i) => {
                                let leader

                                if (
                                  place.__typename === 'Campus' ||
                                  place.__typename === 'Town'
                                ) {
                                  leader = 'CO'
                                } else {
                                  leader = 'Leader'
                                }

                                if (place.admin || place.constituency) {
                                  leader = 'Admin'
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
                    </div>
                  </MemberDetailsCard>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {/* Bio Information */}
                  <MemberDetailsCard title="Bio" editlink="/member/editmember">
                    <div className="container p-2">
                      <div className="row py-2">
                        <div className="col ">
                          <p className="text-secondary card-text">First Name</p>
                        </div>
                        <div className="col">
                          <p className="font-weight-bold card-text">
                            {member.firstName}
                          </p>
                        </div>
                      </div>
                      <div className="row py-2">
                        <div className="col ">
                          <p className="text-secondary card-text">
                            Middle Name
                          </p>
                        </div>
                        <div className="col">
                          <p className="font-weight-bold card-text">
                            {member.middleName}
                          </p>
                        </div>
                      </div>
                      <div className="row py-2">
                        <div className="col">
                          <p className="text-secondary card-text">Last Name</p>
                        </div>
                        <div className="col">
                          <p className="font-weight-bold card-text">
                            {member.lastName}
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
                            {member.email}
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
                            {member.dob
                              ? `${member.dob.date.day.low} ${
                                  MONTH_NAMES[member.dob.date.month.low - 1]
                                } ${member.dob.date.year.low}`
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
                            {member.gender ? member.gender.gender : null}
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
                            {member.maritalStatus
                              ? member.maritalStatus.status
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
                            {member.occupation
                              ? member.occupation.occupation
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
                            href={`tel:${member.phoneNumber}`}
                          >
                            {member.phoneNumber}
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
                            href={`https://wa.me/${member.whatsappNumber}`}
                          >
                            {member.whatsappNumber}
                          </a>
                        </div>
                      </div>
                    </div>
                  </MemberDetailsCard>
                </div>
              </div>
            </div>

            <div className="col">
              {/* Leadership History Timeline */}
              {member.history[0] ? (
                <div className="row">
                  <div className="col">
                    <MemberDetailsCard title="History Timeline" editlink="#">
                      <div className="row">
                        <Timeline record={member.history} limit={3} />
                      </div>
                    </MemberDetailsCard>
                  </div>
                </div>
              ) : null}

              {/* Current Church Status */}
              <div className="row">
                <div className="col">
                  <MemberDetailsCard
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
                            {member?.bacenta?.centre
                              ? member?.bacenta?.centre[`${church.church}`]
                                  ?.bishop
                                ? `${
                                    member.bacenta.centre[`${church.church}`]
                                      .bishop.firstName
                                  } ${
                                    member.bacenta.centre[`${church.church}`]
                                      .bishop.lastName
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
                            {member.bacenta
                              ? member.bacenta.name
                                ? member.bacenta.name
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
                            {member.ministry ? `${member.ministry.name}` : null}
                          </p>
                        </div>
                      </div>
                      {member.title[0] ? (
                        <div>
                          <div className="row mb-2">
                            <div className="col">
                              <p className="text-secondary card-text">Title</p>
                            </div>
                            <div className="col">
                              <p className="font-weight-bold card-text">
                                {member.title[0].title}
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
                                {`-`}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </MemberDetailsCard>
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

export default DisplayMemberDetails
