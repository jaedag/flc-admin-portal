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
    $bacenta: String
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
      bacenta: $bacenta
      ministry: $ministry
      pictureUrl: $pictureUrl
    ) {
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
      dob {
        date
      }
      bishop {
        id
        firstName
        lastName
        fullName
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
      isAdminForBishop {
        id
        firstName
        lastName
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
  mutation UpdateTown($townId: ID!, $townName: String!, $bishopId: ID!) {
    UpdateTownDetails(
      townId: $townId
      townName: $townName
      bishopId: $bishopId
    ) {
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
            isBishopForTown {
              id
            }
            isBishopForCampus {
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
      centres {
        id
        name
        campus {
          id
          name
          bishop {
            id
            isBishopForTown {
              id
            }
            isBishopForCampus {
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

export const UPDATE_CENTRE_MUTATION = gql`
  mutation UpdateCentre(
    $centreId: ID!
    $centreName: String!
    $campusTownId: ID!
  ) {
    UpdateCentreDetails(
      centreId: $centreId
      centreName: $centreName
      campusTownId: $campusTownId
    ) {
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
        centres {
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
        centres {
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

export const UPDATE_BACENTA = gql`
  mutation UpdateBacenta(
    $id: ID!
    $name: String!
    $meetingDay: String
    $venueLatitude: Float
    $venueLongitude: Float
  ) {
    UpdateBacentaDetails(
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

export const ADD_CENTRE_TOWN = gql`
  mutation AddCentreTown($townId: ID!, $centreId: ID!) {
    updateCentres(
      where: { id: $centreId }
      connect: { town: { where: { node: { id: $townId } } } }
    ) {
      centres {
        id
        town {
          id
          name
        }
      }
    }
  }
`

export const ADD_CENTRE_CAMPUS = gql`
  mutation AddCentreCampus($campusId: ID!, $centreId: ID!) {
    updateCentres(
      where: { id: $centreId }
      connect: { campus: { where: { node: { id: $campusId } } } }
    ) {
      centres {
        id
        campus {
          id
          name
        }
      }
    }
  }
`

export const REMOVE_CENTRE_TOWN = gql`
  mutation RemoveCentreTown($townId: ID!, $centreId: ID!) {
    updateCentres(
      where: { id: $centreId }
      disconnect: { town: { where: { node: { id: $townId } } } }
    ) {
      centres {
        id
        name
        town {
          id
          name
          centres {
            id
          }
        }
      }
    }
    updateTowns(where: { id: $townId }) {
      towns {
        id
        name
        centres {
          id
        }
      }
    }
  }
`

export const REMOVE_CENTRE_CAMPUS = gql`
  mutation RemoveCentreCampus($campusId: ID!, $centreId: ID!) {
    updateCentres(
      where: { id: $centreId }
      disconnect: { campus: { where: { node: { id: $campusId } } } }
    ) {
      centres {
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

export const ADD_CENTRE_BACENTAS = gql`
  mutation AddCentreBacentas($centreId: ID!, $bacentaId: [ID!]) {
    updateCentres(
      where: { id: $centreId }
      connect: { bacentas: { where: { node: { id_IN: $bacentaId } } } }
    ) {
      centres {
        id
        bacentas {
          id
          name
        }
      }
    }
  }
`
export const REMOVE_CENTRE_BACENTAS = gql`
  mutation RemoveCentreBacentas($centreId: ID!, $bacentaId: ID!) {
    updateCentres(
      where: { id: $centreId }
      disconnect: { bacentas: { where: { node: { id: $bacentaId } } } }
    ) {
      centres {
        id
        bacentas {
          id
          name
        }
      }
    }
  }
`

export const REMOVE_BACENTA_CENTRE = gql`
  mutation RemoveBacentaFromCentre($centreId: ID!, $bacentaIds: [ID!]) {
    updateBacentas(
      where: { id_IN: $bacentaIds }
      disconnect: { centre: { where: { node: { id: $centreId } } } }
    ) {
      bacentas {
        id
        name
        centre {
          id
          name
        }
      }
    }
    updateCentres(where: { id: $centreId }) {
      centres {
        id
        name
      }
    }
  }
`

export const ADD_BACENTA_CENTRE = gql`
  mutation AddBacentaCentre($centreId: ID!, $bacentaId: ID!) {
    updateBacentas(
      where: { id: $bacentaId }
      connect: { centre: { where: { node: { id: $centreId } } } }
    ) {
      bacentas {
        centre {
          id
          name
        }
      }
    }
  }
`

//Updating Campus/Town Mutations
export const ADD_TOWN_BISHOP = gql`
  mutation AddTownBishop($townId: ID!, $bishopId: ID!) {
    updateTowns(
      where: { id: $townId }
      connect: { bishop: { where: { node: { id: $bishopId } } } }
    ) {
      towns {
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
`

export const REMOVE_TOWN_BISHOP = gql`
  mutation RemoveTownBishop($townId: ID!, $bishopId: ID!) {
    updateTowns(
      where: { id: $townId }
      disconnect: { bishop: { where: { node: { id: $bishopId } } } }
    ) {
      towns {
        id
        name
      }
    }
  }
`

export const ADD_CAMPUS_BISHOP = gql`
  mutation AddCampusBishop($campusId: ID!, $bishopId: ID!) {
    updateCampuses(
      where: { id: $campusId }
      connect: { bishop: { where: { node: { id: $bishopId } } } }
    ) {
      campuses {
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
`

export const REMOVE_CAMPUS_BISHOP = gql`
  mutation RemoveCampusBishop($campusId: ID!, $bishopId: ID!) {
    updateCampuses(
      where: { id: $campusId }
      disconnect: { bishop: { where: { node: { id: $bishopId } } } }
    ) {
      campuses {
        id
        name
      }
    }
  }
`

export const ADD_CAMPUS_CENTRES = gql`
  mutation AddCampusCentres($campusId: ID!, $centreId: ID!) {
    updateCampuses(
      where: { id: $campusId }
      connect: { centres: { where: { node: { id: $centreId } } } }
    ) {
      campuses {
        id
        name
      }
    }
  }
`

export const ADD_TOWN_CENTRES = gql`
  mutation AddTownCentres($townId: ID!, $centreId: ID!) {
    updateTowns(
      where: { id: $townId }
      connect: { centres: { where: { node: { id: $centreId } } } }
    ) {
      towns {
        id
        name
      }
    }
  }
`
