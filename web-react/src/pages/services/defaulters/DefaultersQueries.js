import { gql } from '@apollo/client'

export const CONSTITUENCY_DEFAULTERS = gql`
  query constituencyDefaulters($id: ID) {
    constituencies(where: { id: $id }) {
      id
      name
      fellowshipCount
      formDefaultersThisWeekCount
      bankingDefaultersThisWeekCount
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
