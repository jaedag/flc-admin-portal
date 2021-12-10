import { gql } from '@apollo/client'

export const DISPLAY_MEMBER = gql`
  query ($id: ID!) {
    members(where: { id: $id }) {
      firstName
      middleName
      lastName
      fullName
      email
      phoneNumber
      pictureUrl
      whatsappNumber
      pictureUrl
      dob {
        date
      }
      gender {
        gender
      }
      maritalStatus {
        status
      }
      occupation {
        occupation
      }

      #church info
      stream
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
      titleConnection {
        edges {
          dateAppointed
          node {
            title
          }
        }
      }
      fellowship {
        id
        name
        leader {
          firstName
          lastName
        }
        bacenta {
          id
          name
          town {
            id
            name
            bishop {
              id
              firstName
              lastName
              fullName
            }
          }
          campus {
            id
            name
            bishop {
              id
              firstName
              lastName
              fullName
            }
          }
        }
      }
      #Personal history
      history(options: { limit: 3 }) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream
        }
        historyRecord
      }
      #Leadership Information
      leadsFellowship {
        id
        name
        stream
        leader {
          firstName
          lastName
        }
      }
      leadsBacenta {
        id
        name
        stream
      }
      leadsTown {
        id
        name
        stream
      }
      leadsCampus {
        id
        name
        stream
      }
      leadsCouncil {
        id
        name
        stream
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

      isAdminForCouncil {
        id
        name
        stream
      }
      isAdminForCampus {
        id
        name
        stream
      }
      isAdminForTown {
        id
        name
        stream
      }
    }
  }
`

export const DISPLAY_FELLOWSHIP = gql`
  query ($id: ID) {
    fellowships(where: { id: $id }, options: { limit: 1 }) {
      id
      labels
      stream
      bankingCode
      name
      memberCount
      location {
        longitude
        latitude
      }
      meetingDay {
        day
      }
      bacenta {
        id
        name
        town {
          id
          name
        }
      }
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
    }
  }
`
export const DISPLAY_FELLOWSHIP_HISTORY = gql`
  query ($id: ID) {
    fellowships(where: { id: $id }, options: { limit: 1 }) {
      id
      services(limit: 5) {
        week
      }
      history(options: { limit: 5 }) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_SONTA = gql`
  query DisplaySonta($id: ID) {
    sontas(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      ministry {
        id
        name
      }
      leader {
        id
        firstName
        lastName
        fullName
        whatsappNumber
        title {
          title
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
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream
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

export const DISPLAY_BACENTA = gql`
  query ($id: ID) {
    bacentas(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      stream
      fellowships {
        id
        name
        bacenta {
          id
          name
          stream
        }
      }
      town {
        id
        name
        stream
      }
      campus {
        id
        name
        stream
      }
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
        whatsappNumber
        title {
          title
        }
      }
      history(options: { limit: 10 }) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream
        }
        historyRecord
      }
      memberCount
    }
  }
`

export const DISPLAY_TOWN = gql`
  query ($id: ID) {
    towns(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      stream
      bacentas {
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
        fellowship {
          id
          bacenta {
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
      council {
        id
        name
      }
      bishop {
        id
        firstName
        lastName
        fullName
      }
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      history(options: { limit: 10 }) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream
        }
        historyRecord
      }
      memberCount
      fellowshipCount
    }
  }
`

export const DISPLAY_CAMPUS = gql`
  query ($id: ID) {
    campuses(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      stream
      council {
        id
        name
      }
      bacentas {
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
        fellowship {
          id
          bacenta {
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
        fullName
      }
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      history(options: { limit: 10 }) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream
        }
        historyRecord
      }
      memberCount
      fellowshipCount
    }
  }
`

export const DISPLAY_COUNCIL = gql`
  query ($id: ID) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      stream
      constituencyCount
      bacentaCount
      fellowshipCount
      memberCount
      pastorCount
      towns(options: { limit: 5 }) {
        id
        name
        stream
      }
      campuses(options: { limit: 5 }) {
        id
        name
        stream
      }

      admin {
        id
        firstName
        lastName
        fellowship {
          id
          bacenta {
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
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      history(options: { limit: 10 }) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_STREAM = gql`
  query ($id: ID) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      constituencyCount
      bacentaCount
      fellowshipCount
      memberCount
      pastorCount
      councils {
        id
        name
        leader {
          id
        }
      }

      admin {
        id
        firstName
        lastName
        fellowship {
          id
          bacenta {
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
      leader {
        id
        firstName
        lastName
        fullName
        pictureUrl
      }
      history(options: { limit: 10 }) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
          stream
        }
        historyRecord
      }
    }
  }
`
