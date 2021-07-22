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
    }
    bacentaMemberCount(id: $bacentaId)
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
    }
    centreMemberCount(id: $centreId)
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
    }
    sontaMemberCount(id: $sontaId)
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
    }
    campusMemberCount(id: $campusId)
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
    }
    townMemberCount(id: $townId)
  }
`
