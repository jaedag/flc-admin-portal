import { gql } from '@apollo/client'

export const UPDATE_MEMBER_MUTATION = gql`
  mutation UpdateMemberDetails(
    $id: ID!
    $firstName: String!
    $middleName: String
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $whatsappNumber: String
    $dob: String
    $maritalStatus: String!
    $gender: String!
    $occupation: String
    $fellowship: String!
    $ministry: String
    $pictureUrl: String!
  ) {
    UpdateMemberDetails(
      id: $id
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      whatsappNumber: $whatsappNumber
      dob: $dob
      maritalStatus: $maritalStatus
      gender: $gender
      occupation: $occupation
      fellowship: $fellowship
      ministry: $ministry
      pictureUrl: $pictureUrl
    ) {
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
      }
    }
  }
`

export const UPDATE_CONSTITUENCY_MUTATION = gql`
  mutation UpdateConstituency(
    $constituencyId: ID!
    $constituencyName: String!
    $councilId: ID!
  ) {
    UpdateConstituencyDetails(
      constituencyId: $constituencyId
      constituencyName: $constituencyName
      councilId: $councilId
    ) {
      id
      name
      bacentas {
        id
        name
        constituency {
          id
          name
          council {
            id
            constituencies {
              id
            }
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
          stream_name
        }
      }
      leader {
        id
        firstName
        lastName
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
  }
`

export const UPDATE_BACENTA_MUTATION = gql`
  mutation UpdateBacenta(
    $bacentaId: ID!
    $bacentaName: String!
    $constituencyId: ID!
  ) {
    UpdateBacentaDetails(
      bacentaId: $bacentaId
      bacentaName: $bacentaName
      constituencyId: $constituencyId
    ) {
      id
      name
      fellowships {
        id
        name
        bacenta {
          id
          name
          constituencies {
            id
            council {
              id
            }
          }
        }
      }
      constituencies {
        id
        name
        bacentas {
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
    }
  }
`

export const UPDATE_SONTA_MUTATION = gql`
  mutation UpdateSonta($sontaId: ID!, $sontaName: String!) {
    UpdateSontaDetails(sontaId: $sontaId, sontaName: $sontaName) {
      id
      name
      constituency {
        id
        name
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
  }
`

export const UPDATE_FELLOWSHIP = gql`
  mutation UpdateFellowship(
    $id: ID!
    $name: String!
    $meetingDay: String
    $venueLatitude: Float
    $venueLongitude: Float
  ) {
    UpdateFellowshipDetails(
      id: $id
      name: $name
      meetingDay: $meetingDay
      venueLatitude: $venueLatitude
      venueLongitude: $venueLongitude
    ) {
      id
      name
      meetingDay {
        day
      }
      bacenta {
        id
        name
        fellowships {
          id
        }

        constituencies {
          id
          name
        }
      }
      leader {
        id
        firstName
        lastName
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
    }
  }
`

export const ADD_BACENTA_CONSTITUENCY = gql`
  mutation AddBacentaConstituency($constituencyId: ID!, $bacentaId: ID!) {
    updateBacentas(
      where: { id: $bacentaId }
      connect: { constituency: { where: { node: { id: $constituencyId } } } }
    ) {
      bacentas {
        id
        constituency {
          id
          name
        }
      }
    }
  }
`

export const REMOVE_BACENTA_CONSTITUENCY = gql`
  mutation RemoveBacentaConstituency($constituencyId: ID!, $bacentaId: ID!) {
    updateBacentas(
      where: { id: $bacentaId }
      disconnect: { constituency: { where: { node: { id: $constituencyId } } } }
    ) {
      bacentas {
        id
        name
        constituency {
          id
          name
        }
      }
    }
    updateConstituencies(where: { id: $constituencyId }) {
      constituencies {
        id
        name
      }
    }
  }
`

export const ADD_BACENTA_FELLOWSHIPS = gql`
  mutation AddBacentaFellowships($bacentaId: ID!, $fellowshipId: [ID!]) {
    updateBacentas(
      where: { id: $bacentaId }
      connect: { fellowships: { where: { node: { id_IN: $fellowshipId } } } }
    ) {
      bacentas {
        id
        fellowships {
          id
          name
        }
      }
    }
  }
`
export const REMOVE_BACENTA_FELLOWSHIPS = gql`
  mutation RemoveBacentaFellowships($bacentaId: ID!, $fellowshipId: ID!) {
    updateBacentas(
      where: { id: $bacentaId }
      disconnect: { fellowships: { where: { node: { id: $fellowshipId } } } }
    ) {
      bacentas {
        id
        fellowships {
          id
          name
        }
      }
    }
  }
`

export const REMOVE_FELLOWSHIP_BACENTA = gql`
  mutation RemoveFellowshipFromBacenta($bacentaId: ID!, $fellowshipIds: [ID!]) {
    updateFellowships(
      where: { id_IN: $fellowshipIds }
      disconnect: { bacenta: { where: { node: { id: $bacentaId } } } }
    ) {
      fellowships {
        id
        name
        bacenta {
          id
          name
        }
      }
    }
    updateBacentas(where: { id: $bacentaId }) {
      bacentas {
        id
        fellowships {
          id
        }
      }
    }
  }
`

export const ADD_FELLOWSHIP_BACENTA = gql`
  mutation AddFellowshipBacenta($bacentaId: ID!, $fellowshipId: ID!) {
    updateFellowships(
      where: { id: $fellowshipId }
      connect: { bacenta: { where: { node: { id: $bacentaId } } } }
    ) {
      fellowships {
        bacenta {
          id
          name
        }
      }
    }
  }
`

//Updating Constituency Mutations
export const ADD_CONSTITUENCY_COUNCIL = gql`
  mutation AddConstituencyCouncil($constituencyId: ID!, $councilId: ID!) {
    updateConstituencies(
      where: { id: $constituencyId }
      connect: { council: { where: { node: { id: $councilId } } } }
    ) {
      constituencies {
        id
        name
        council {
          id
          name
        }
      }
    }
  }
`

export const REMOVE_CONSTITUENCY_COUNCIL = gql`
  mutation RemoveConstituencyCouncil($constituencyId: ID!, $councilId: ID!) {
    updateConstituencies(
      where: { id: $constituencyId }
      disconnect: { council: { where: { node: { id: $councilId } } } }
    ) {
      constituencies {
        id
        name
      }
    }
  }
`

export const ADD_CONSTITUENCY_BACENTAS = gql`
  mutation AddConstituencyBacentas($constituencyId: ID!, $bacentaId: ID!) {
    updateConstituencies(
      where: { id: $constituencyId }
      connect: { bacentas: { where: { node: { id: $bacentaId } } } }
    ) {
      constituencies {
        id
        name
      }
    }
  }
`
