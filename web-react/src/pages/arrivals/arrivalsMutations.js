import { gql } from '@apollo/client'

export const MAKE_CONSTITUENCYARRIVALS_ADMIN = gql`
  mutation MakeConstituencyArrrivalsAdmin(
    $constituencyId: ID!
    $newAdminId: ID!
    $oldAdminId: ID!
  ) {
    RemoveConstituencyArrivalsAdmin(
      constituencyId: $constituencyId
      arrivalsAdminId: $oldAdminId
    ) {
      id
      firstName
      lastName
    }
    MakeConstituencyArrivalsAdmin(
      constituencyId: $constituencyId
      arrivalsAdminId: $newAdminId
      oldArrivalsAdminId: $oldAdminId
    ) {
      id
      firstName
      lastName
      fullName
      isArrivalsAdminForConstituency {
        id
        arrivalsAdmin {
          id
          firstName
          lastName
          fullName
        }
      }
    }
  }
`

export const MAKE_COUNCILARRIVALS_ADMIN = gql`
  mutation MakeCouncilArrrivalsAdmin(
    $councilId: ID!
    $newAdminId: ID!
    $oldAdminId: ID!
  ) {
    RemoveCouncilArrivalsAdmin(
      councilId: $councilId
      arrivalsAdminId: $oldAdminId
    ) {
      id
      firstName
      lastName
    }
    MakeCouncilArrivalsAdmin(
      councilId: $councilId
      arrivalsAdminId: $newAdminId
      oldArrivalsAdminId: $oldAdminId
    ) {
      id
      firstName
      lastName
      fullName
      isArrivalsAdminForCouncil {
        id
        arrivalsAdmin {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const MAKE_STREAMARRIVALS_ADMIN = gql`
  mutation MakeStreamArrrivalsAdmin(
    $streamId: ID!
    $newAdminId: ID!
    $oldAdminId: ID!
  ) {
    RemoveStreamArrivalsAdmin(
      streamId: $streamId
      arrivalsAdminId: $oldAdminId
    ) {
      id
      firstName
      lastName
    }
    MakeStreamArrivalsAdmin(
      streamId: $streamId
      arrivalsAdminId: $newAdminId
      oldArrivalsAdminId: $oldAdminId
    ) {
      id
      firstName
      lastName
      isArrivalsAdminForStream {
        id
        arrivalsAdmin {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const MAKE_GATHERINGSERVICEARRIVALS_ADMIN = gql`
  mutation MakeGatheringServiceArrrivalsAdmin(
    $gatheringServiceId: ID!
    $newAdminId: ID!
    $oldAdminId: ID!
  ) {
    RemoveGatheringServiceArrivalsAdmin(
      gatheringServiceId: $gatheringServiceId
      arrivalsAdminId: $oldAdminId
    ) {
      id
      firstName
      lastName
    }
    MakeGatheringServiceArrivalsAdmin(
      gatheringServiceId: $gatheringServiceId
      arrivalsAdminId: $newAdminId
      oldArrivalsAdminId: $oldAdminId
    ) {
      id
      firstName
      lastName
      isArrivalsAdminForGatheringService {
        id
        arrivalsAdmin {
          id
          firstName
          lastName
        }
      }
    }
  }
`
export const UPLOAD_MOBILISATION_PICTURE = gql`
  mutation UploadMobilisationPicture(
    $bacentaId: ID!
    $serviceDate: String!
    $mobilisationPicture: String!
  ) {
    UploadMobilisationPicture(
      bacentaId: $bacentaId
      serviceDate: $serviceDate
      mobilisationPicture: $mobilisationPicture
    ) {
      id
      attendance
      mobilisationPicture
      serviceLog {
        bacenta {
          id
          stream_name
          bussing(limit: 4) {
            id
            week
            mobilisationPicture
          }
        }
      }
    }
  }
`

export const RECORD_BUSSING_FROM_BACENTA = gql`
  mutation RecordBussingFromBacenta(
    $bussingRecordId: ID!
    $attendance: Int!
    $bussingPictures: [String]!
    $bussingCost: Float!
    $offeringRaised: Float!
    $numberOfBusses: Int!
    $numberOfCars: Int!
    $mobileNetwork: String!
    $momoName: String!
    $momoNumber: String!
  ) {
    RecordBussingFromBacenta(
      bussingRecordId: $bussingRecordId
      attendance: $attendance
      bussingPictures: $bussingPictures
      bussingCost: $bussingCost
      offeringRaised: $offeringRaised
      numberOfBusses: $numberOfBusses
      numberOfCars: $numberOfCars
      mobileNetwork: $mobileNetwork
      momoName: $momoName
      momoNumber: $momoNumber
    ) {
      id
      attendance
      bussingPictures
      bussingCost
      offeringRaised
      numberOfBusses
      numberOfCars
      momoName
      momoNumber

      serviceLog {
        bacenta {
          id
          stream_name
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
    $comments: String
  ) {
    ConfirmBussingByAdmin(
      bussingRecordId: $bussingRecordId
      attendance: $attendance
      bussingTopUp: $bussingTopUp
      comments: $comments
    ) {
      id
      serviceLog {
        bacenta {
          id
          bussing(limit: 4) {
            id
            attendance
            bussingTopUp
            momoName
            momoNumber
            week
            confirmed_by {
              id
              firstName
              lastName
              fullName
            }
            comments
          }
        }
      }
    }
  }
`

export const RECORD_ARRIVAL_TIME = gql`
  mutation RecordArrivalTime($bussingRecordId: ID!) {
    RecordArrivalTime(bussingRecordId: $bussingRecordId) {
      id
      bussingTopUp
      arrivalTime
      arrivalTime_Logged_By {
        id
        firstName
        lastName
      }
    }
  }
`
export const SEND_BUSSING_SUPPORT = gql`
  mutation SendBussingSupport($bussingRecordId: ID!, $stream_name: String!) {
    SendBussingSupport(
      bussingRecordId: $bussingRecordId
      stream_name: $stream_name
    ) {
      id
      bussingTopUp
      momoNumber
      transactionId
    }
  }
`
export const SET_SWELL_DATE = gql`
  mutation SetSwellDate($date: String!) {
    SetSwellDate(date: $date) {
      date
    }
  }
`
