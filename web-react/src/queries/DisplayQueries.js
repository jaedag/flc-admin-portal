import { gql } from '@apollo/client'

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
        title(orderBy: yearAppointed_desc) {
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
      leader {
        firstName
        lastName
        title(orderBy: yearAppointed_desc) {
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
