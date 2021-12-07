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
    $fellowship: String
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
        }
        historyRecord
      }
      #Leadership Information
      leadsFellowship {
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
      leadsBacenta {
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

export const UPDATE_TOWN_MUTATION = gql`
  mutation UpdateTown($townId: ID!, $townName: String!, $councilId: ID!) {
    UpdateTownDetails(
      townId: $townId
      townName: $townName
      councilId: $councilId
    ) {
      id
      name
      bacentas {
        id
        name
        town {
          id
          name
          council {
            id
            towns {
              id
            }
            campuses {
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

export const UPDATE_CAMPUS_MUTATION = gql`
  mutation UpdateCampus($campusId: ID!, $campusName: String!, $bishopId: ID!) {
    UpdateCampusDetails(
      campusId: $campusId
      campusName: $campusName
      bishopId: $bishopId
    ) {
      id
      name
      bacentas {
        id
        name
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
    $campusTownId: ID!
  ) {
    UpdateBacentaDetails(
      bacentaId: $bacentaId
      bacentaName: $bacentaName
      campusTownId: $campusTownId
    ) {
      id
      name
      fellowships {
        id
        name
        bacenta {
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
        bacentas {
          id
          name
        }
        bishop {
          id
          firstName
          lastName
        }
      }
      campus {
        id
        name
        bacentas {
          id
          name
        }
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

export const ADD_BACENTA_TOWN = gql`
  mutation AddBacentaTown($townId: ID!, $bacentaId: ID!) {
    updateBacentas(
      where: { id: $bacentaId }
      connect: { town: { where: { node: { id: $townId } } } }
    ) {
      bacentas {
        id
        town {
          id
          name
        }
      }
    }
  }
`

export const ADD_BACENTA_CAMPUS = gql`
  mutation AddBacentaCampus($campusId: ID!, $bacentaId: ID!) {
    updateBacentas(
      where: { id: $bacentaId }
      connect: { campus: { where: { node: { id: $campusId } } } }
    ) {
      bacentas {
        id
        campus {
          id
          name
        }
      }
    }
  }
`

export const REMOVE_BACENTA_TOWN = gql`
  mutation RemoveBacentaTown($townId: ID!, $bacentaId: ID!) {
    updateBacentas(
      where: { id: $bacentaId }
      disconnect: { town: { where: { node: { id: $townId } } } }
    ) {
      bacentas {
        id
        name
        town {
          id
          name
          bacentas {
            id
          }
        }
      }
    }
    updateTowns(where: { id: $townId }) {
      towns {
        id
        name
        bacentas {
          id
        }
      }
    }
  }
`

export const REMOVE_BACENTA_CAMPUS = gql`
  mutation RemoveBacentaCampus($campusId: ID!, $bacentaId: ID!) {
    updateBacentas(
      where: { id: $bacentaId }
      disconnect: { campus: { where: { node: { id: $campusId } } } }
    ) {
      bacentas {
        id
        name
        campus {
          id
          name
        }
      }
    }
    updateCampuses(where: { id: $campusId }) {
      campuses {
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

//Updating Campus/Town Mutations
export const ADD_TOWN_COUNCIL = gql`
  mutation AddTownCouncil($townId: ID!, $councilId: ID!) {
    updateTowns(
      where: { id: $townId }
      connect: { council: { where: { node: { id: $councilId } } } }
    ) {
      towns {
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

export const REMOVE_TOWN_COUNCIL = gql`
  mutation RemoveTownCouncil($townId: ID!, $councilId: ID!) {
    updateTowns(
      where: { id: $townId }
      disconnect: { council: { where: { node: { id: $councilId } } } }
    ) {
      towns {
        id
        name
      }
    }
  }
`

export const ADD_CAMPUS_COUNCIL = gql`
  mutation AddCampusCouncil($campusId: ID!, $councilId: ID!) {
    updateCampuses(
      where: { id: $campusId }
      connect: { council: { where: { node: { id: $councilId } } } }
    ) {
      campuses {
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

export const REMOVE_CAMPUS_COUNCIL = gql`
  mutation RemoveCampusCouncil($campusId: ID!, $councilId: ID!) {
    updateCampuses(
      where: { id: $campusId }
      disconnect: { council: { where: { node: { id: $councilId } } } }
    ) {
      campuses {
        id
        name
      }
    }
  }
`

export const ADD_CAMPUS_BACENTAS = gql`
  mutation AddCampusBacentas($campusId: ID!, $bacentaId: ID!) {
    updateCampuses(
      where: { id: $campusId }
      connect: { bacentas: { where: { node: { id: $bacentaId } } } }
    ) {
      campuses {
        id
        name
      }
    }
  }
`

export const ADD_TOWN_BACENTAS = gql`
  mutation AddTownBacentas($townId: ID!, $bacentaId: ID!) {
    updateTowns(
      where: { id: $townId }
      connect: { bacentas: { where: { node: { id: $bacentaId } } } }
    ) {
      towns {
        id
        name
      }
    }
  }
`
