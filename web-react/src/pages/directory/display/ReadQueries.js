import { gql } from '@apollo/client'

export const DISPLAY_MEMBER_BIO = gql`
  query ($id: ID!) {
    members(where: { id: $id }) {
      id
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
      titleConnection {
        edges {
          date
          node {
            title
          }
        }
      }
    }
  }
`
export const DISPLAY_MEMBER_LEADERSHIP = gql`
  query ($id: ID!) {
    members(where: { id: $id }) {
      id

      #Leadership Information
      leadsFellowship {
        id
        name
        stream_name
        leader {
          firstName
          lastName
        }
      }
      leadsBacenta {
        id
        name
        stream_name
      }
      leadsConstituency {
        id
        name
        stream_name
      }
      leadsCouncil {
        id
        name
        stream_name
      }
      leadsSonta {
        id
        name
        stream_name
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
        stream_name
      }
      isAdminForConstituency {
        id
        name
        stream_name
      }
    }
  }
`

export const DISPLAY_MEMBER_CHURCH = gql`
  query ($id: ID!) {
    members(where: { id: $id }) {
      id
      #church info
      stream_name
      ministry {
        id
        name
        leader {
          firstName
          lastName
        }
      }

      fellowship {
        id
        name
        leader {
          firstName
          lastName
        }
        council {
          id
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
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_FELLOWSHIP = gql`
  query ($id: ID) {
    fellowships(where: { id: $id }, options: { limit: 1 }) {
      id
      labels
      stream_name
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
        constituency {
          id
          name
        }
      }
      leader {
        id
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
        bankingSlip
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
          stream_name
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
        fullName
        whatsappNumber
        title {
          title
        }
      }

      constituency {
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
          stream_name
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
      stream_name
      fellowships {
        id
        name
        bacenta {
          id
          name
          stream_name
        }
      }

      constituency {
        id
        name
        stream_name
      }
      leader {
        id
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
          stream_name
        }
        historyRecord
      }
      memberCount
    }
  }
`

export const DISPLAY_CONSTITUENCY = gql`
  query ($id: ID) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      stream_name
      bacentas {
        id
        name
        constituency {
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
        fullName
        fellowship {
          id
          bacenta {
            id
            constituency {
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
        fullName
      }
      leader {
        id
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
          stream_name
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
      stream {
        id
        name
      }
      stream_name
      constituencyCount
      bacentaCount
      fellowshipCount
      memberCount
      pastorCount
      constituencies(options: { limit: 5 }) {
        id
        name
        stream_name
      }

      admin {
        id
        firstName
        lastName
        fellowship {
          id
          bacenta {
            id

            constituency {
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
          stream_name
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
      gatheringService {
        id
        name
      }
      councils(options: { limit: 5 }) {
        id
        name
        stream_name
      }

      admin {
        id
        firstName
        lastName
        stream_name
      }
      leader {
        id
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
          stream_name
        }
        historyRecord
      }
    }
  }
`

export const DISPLAY_GATHERING = gql`
  query ($id: ID) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      streamCount
      councilCount
      constituencyCount
      bacentaCount
      fellowshipCount
      memberCount
      pastorCount
      streams {
        id
        name
        stream_name
      }

      admin {
        id
        firstName
        lastName
        stream_name
      }
      leader {
        id
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
          stream_name
        }
        historyRecord
      }
    }
  }
`
