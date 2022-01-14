import { gql } from '@apollo/client'

export const CONSTITUENCY_DEFAULTERS = gql`
  query constituencyDefaulters($id: ID) {
    constituencies(where: { id: $id }) {
      id
      name

      activeFellowshipCount
      formDefaultersThisWeekCount
      bankingDefaultersThisWeekCount
      bankedThisWeekCount
      servicesThisWeekCount
      cancelledServicesThisWeekCount
    }
  }
`

export const CONSTITUENCY_SERVICES_LIST = gql`
  query servicesThisWeek($id: ID) {
    constituencies(where: { id: $id }) {
      id
      name

      servicesThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          noServiceReason
          attendance
          income
        }
      }
    }
  }
`

export const CONSTITUENCY_CANCELLED_SERVICES_LIST = gql`
  query cancelledServicesThisWeek($id: ID) {
    constituencies(where: { id: $id }) {
      id
      name

      cancelledServicesThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          noServiceReason
        }
      }
    }
  }
`

export const CONSTITUENCY_FORM_DEFAULTERS_LIST = gql`
  query formDefaulters($id: ID) {
    constituencies(where: { id: $id }) {
      id
      name

      formDefaultersThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        meetingDay {
          day
        }
      }
    }
  }
`

export const CONSTITUENCY_BANKING_DEFAULTERS_LIST = gql`
  query bankingDefaulters($id: ID) {
    constituencies(where: { id: $id }) {
      id
      name

      bankingDefaultersThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          attendance
          income
        }
      }
    }
  }
`

export const CONSTITUENCY_BANKED_LIST = gql`
  query banked($id: ID) {
    constituencies(where: { id: $id }) {
      id
      name

      bankedThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          attendance
          income
        }
      }
    }
  }
`

export const COUNCIL_DEFAULTERS = gql`
  query councilDefaulters($id: ID) {
    councils(where: { id: $id }) {
      id
      name
      constituencyCount
      activeFellowshipCount
      formDefaultersThisWeekCount
      bankingDefaultersThisWeekCount
      bankedThisWeekCount
      servicesThisWeekCount
      cancelledServicesThisWeekCount
    }
  }
`

export const COUNCIL_SERVICES_LIST = gql`
  query servicesThisWeek($id: ID) {
    councils(where: { id: $id }) {
      id
      name

      servicesThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        meetingDay {
          day
        }
        bacenta {
          id
          constituency {
            id
            name
          }
        }
        services(limit: 1) {
          id
          noServiceReason
          attendance
          income
        }
      }
    }
  }
`

export const COUNCIL_CANCELLED_SERVICES_LIST = gql`
  query cancelledServicesThisWeek($id: ID) {
    councils(where: { id: $id }) {
      id
      name

      cancelledServicesThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        bacenta {
          id
          constituency {
            id
            name
          }
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          noServiceReason
        }
      }
    }
  }
`

export const COUNCIL_FORM_DEFAULTERS_LIST = gql`
  query formDefaulters($id: ID) {
    councils(where: { id: $id }) {
      id
      name

      formDefaultersThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        bacenta {
          id
          constituency {
            id
            name
          }
        }
        meetingDay {
          day
        }
      }
    }
  }
`

export const COUNCIL_BANKING_DEFAULTERS_LIST = gql`
  query bankingDefaulters($id: ID) {
    councils(where: { id: $id }) {
      id
      name

      bankingDefaultersThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        bacenta {
          id
          constituency {
            id
            name
          }
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          attendance
          income
        }
      }
    }
  }
`

export const COUNCIL_BANKED_LIST = gql`
  query banked($id: ID) {
    councils(where: { id: $id }) {
      id
      name

      bankedThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        bacenta {
          id
          constituency {
            id
            name
          }
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          attendance
          income
        }
      }
    }
  }
`

export const COUNCIL_BY_CONSTITUENCY = gql`
  query councilByConstituency($id: ID) {
    councils(where: { id: $id }) {
      id
      name
      constituencies {
        id
        name
        admin {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        activeFellowshipCount
        formDefaultersThisWeekCount
        bankingDefaultersThisWeekCount
        bankedThisWeekCount
        servicesThisWeekCount
        cancelledServicesThisWeekCount
      }
    }
  }
`

export const STREAM_DEFAULTERS = gql`
  query streamDefaulters($id: ID) {
    streams(where: { id: $id }) {
      id
      name
      councilCount
      activeFellowshipCount
      formDefaultersThisWeekCount
      bankingDefaultersThisWeekCount
      bankedThisWeekCount
      servicesThisWeekCount
      cancelledServicesThisWeekCount
    }
  }
`

export const STREAM_SERVICES_LIST = gql`
  query servicesThisWeek($id: ID) {
    streams(where: { id: $id }) {
      id
      name

      servicesThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        meetingDay {
          day
        }
        bacenta {
          id
          council {
            id
            name
          }
        }
        services(limit: 1) {
          id
          noServiceReason
          attendance
          income
        }
      }
    }
  }
`

export const STREAM_CANCELLED_SERVICES_LIST = gql`
  query cancelledServicesThisWeek($id: ID) {
    streams(where: { id: $id }) {
      id
      name

      cancelledServicesThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        bacenta {
          id
          council {
            id
            name
          }
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          noServiceReason
        }
      }
    }
  }
`

export const STREAM_FORM_DEFAULTERS_LIST = gql`
  query formDefaulters($id: ID) {
    streams(where: { id: $id }) {
      id
      name

      formDefaultersThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        bacenta {
          id
          council {
            id
            name
          }
        }
        meetingDay {
          day
        }
      }
    }
  }
`

export const STREAM_BANKING_DEFAULTERS_LIST = gql`
  query bankingDefaulters($id: ID) {
    streams(where: { id: $id }) {
      id
      name

      bankingDefaultersThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        bacenta {
          id
          council {
            id
            name
          }
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          attendance
          income
        }
      }
    }
  }
`

export const STREAM_BANKED_LIST = gql`
  query banked($id: ID) {
    streams(where: { id: $id }) {
      id
      name

      bankedThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        bacenta {
          id
          council {
            id
            name
          }
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          attendance
          income
        }
      }
    }
  }
`

export const STREAM_BY_COUNCIL = gql`
  query streamByCouncil($id: ID) {
    streams(where: { id: $id }) {
      id
      name
      councils {
        id
        name
        admin {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        activeFellowshipCount
        formDefaultersThisWeekCount
        bankingDefaultersThisWeekCount
        bankedThisWeekCount
        servicesThisWeekCount
        cancelledServicesThisWeekCount
      }
    }
  }
`

export const GATHERINGSERVICE_DEFAULTERS = gql`
  query gatheringserviceDefaulters($id: ID) {
    gatheringServices(where: { id: $id }) {
      id
      name
      streamCount
      activeFellowshipCount
      formDefaultersThisWeekCount
      bankingDefaultersThisWeekCount
      bankedThisWeekCount
      servicesThisWeekCount
      cancelledServicesThisWeekCount
    }
  }
`

export const GATHERINGSERVICE_SERVICES_LIST = gql`
  query servicesThisWeek($id: ID) {
    gatheringServices(where: { id: $id }) {
      id
      name

      servicesThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        meetingDay {
          day
        }
        bacenta {
          id
          constituency {
            id
            name
          }
        }
        services(limit: 1) {
          id
          noServiceReason
          attendance
          income
        }
      }
    }
  }
`

export const GATHERINGSERVICE_CANCELLED_SERVICES_LIST = gql`
  query cancelledServicesThisWeek($id: ID) {
    gatheringServices(where: { id: $id }) {
      id
      name

      cancelledServicesThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        bacenta {
          id
          constituency {
            id
            name
          }
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          noServiceReason
        }
      }
    }
  }
`

export const GATHERINGSERVICE_FORM_DEFAULTERS_LIST = gql`
  query formDefaulters($id: ID) {
    gatheringServices(where: { id: $id }) {
      id
      name

      formDefaultersThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        bacenta {
          id
          constituency {
            id
            name
          }
        }
        meetingDay {
          day
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BANKING_DEFAULTERS_LIST = gql`
  query bankingDefaulters($id: ID) {
    gatheringServices(where: { id: $id }) {
      id
      name

      bankingDefaultersThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        bacenta {
          id
          constituency {
            id
            name
          }
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          attendance
          income
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BANKED_LIST = gql`
  query banked($id: ID) {
    gatheringServices(where: { id: $id }) {
      id
      name

      bankedThisWeek {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        bacenta {
          id
          constituency {
            id
            name
          }
        }
        meetingDay {
          day
        }
        services(limit: 1) {
          id
          attendance
          income
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BY_STREAM = gql`
  query gatheringserviceByStream($id: ID) {
    gatheringServices(where: { id: $id }) {
      id
      name
      streams {
        id
        name
        admin {
          id
          firstName
          lastName
          fullName
          phoneNumber
          whatsappNumber
        }
        activeFellowshipCount
        formDefaultersThisWeekCount
        bankingDefaultersThisWeekCount
        bankedThisWeekCount
        servicesThisWeekCount
        cancelledServicesThisWeekCount
      }
    }
  }
`
