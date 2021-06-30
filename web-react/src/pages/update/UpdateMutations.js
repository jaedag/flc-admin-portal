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
      lastName
    }
  }
`

export const UPDATE_TOWN_MUTATION = gql`
  mutation UpdateTown(
    $townId: ID!
    $townName: String!
    $leaderId: ID!
    $bishopId: ID!
  ) {
    UpdateTownDetails(
      townId: $townId
      townName: $townName
      leaderId: $leaderId
      bishopId: $bishopId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
        whatsappNumber
      }
    }
  }
`

export const UPDATE_CAMPUS_MUTATION = gql`
  mutation UpdateCampus(
    $campusId: ID!
    $campusName: String!
    $leaderId: ID!
    $bishopId: ID!
  ) {
    UpdateCampusDetails(
      campusId: $campusId
      campusName: $campusName
      leaderId: $leaderId
      bishopId: $bishopId
    ) {
      id
      name
      leader {
        id
        firstName
        lastName
        whatsappNumber
      }
    }
  }
`

export const UPDATE_CENTRE_MUTATION = gql`
  mutation UpdateCentre(
    $centreId: ID
    $centreName: String
    $leaderId: ID
    $campusTownId: ID
  ) {
    UpdateCentreDetails(
      centreId: $centreId
      centreName: $centreName
      leaderId: $leaderId
      campusTownId: $campusTownId
    ) {
      id
      firstName
      lastName
      whatsappNumber
    }
  }
`

export const UPDATE_BACENTA = gql`
  mutation UpdateBacenta(
    $id: ID
    $name: String
    $leaderId: ID
    $meetingDay: String
    $venueLatitude: Float
    $venueLongitude: Float
  ) {
    UpdateBacentaDetails(
      id: $id
      name: $name
      leaderId: $leaderId
      meetingDay: $meetingDay
      venueLatitude: $venueLatitude
      venueLongitude: $venueLongitude
    ) {
      id
      firstName
      lastName
      whatsappNumber
    }
  }
`

export const ADD_CENTRE_TOWN = gql`
  mutation AddCentreTown($townId: ID!, $centreId: ID!) {
    updateCentres(
      where: { id: $centreId }
      connect: { town: { where: { id: $townId } } }
    ) {
      centres {
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
      connect: { campus: { where: { id: $campusId } } }
    ) {
      centres {
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
      disconnect: { town: { where: { id: $townId } } }
    ) {
      centres {
        town {
          id
          name
        }
      }
    }
  }
`

export const REMOVE_CENTRE_CAMPUS = gql`
  mutation RemoveCentreCampus($campusId: ID!, $centreId: ID!) {
    updateCentres(
      where: { id: $centreId }
      disconnect: { campus: { where: { id: $campusId } } }
    ) {
      centres {
        campus {
          id
          name
        }
      }
    }
  }
`

export const ADD_CENTRE_BACENTAS = gql`
  mutation AddCentreBacentas($centreId: ID!, $bacentaId: ID!) {
    updateCentres(
      where: { id: $centreId }
      connect: { bacentas: { where: { id: $bacentaId } } }
    ) {
      centres {
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
      disconnect: { bacentas: { where: { id: $bacentaId } } }
    ) {
      centres {
        bacentas {
          id
          name
        }
      }
    }
  }
`

export const REMOVE_BACENTA_CENTRE = gql`
  mutation RemoveBacentaFromCentre($centreId: ID!, $bacentaId: ID!) {
    updateBacentas(
      where: { id: $bacentaId }
      disconnect: { centre: { where: { id: $centreId } } }
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
      connect: { centre: { where: { id: $centreId } } }
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
      connect: { bishop: { where: { id: $bishopId } } }
    ) {
      towns {
        id
        name
      }
    }
  }
`

export const REMOVE_TOWN_BISHOP = gql`
  mutation RemoveTownBishop($townId: ID!, $bishopId: ID!) {
    updateTowns(
      where: { id: $townId }
      disconnect: { bishop: { where: { id: $bishopId } } }
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
      connect: { bishop: { where: { id: $bishopId } } }
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
      disconnect: { bishop: { where: { id: $bishopId } } }
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
    AddCampusCentres(from: { id: $campusId }, to: { id: $centreId }) {
      from {
        id
        name
      }
      to {
        id
        name
      }
    }
  }
`

export const ADD_TOWN_CENTRES = gql`
  mutation AddTownCentres($townId: ID!, $centreId: ID!) {
    AddTownCentres(from: { id: $townId }, to: { id: $centreId }) {
      from {
        id
        name
      }
      to {
        id
        name
      }
    }
  }
`
