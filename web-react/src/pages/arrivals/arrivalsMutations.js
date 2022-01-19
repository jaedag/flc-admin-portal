import { gql } from '@apollo/client'

export const MAKE_CONSTITUENCYARRIVALS_ADMIN = gql`
  mutation MakeConstituencyArrrivalsAdmin(
    $constituencyId: ID!
    $newAdminId: ID!
    $oldAdminId: ID!
  ) {
    RemoveConstituencyArrivalsAdmin(
      constituencyId: $constituencyId
      adminId: $oldAdminId
    ) {
      id
      firstName
      lastName
    }
    MakeConstituencyArrivalsAdmin(
      constituencyId: $constituencyId
      adminId: $newAdminId
    ) {
      id
      firstName
      lastName
      isAdminForConstituencyArrivals {
        id
        admin {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const RECORD_BUSSING_FROM_BACENTA = gql`
  mutation RecordBussingFromBacenta(
    $id: ID!
    $serviceDate: String!
    $bussingPictures: [String]!
    $bussingCost: Float!
    $offeringRaised: Float!
    $numberOfBusses: Int!
    $numberOfCars: Int
  ) {
    RecordBussingFromBacenta(
      id: $id
      serviceDate: $serviceDate
      bussingPictures: $bussingPictures
      bussingCost: $bussingCost
      offeringRaised: $offeringRaised
      numberOfBusses: $numberOfBusses
      numberOfCars: $numberOfCars
    ) {
      id
      serviceLog {
        bacenta {
          id
          bussing(limit: 4) {
            id
            week
          }
        }
      }
    }
  }
`

export const CONFIRM_BUSSING_BY_ADMIN = gql`
  mutation ConfirmBussingByAdmin(
    $bussingRecordId: ID!
    $attendance: Int!
    $bussingTopUp: Float!
  ) {
    ConfirmBussingByAdmin(
      bussingRecordId: $bussingRecordId
      attendance: $attendance
      bussingTopUp: $bussingTopUp
    ) {
      id
      serviceLog {
        bacenta {
          id
          bussing(limit: 4) {
            id
            attendance
            bussingTopUp
            week
          }
        }
      }
    }
  }
`
