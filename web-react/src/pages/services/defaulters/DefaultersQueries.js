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
