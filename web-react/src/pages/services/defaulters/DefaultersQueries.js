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
    }
  }
`

export const CONSTITUENCY_FORM_DEFAULTERS_LIST = gql`
  query formDefaulters($id: ID) {
    constituencies(where: { id: $id }) {
      id
      name
      formDefaultersThisWeekCount
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
      bankingDefaultersThisWeekCount
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
      }
    }
  }
`
