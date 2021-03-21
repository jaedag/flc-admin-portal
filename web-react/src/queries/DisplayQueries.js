import { gql } from '@apollo/client'

export const DISPLAY_BISHOP_NAME = gql`
  query displayMember($id: ID) {
    displayMember(id: $id) {
      firstName
      lastName
    }
  }
`

export const DISPLAY_MEMBER = gql`
  query displayMember($id: ID) {
    displayMember(id: $id) {
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
            bishop {
              firstName
              lastName
            }
          }
          campus {
            name
            bishop {
              firstName
              lastName
            }
          }
        }
      }
      ministry {
        id
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
        historyDate {
          date {
            formatted
          }
        }
        historyRecord
      }
      leadsBacenta {
        id
        name
      }
      leadsCentre {
        id
        name
      }
      townGSO {
        id
        name
      }
      campusGSO {
        id
        name
        bishop {
          id
          firstName
          lastName
        }
      }
      leadsSonta {
        id
        name
      }
      leadsMinistry {
        id
        name
      }
      townBishop {
        id
        name
      }
      campusBishop {
        id
        name
      }
    }
  }
`

export const DISPLAY_BACENTA = gql`
  query displayBacenta($id: ID) {
    displayBacenta(id: $id) {
      id
      name
      meetingDay {
        day
      }
      location {
        latitude
        longitude
      }
      centre {
        id
        name
      }
      leader {
        id
        firstName
        lastName
        whatsappNumber
        title {
          Title {
            title
          }
        }
      }
    }
    bacentaMemberCount(id: $id)
  }
`

export const DISPLAY_CENTRE = gql`
  query displayCentre($id: ID) {
    displayCentre(id: $id) {
      id
      name
      bacentas {
        id
        name
      }
      town {
        id
        name
      }
      campus {
        id
        name
      }
      leader {
        id
        firstName
        lastName
        whatsappNumber
        title {
          Title {
            title
          }
        }
      }
    }
    centreMemberCount(id: $id)
    centreBacentaCount(id: $id)
  }
`

export const DISPLAY_TOWN = gql`
  query displayTown($id: ID) {
    displayTown(id: $id) {
      name
      centres {
        id
        name
      }
      sontas {
        id
        name
      }
      admin {
        id
        firstName
        lastName
        bacenta {
          centre {
            town {
              name
              bishop {
                id
              }
            }
            campus {
              name
              bishop {
                id
              }
            }
          }
        }
      }
      bishop {
        id
        firstName
        lastName
      }
      leader {
        id
        firstName
        lastName
        whatsappNumber
        title {
          Title {
            title
          }
        }
      }
    }
    townMemberCount(id: $id)
    townCentreCount(id: $id)
  }
`

export const DISPLAY_CAMPUS = gql`
  query displayCampus($id: ID) {
    displayCampus(id: $id) {
      id
      name
      centres {
        id
        name
      }
      sontas {
        id
        name
      }
      bishop {
        id
        firstName
        lastName
      }
      admin {
        id
        firstName
        lastName
        bacenta {
          centre {
            town {
              name
              bishop {
                id
              }
            }
            campus {
              name
              bishop {
                id
              }
            }
          }
        }
      }
      leader {
        id
        firstName
        lastName
        whatsappNumber
        title {
          Title {
            title
          }
        }
      }
    }
    campusMemberCount(id: $id)
    campusCentreCount(id: $id)
  }
`
