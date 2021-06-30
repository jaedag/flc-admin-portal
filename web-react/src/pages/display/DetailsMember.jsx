import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import NavBar from '../../components/nav/NavBar'
import MemberDetailsCard from '../../components/card/MemberDetailsCard'
import { DISPLAY_MEMBER } from '../../queries/ReadQueries'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
import { MemberContext } from '../../contexts/MemberContext'
import userIcon from '../../img/user.png'
import Timeline from '../../components/Timeline/Timeline'
import { getNameWithTitle, getMemberDob } from '../../global-utils'
import MemberRankList from '../../components/MemberRankList'

const DisplayMemberDetails = () => {
  const { memberId } = useContext(MemberContext)

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
    const memberBirthday = getMemberDob(member)
    let nameAndTitle = getNameWithTitle(member)

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
                        <MemberRankList member={member} />
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
                            {memberBirthday && memberBirthday}
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
                    title="Current Church Groups"
                    editlink="/member/editmember"
                  >
                    <div className="container p-2">
                      <div className="row mb-2">
                        <div className="col">
                          <p className="text-secondary card-text">Bishop</p>
                        </div>
                        <div className="col">
                          <p className="font-weight-bold card-text">
                            {member?.bishop.fullName}
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
