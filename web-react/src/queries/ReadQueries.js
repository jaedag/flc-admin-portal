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
      id
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
      history {
        timeStamp {
          hour
          minute
        }
        created_at {
          date {
            formatted
          }
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
      leadsBacenta {
        id
        name
        leader {
          firstName
          lastName
        }
        centre {
          id
          name
          town {
            name
            bishop {
              firstName
              lastName
            }
          }
          campus {
            id
            name
            bishop {
              firstName
              lastName
            }
          }
        }
      }
      leadsCentre {
        id
        name
        town {
          id
          name
          bishop {
            id
            firstName
            lastName
          }
        }
        campus {
          id
          name
          bishop {
            id
            firstName
            lastName
          }
        }
      }
      leadsTown {
        id
        name
        bishop {
          id
          firstName
          lastName
        }
      }
      leadsCampus {
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
      leadsBasonta {
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
        town {
          id
          name
          bishop {
            id
            firstName
            lastName
          }
        }
        campus {
          id
          name
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
      history {
        HistoryLog {
          id
          timeStamp {
            hour
            minute
          }
          created_at {
            date {
              formatted
            }
          }
          loggedBy {
            id
            firstName
            lastName
          }
          historyRecord
        }
      }
    }
    bacentaMemberCount(id: $id)
  }
`

export const DISPLAY_SONTA = gql`
  query displaySonta($id: ID) {
    displaySonta(id: $id) {
      id
      name
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
      town {
        id
        name
        bishop {
          id
          firstName
          lastName
        }
      }
      campus {
        id
        name
        bishop {
          id
          firstName
          lastName
        }
      }
      history {
        HistoryLog {
          id
          timeStamp {
            hour
            minute
          }
          created_at {
            date {
              formatted
            }
          }
          loggedBy {
            id
            firstName
            lastName
          }
          historyRecord
        }
      }
    }
    sontaMemberCount(id: $id)
    sontaBasontaLeaderList(id: $id) {
      id
      firstName
      lastName
    }
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
        centre {
          id
          name
          town {
            bishop {
              id
            }
          }
          campus {
            bishop {
              id
            }
          }
        }
      }
      town {
        id
        name
        bishop {
          id
          firstName
          lastName
        }
      }
      campus {
        id
        name
        bishop {
          id
          firstName
          lastName
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
      history {
        HistoryLog {
          id
          timeStamp {
            hour
            minute
          }
          created_at {
            date {
              formatted
            }
          }
          loggedBy {
            id
            firstName
            lastName
          }
          historyRecord
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
      history(first: 10) {
        HistoryLog {
          id
          timeStamp {
            hour
            minute
          }

          created_at {
            date {
              formatted
            }
          }
          loggedBy {
            id
            firstName
            lastName
          }
          historyRecord
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
      history(first: 10) {
        HistoryLog {
          id
          timeStamp {
            hour
            minute
          }

          created_at {
            date {
              formatted
            }
          }
          loggedBy {
            id
            firstName
            lastName
          }
          historyRecord
        }
      }
    }
    campusMemberCount(id: $id)
    campusCentreCount(id: $id)
  }
`
