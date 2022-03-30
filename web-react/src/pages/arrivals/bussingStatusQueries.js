import { gql } from '@apollo/client'

//No Activity Queries
export const CONSTITUENCY_BACENTAS_NO_ACTIVITY = gql`
  query ($id: ID) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNoActivity {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_NO_ACTIVITY = gql`
  query ($id: ID) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNoActivity {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
      }
    }
  }
`

export const STREAM_BACENTAS_NO_ACTIVITY = gql`
  query ($id: ID) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNoActivity {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BACENTAS_NO_ACTIVITY = gql`
  query ($id: ID) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNoActivity {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
      }
    }
  }
`

export const CONSTITUENCY_BACENTAS_MOBILISING = gql`
  query ($id: ID) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasMobilising {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_MOBILISING = gql`
  query ($id: ID) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasMobilising {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
      }
    }
  }
`

export const STREAM_BACENTAS_MOBILISING = gql`
  query ($id: ID) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasMobilising {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BACENTAS_MOBILISING = gql`
  query ($id: ID) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasMobilising {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
      }
    }
  }
`

export const CONSTITUENCY_BACENTAS_ON_THE_WAY = gql`
  query ($id: ID) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasOnTheWay {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_ON_THE_WAY = gql`
  query ($id: ID) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasOnTheWay {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`
export const STREAM_BACENTAS_ON_THE_WAY = gql`
  query ($id: ID) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasOnTheWay {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BACENTAS_ON_THE_WAY = gql`
  query ($id: ID) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasOnTheWay {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const CONSTITUENCY_BACENTAS_TO_COUNT = gql`
  query ($id: ID) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNotCounted {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_TO_COUNT = gql`
  query ($id: ID) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNotCounted {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`
export const STREAM_BACENTAS_TO_COUNT = gql`
  query ($id: ID) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNotCounted {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const GATHERINGSERVICE_BACENTAS_TO_COUNT = gql`
  query ($id: ID) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasNotCounted {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const CONSTITUENCY_BACENTAS_ARRIVED = gql`
  query ($id: ID) {
    constituencies(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasHaveArrived {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const COUNCIL_BACENTAS_ARRIVED = gql`
  query ($id: ID) {
    councils(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasHaveArrived {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const STREAM_BACENTAS_ARRIVED = gql`
  query ($id: ID) {
    streams(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasHaveArrived {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`

export const GATHERINGSERVICES_BACENTAS_ARRIVED = gql`
  query ($id: ID) {
    gatheringServices(where: { id: $id }, options: { limit: 1 }) {
      id
      name

      bacentasHaveArrived {
        id
        name
        leader {
          id
          firstName
          lastName
          fullName
          pictureUrl
        }
        bussing(limit: 1) {
          id
        }
      }
    }
  }
`
