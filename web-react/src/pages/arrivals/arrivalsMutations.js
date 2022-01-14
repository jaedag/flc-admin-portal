import { gql } from '@apollo/client'

export const BUSSING_RECORDS_FROM_BACENTA_LEADER = gql`
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
