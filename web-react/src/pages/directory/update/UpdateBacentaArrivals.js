import { gql } from '@apollo/client'

export const DISPLAY_BACENTA_BUSSING_DETAILS = gql`
  query ($id: ID) {
    bacentas(where: { id: $id }, options: { limit: 1 }) {
      id
      name
      target
      vacationStatus
      graduationStatus

      normalBussingCost
      normalPersonalContribution
      swellBussingCost
      swellPersonalContribution
    }
  }
`

export const UPDATE_BACENTA_BUSSING_DETAILS = gql`
  mutation UpdateBacentaBussingDetails(
    $bacentaId: ID!
    $target: Int!
    $normalBussingCost: Float!
    $normalPersonalContribution: Float!
    $swellBussingCost: Float!
    $swellPersonalContribution: Float!
  ) {
    UpdateBacentaBussingDetails(
      bacentaId: $bacentaId
      target: $target
      normalBussingCost: $normalBussingCost
      normalPersonalContribution: $normalPersonalContribution
      swellBussingCost: $swellBussingCost
      swellPersonalContribution: $swellPersonalContribution
    ) {
      id
      name

      target
      normalBussingCost
      normalPersonalContribution
      swellBussingCost
      swellPersonalContribution

      leader {
        id
        firstName
        lastName
        whatsappNumber
        title {
          title
        }
      }
      history(options: { limit: 5 }) {
        id
        timeStamp
        created_at {
          date
        }
        loggedBy {
          id
          firstName
          lastName
        }
        historyRecord
      }
    }
  }
`
