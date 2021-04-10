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
    $townName: String
    $lWhatsappNumber: String
    $bishopId: ID
  ) {
    UpdateTown(
      townId: $townId
      townName: $townName
      lWhatsappNumber: $lWhatsappNumber
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
    $campusId: ID
    $campusName: String
    $lWhatsappNumber: String
    $bishopId: ID
  ) {
    UpdateCampus(
      campusId: $campusId
      campusName: $campusName
      lWhatsappNumber: $lWhatsappNumber
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
    $lWhatsappNumber: String
    $campusTownID: ID
  ) {
    UpdateCentre(
      centreId: $centreId
      centreName: $centreName
      lWhatsappNumber: $lWhatsappNumber
      campusTownID: $campusTownID
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

export const ADD_CENTRE_TOWN = gql`
  mutation AddCentreTown($townId: ID!, $centreId: ID!) {
    AddCentreTown(from: { id: $townId }, to: { id: $centreId }) {
      from {
        id
        name
        centres {
          id
          name
        }
      }
    }
  }
`

export const ADD_CENTRE_CAMPUS = gql`
  mutation AddCentreCampus($campusId: ID!, $centreId: ID!) {
    AddCentreCampus(from: { id: $campusId }, to: { id: $centreId }) {
      from {
        id
        name
        centres {
          id
          name
        }
      }
    }
  }
`

export const REMOVE_CENTRE_TOWN = gql`
  mutation RemoveCentreTown($townId: ID!, $centreId: ID!) {
    RemoveCentreTown(from: { id: $townId }, to: { id: $centreId }) {
      from {
        id
        name
        centres {
          id
          name
        }
      }
      to {
        id
        name
      }
    }
  }
`

export const REMOVE_CENTRE_CAMPUS = gql`
  mutation RemoveCentreCampus($campusId: ID!, $centreId: ID!) {
    RemoveCentreCampus(from: { id: $campusId }, to: { id: $centreId }) {
      from {
        id
        name
        centres {
          id
          name
        }
      }
      to {
        id
        name
      }
    }
  }
`

export const ADD_CENTRE_BACENTAS = gql`
  mutation AddCentreBacentas($centreId: ID!, $bacentaId: ID!) {
    AddCentreBacentas(from: { id: $centreId }, to: { id: $bacentaId }) {
      from {
        id
        name
        bacentas {
          name
        }
      }
      to {
        id
        name
      }
    }
  }
`
export const REMOVE_CENTRE_BACENTAS = gql`
  mutation RemoveCentreBacentas($centreId: ID!, $bacentaId: ID!) {
    RemoveCentreBacentas(from: { id: $centreId }, to: { id: $bacentaId }) {
      from {
        id
        name
        bacentas {
          name
        }
      }
    }
  }
`

export const REMOVE_BACENTA_CENTRE = gql`
  mutation RemoveBacentaCentre($centreId: ID!, $bacentaId: ID!) {
    RemoveBacentaCentre(from: { id: $centreId }, to: { id: $bacentaId }) {
      from {
        id
        name
        bacentas {
          name
        }
      }
      to {
        id
        name
        centre {
          id
          name
        }
      }
    }
  }
`

export const UPDATE_BACENTA = gql`
  mutation UpdateBacenta(
    $id: ID
    $name: String
    $lWhatsappNumber: String
    $meetingDay: String
    $venueLatitude: Float
    $venueLongitude: Float
  ) {
    UpdateBacenta(
      id: $id
      name: $name
      lWhatsappNumber: $lWhatsappNumber
      meetingDay: $meetingDay
      venueLatitude: $venueLatitude
      venueLongitude: $venueLongitude
    ) {
      id
      name
      meetingDay {
        day
      }
      leader {
        id
        firstName
        lastName
        whatsappNumber
      }
    }
  }
`

export const ADD_BACENTA_CENTRE = gql`
  mutation AddBacentaCentre($centreId: ID!, $bacentaId: ID!) {
    AddBacentaCentre(from: { id: $centreId }, to: { id: $bacentaId }) {
      from {
        id
        name
      }
    }
  }
`

//Updating Campus/Town Mutations
export const ADD_TOWN_BISHOP = gql`
  mutation AddTownBishop($townId: ID!, $bishopId: ID!) {
    AddTownBishop(from: { id: $bishopId }, to: { id: $townId }) {
      from {
        id
        firstName
        lastName
      }
      to {
        id
        name
      }
    }
  }
`

export const REMOVE_TOWN_BISHOP = gql`
  mutation RemoveTownBishop($townId: ID!, $bishopId: ID!) {
    RemoveTownBishop(from: { id: $bishopId }, to: { id: $townId }) {
      from {
        id
        firstName
        lastName
      }
      to {
        id
        name
      }
    }
  }
`

export const ADD_CAMPUS_BISHOP = gql`
  mutation AddCampusBishop($campusId: ID!, $bishopId: ID!) {
    AddCampusBishop(from: { id: $bishopId }, to: { id: $campusId }) {
      from {
        id
        firstName
        lastName
      }
      to {
        id
        name
      }
    }
  }
`

export const REMOVE_CAMPUS_BISHOP = gql`
  mutation RemoveCampusBishop($campusId: ID!, $bishopId: ID!) {
    RemoveCampusBishop(from: { id: $bishopId }, to: { id: $campusId }) {
      from {
        id
        firstName
        lastName
      }
      to {
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
