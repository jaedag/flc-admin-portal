import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import NavBar from '../../components/nav/NavBar'
import MemberDetailsCard from '../../components/card/MemberDetailsCard'
import { DISPLAY_MEMBER } from '../display/ReadQueries'
import ErrorScreen from '../../components/ErrorScreen'
import LoadingScreen from '../../components/LoadingScreen'
import { MemberContext } from '../../contexts/MemberContext'
import { ChurchContext } from '../../contexts/ChurchContext'
import userIcon from '../../img/user.png'
import Timeline from '../../components/Timeline/Timeline.jsx'
import { getNameWithTitle, getMemberDob } from '../../global-utils'
import AuthButton from '../../components/buttons/AuthButton'
import MemberRankList from '../../components/MemberRoleList'

const UserProfileDisplayPage = () => {
  const { currentUser } = useContext(MemberContext)
  const { church } = useContext(ChurchContext)

  const { data: memberData, loading: memberLoading } = useQuery(
    DISPLAY_MEMBER,
    {
      variables: { id: currentUser.id },
    }
  )

  if (memberLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (memberData && currentUser.id) {
    const displayMember = memberData.members[0]
    const memberBirthday = getMemberDob(displayMember)
    let nameAndTitle = getNameWithTitle(displayMember)

    return (
      <div className="container pt-5">
        <NavBar />
        <div className="container pt-2">
          <div className="row justify-content-between">
            <div className="col">
              <h3 className="font-weight-bold mb-3">
                Display Member Information
              </h3>
            </div>
            <div className="col-auto d-none d-md-block">
              <AuthButton />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <p className="infobar">Basic Info</p>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-2">
            {/* Member Picture Profile Page */}
            <div className="col">
              <div className="row">
                <div className="col">
                  <MemberDetailsCard
                    editlink="/user-profile/edit"
                    title={nameAndTitle}
                  >
                    <div className="row row-cols-1 my-2">
                      <div className="col d-flex justify-content-center">
                        <img
                          src={
                            displayMember.pictureUrl
                              ? displayMember.pictureUrl
                              : userIcon
                          }
                          className="m-2 rounded profile-img"
                          alt={`${displayMember.firstName} ${displayMember.lastName}`}
                        />
                      </div>

                      <div className="col d-flex justify-content-center mt-2">
                        <h5 className="font-weight-bold ">
                          {`${displayMember.firstName} ${displayMember.lastName}`}
                        </h5>
                      </div>
                      <div className="col d-flex justify-content-center mb-2">
                        <MemberRankList member={displayMember} />
                      </div>
                    </div>
                  </MemberDetailsCard>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {/* Bio Information */}
                  <MemberDetailsCard title="Bio" editlink="/user-profile/edit">
                    <div className="container p-2">
                      <div className="row py-2">
                        <div className="col ">
                          <p className="text-secondary card-text">First Name</p>
                        </div>
                        <div className="col">
                          <p className="font-weight-bold card-text">
                            {displayMember.firstName}
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
                            {displayMember.middleName}
                          </p>
                        </div>
                      </div>
                      <div className="row py-2">
                        <div className="col">
                          <p className="text-secondary card-text">Last Name</p>
                        </div>
                        <div className="col">
                          <p className="font-weight-bold card-text">
                            {displayMember.lastName}
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
                            {displayMember.email}
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
                            {displayMember.gender
                              ? displayMember.gender.gender
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
                            {displayMember.maritalStatus
                              ? displayMember.maritalStatus.status
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
                            {displayMember.occupation
                              ? displayMember.occupation.occupation
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
                            href={`tel:${displayMember.phoneNumber}`}
                          >
                            {displayMember.phoneNumber}
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
                            href={`https://wa.me/${displayMember.whatsappNumber}`}
                          >
                            {displayMember.whatsappNumber}
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
              {displayMember.history[0] ? (
                <div className="row">
                  <div className="col">
                    <MemberDetailsCard title="History Timeline" editlink="#">
                      <div className="row">
                        <Timeline record={displayMember.history} limit={3} />
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
                    editlink="/user-profile/edit"
                  >
                    <div className="container p-2">
                      <div className="row mb-2">
                        <div className="col">
                          <p className="text-secondary card-text">Bishop</p>
                        </div>
                        <div className="col">
                          <p className="font-weight-bold card-text">
                            {`${
                              displayMember.bacenta.centre[`${church.church}`]
                                ?.bishop.fullName
                            }`}
                          </p>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col">
                          <p className="text-secondary card-text">Bacenta</p>
                        </div>
                        <div className="col">
                          <p className="font-weight-bold card-text">
                            {displayMember.bacenta
                              ? displayMember.bacenta.name
                                ? displayMember.bacenta.name
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
                            {displayMember.ministry
                              ? `${displayMember.ministry.name}`
                              : null}
                          </p>
                        </div>
                      </div>
                      {displayMember.title[0] ? (
                        <div>
                          <div className="row mb-2">
                            <div className="col">
                              <p className="text-secondary card-text">Title</p>
                            </div>
                            <div className="col">
                              <p className="font-weight-bold card-text">
                                {displayMember.title[0].title}
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
                                {`${displayMember.title[0]?.yearAppointed?.year}`}
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
          <div className="row justify-content-center my-2 mb-4">
            <div className="col-auto ">
              <AuthButton mobileFullSize="true" />
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <ErrorScreen />
  }
}

export default UserProfileDisplayPage
