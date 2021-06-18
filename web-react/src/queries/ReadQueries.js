import { gql } from '@apollo/client'

export const DISPLAY_MEMBER = gql`
  query($id: ID) {
    members(where: { id: $id }) {
      id
      firstName
      middleName
      lastName
      fullName
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
      # dob {
      #   date
      # }
      bacenta {
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
        title
      }
      history {
        # timeStamp
        # created_at {
        #   date
        # }
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
            id
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
        sonta {
          id
        }
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
      isBishopAdminFor {
        id
        firstName
        lastName
      }
      isCampusAdminFor {
        id
        name
      }
      isTownAdminFor {
        id
        name
      }
    }
  }
`

export const DISPLAY_BACENTA = gql`
  query($id: ID) {
    bacentas(where: { id: $id }) {
      id
      name
      meetingDay {
        day
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
          bishop {
            id
            firstName
            lastName
          }
        }
      }
      leader {
        id
        firstName
        lastName
        whatsappNumber
        title {
          title
        }
      }
      history(options: { limit: 10 }) {
        id
        # timeStamp
        # created_at {
        #   date
        # }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
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
      history(options: { limit: 10 }) {
        id
        # timeStamp
        # created_at {
        #   date
        # }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
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
  query($id: ID) {
    centres(where: { id: $id }) {
      id
      name
      bacentas {
        id
        name
        centre {
          id
          name
          town {
            id
            bishop {
              id
            }
          }
          campus {
            id
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
          title
        }
      }
      history(options: { limit: 10 }) {
        id
        # timeStamp
        # created_at {
        #   date
        # }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
    centreMemberCount(id: $id)
    centreBacentaCount(id: $id)
  }
`

export const DISPLAY_TOWN = gql`
  query($id: ID) {
    towns(where: { id: $id }) {
      id
      name
      centres {
        id
        name
        town {
          id
          name
          bishop {
            id
          }
        }
        campus {
          id
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
          id
          centre {
            id
            town {
              id
              name
              bishop {
                id
              }
            }
            campus {
              id
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
      }
      history(options: { limit: 10 }) {
        id
        # timeStamp
        # created_at {
        #   date
        # }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
    townMemberCount(id: $id)
    townCentreCount(id: $id)
  }
`

export const DISPLAY_CAMPUS = gql`
  query($id: ID) {
    campuses(where: { id: $id }) {
      id
      name
      centres {
        id
        name
        town {
          id
          name
          bishop {
            id
          }
        }
        campus {
          id
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
          id
          centre {
            id
            town {
              id
              name
              bishop {
                id
              }
            }
            campus {
              id
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
      }
      history(options: { limit: 10 }) {
        id
        # timeStamp
        # created_at {
        #   date
        # }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
    campusMemberCount(id: $id)
    campusCentreCount(id: $id)
  }
`
