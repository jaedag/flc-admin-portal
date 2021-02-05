import { gql } from '@apollo/client'

export const DISPLAY_BISHOP_NAME = gql`
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
      bacenta {
        name
        leader {
          firstName
          lastName
        }
        centre {
          name
          town {
            name
          }
          campus {
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
      leadsBacenta {
        bacentaID
        name
      }
      leadsCentre {
        centreID
        name
      }
      townGSO {
        townID
        name
      }
      campusGSO {
        campusID
        name
      }
      leadsSonta {
        sontaID
        name
      }
      leadsMinistry {
        ministryID
        name
      }
      townBishop {
        townID
        name
      }
      campusBishop {
        campusID
        name
      }
    }
  }
`

export const DISPLAY_BACENTA = gql`
  query displayBacenta($bacentaID: ID) {
    displayBacenta(bacentaID: $bacentaID) {
      name
      meetingDay {
        day
      }
      leader {
        memberID
        firstName
        lastName
        title {
          Title {
            title
          }
        }
      }
    }
    bacentaMemberCount(bacentaID: $bacentaID)
  }
`

export const DISPLAY_CENTRE = gql`
  query displayCentre($centreID: ID) {
    displayCentre(centreID: $centreID) {
      name
      bacentas {
        bacentaID
        name
      }
      leader {
        memberID
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
    centreBacentaCount(centreID: $centreID)
  }
`

export const DISPLAY_TOWN = gql`
  query displayTown($townID: ID) {
    displayTown(townID: $townID) {
      name
      centres {
        centreID
        name
      }
      leader {
        memberID
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
    townCentreCount(townID: $townID)
  }
`

export const DISPLAY_CAMPUS = gql`
  query displayCampus($campusID: ID) {
    displayCampus(campusID: $campusID) {
      name
      centres {
        centreID
        name
      }
      leader {
        memberID
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
    campusCentreCount(campusID: $campusID)
  }
`
