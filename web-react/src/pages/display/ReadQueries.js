import { gql } from '@apollo/client'

export const DISPLAY_MEMBER = gql`
  query($id: ID!) {
    member(id: $id) {
      firstName
      middleName
      lastName
      fullName
      email
      phoneNumber
      pictureUrl
      whatsappNumber
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
        }
        historyRecord
      }
      #Leadership Information
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
      isBishopForTown {
        id
        name
      }
      isBishopForCampus {
        id
        name
      }
      isAdminForCouncil {
        id
        name
      }
      isAdminForCampus {
        id
        name
      }
      isAdminForTown {
        id
        name
      }
    }
  }
`

export const DISPLAY_BACENTA = gql`
  query($id: ID) {
    bacentas(where: { id: $id }, options: { limit: 1 }) {
      id
      labels
      bankingCode
      name
      location {
        longitude
        latitude
      }
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
        fullName
        pictureUrl
        whatsappNumber
      }
      services(options: { limit: 3 }) {
        id
        serviceRecords(options: { limit: 3 }) {
          week
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
        }
        historyRecord
      }
      memberCount
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
    centres(where: { id: $id }, options: { limit: 1 }) {
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
        }
        historyRecord
      }
      memberCount
    }
  }
`

export const DISPLAY_TOWN = gql`
  query($id: ID) {
    towns(where: { id: $id }, options: { limit: 1 }) {
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
        }
        historyRecord
      }
      memberCount
    }

    townBacentaCount(id: $id)
  }
`

export const DISPLAY_CAMPUS = gql`
  query($id: ID) {
    campuses(where: { id: $id }, options: { limit: 1 }) {
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
        }
        historyRecord
      }
      memberCount
    }
    campusBacentaCount(id: $id)
  }
`

export const DISPLAY_COUNCIL = gql`
  query($id: ID) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      constituencyCount
      towns(options: { limit: 5 }) {
        id
        name
        bishop {
          id
        }
      }
      campuses(options: { limit: 5 }) {
        id
        name
        bishop {
          id
        }
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
        }
        historyRecord
      }
      memberCount
    }
  }
`
