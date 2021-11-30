import { gql } from '@apollo/client'

export const BACENTA_REPORT = gql`
  query bacentaReports($bacentaId: ID) {
    bacentas(where: { id: $bacentaId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services {
        id
        historyRecord
        serviceRecords {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }
      }
      memberCount
    }
  }
`

export const CENTRE_REPORT = gql`
  query centreReports($centreId: ID!) {
    centres(where: { id: $centreId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services {
        id
        historyRecord
        serviceRecords {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }
      }
      bacentaServiceAggregate {
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
      services {
        id
        historyRecord
        serviceRecords {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
        }
      }
      memberCount
    }
  }
`

export const CAMPUS_REPORT = gql`
  query campusReports($campusId: ID!) {
    campuses(where: { id: $campusId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services {
        id
        historyRecord
        serviceRecords {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
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

export const TOWN_REPORT = gql`
  query townReports($townId: ID!) {
    towns(where: { id: $townId }) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
      services {
        id
        historyRecord
        serviceRecords {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
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
      services {
        id
        historyRecord
        serviceRecords {
          created_at
          attendance
          income
          week
          serviceDate {
            date
          }
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
