import { gql } from '@apollo/client'

export const DISPLAY_APOSTLE_NAME = gql`
  query displayMember($memberID: ID) {
    displayMember(memberID: $memberID) {
      firstName
      lastName
    }
  }
`

export const DISPLAY_MEMBER = gql`
  query displayMember($memberID: ID) {
    displayMember(memberID: $memberID) {
      firstName
      lastName
      email
      phoneNumber
      whatsappNumber
      pictureUrl
      gender {
        gender
      }
      maritalStatus {
        status
      }
      dob {
        date {
          formatted
          day
          month
          year
        }
      }
      centre {
        name
        leader {
          firstName
          lastName
        }
        community {
          name
          town {
            name
          }
        }
      }
      sonta {
        name
        leader {
          firstName
          lastName
        }
      }
      occupation {
        occupation
      }
      title {
        Title {
          title
        }
        yearAppointed {
          year
        }
      }
      leadershipHistory(orderBy: created_at_desc) {
        historyStartDate {
          date {
            formatted
          }
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_CENTRE = gql`
  query displayCentre($centreID: ID) {
    displayCentre(centreID: $centreID) {
      name
      meetingDay {
        day
      }
      leader {
        firstName
        lastName
        title {
          Title {
            title
          }
        }
      }
    }
    centreMemberCount(centreID: $centreID)
  }
`

export const DISPLAY_COMMUNITY = gql`
  query displayCommunity($communityID: ID) {
    displayCommunity(communityID: $communityID) {
      name
      centres {
        centreID
        name
      }
      leader {
        firstName
        lastName
        title {
          Title {
            title
          }
        }
      }
    }
    communityMemberCount(communityID: $communityID)
    communityCentreCount(communityID: $communityID)
  }
`

export const DISPLAY_TOWN = gql`
  query displayTown($townID: ID) {
    displayTown(townID: $townID) {
      name
      communities {
        communityID
        name
      }
      leader {
        firstName
        lastName
        title {
          Title {
            title
          }
        }
      }
    }
    townMemberCount(townID: $townID)
    townCommunityCount(townID: $townID)
  }
`

export const DISPLAY_CAMPUS = gql`
  query displayCampus($campusID: ID) {
    displayCampus(campusID: $campusID) {
      name
      halls {
        hallID
        name
      }
      leader {
        firstName
        lastName
        title {
          Title {
            title
          }
        }
      }
    }
    campusMemberCount(campusID: $campusID)
    campusHallCount(campusID: $campusID)
  }
`
