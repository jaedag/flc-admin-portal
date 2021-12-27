import { gql } from '@apollo/client'

export const FELLOWSHIP_REPORT = gql`
  query fellowshipReports($fellowshipId: ID) {
    fellowships(where: { id: $fellowshipId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services(limit: 4) {
        id
        created_at
        attendance
        income
        week
        serviceDate {
          date
        }
      }
      memberCount
    }
  }
`

export const BACENTA_REPORT = gql`
  query bacentaReports($bacentaId: ID!) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services(limit: 4) {
        created_at
        attendance
        income
        week
        serviceDate {
          date
        }
      }

      fellowshipServiceAggregate {
        week
        attendance
        income
      }
      memberCount
    }
  }
`

export const SONTA_REPORT = gql`
  query sontaReports($sontaId: ID!) {
    sontas(where: { id: $sontaId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services(limit: 4) {
        created_at
        attendance
        income
        week
        serviceDate {
          date
        }
      }

      memberCount
    }
  }
`

export const CONSTITUENCY_REPORT = gql`
  query constiutencyReports($id: ID!) {
    constituencies(where: { id: $id }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services(limit: 4) {
        created_at
        attendance
        income
        week
        serviceDate {
          date
        }
      }

      componentServiceAggregate {
        week
        attendance
        income
      }
      memberCount
    }
  }
`

export const COUNCIL_REPORT = gql`
  query councilReports($councilId: ID!) {
    councils(where: { id: $councilId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services(limit: 4) {
        created_at
        attendance
        income
        week
        serviceDate {
          date
        }
      }

      componentServiceAggregate {
        week
        attendance
        income
      }
      memberCount
    }
  }
`
