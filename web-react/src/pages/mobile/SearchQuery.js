import { gql } from '@apollo/client'

export const FEDERAL_SEARCH = gql`
  query federalSearch($searchKey: String) {
    federalSontaSearch(searchKey: $searchKey) {
      id
      name
      stream_name
      constituency {
        council {
          id
        }
      }
    }

    federalConstituencySearch(searchKey: $searchKey) {
      id
      name
      stream_name
    }
    federalBacentaSearch(searchKey: $searchKey) {
      id
      name
      stream_name
    }
    federalFellowshipSearch(searchKey: $searchKey) {
      id
      name
      stream_name
    }
    federalMemberSearch(searchKey: $searchKey) {
      id
      firstName
      lastName
      pictureUrl
      stream_name
      fellowship {
        id
        name
      }
      ministry {
        id
        name
      }
    }
  }
`

export const COUNCIL_SEARCH = gql`
  query councilSearch($searchKey: String, $councilId: ID) {
    councilSontaSearch(searchKey: $searchKey, councilId: $councilId) {
      id
      name
    }

    councilConstituencySearch(searchKey: $searchKey, councilId: $councilId) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
    }
    councilBacentaSearch(searchKey: $searchKey, councilId: $councilId) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
    }
    councilFellowshipSearch(searchKey: $searchKey, councilId: $councilId) {
      id
      name
      leader {
        id
        firstName
        lastName
        fullName
      }
    }
    councilMemberSearch(searchKey: $searchKey, councilId: $councilId) {
      id
      firstName
      lastName
      fullName
      pictureUrl
      stream_name
      fellowship {
        id
        name
      }
      ministry {
        id
        name
      }
    }
  }
`

export const CONSTITUENCY_SEARCH = gql`
  query constituencySearch($searchKey: String, $constituencyId: ID) {
    constituencySontaSearch(
      searchKey: $searchKey
      constituencyId: $constituencyId
    ) {
      id
      name
    }
    constituencyBacentaSearch(
      searchKey: $searchKey
      constituencyId: $constituencyId
    ) {
      id
      name
    }
    constituencyFellowshipSearch(
      searchKey: $searchKey
      constituencyId: $constituencyId
    ) {
      id
      name
    }
    constituencyMemberSearch(
      searchKey: $searchKey
      constituencyId: $constituencyId
    ) {
      id
      firstName
      lastName
      fullName
      pictureUrl
      stream_name
      fellowship {
        id
        name
      }
      ministry {
        id
        name
      }
    }
  }
`

export const BACENTA_SEARCH = gql`
  query bacentaSearch($searchKey: String, $bacentaId: ID) {
    bacentaFellowshipSearch(searchKey: $searchKey, bacentaId: $bacentaId) {
      id
      name
    }
    bacentaMemberSearch(searchKey: $searchKey, bacentaId: $bacentaId) {
      id
      firstName
      lastName
      fullName
      pictureUrl
      stream_name
      fellowship {
        id
        name
      }
      ministry {
        id
        name
      }
    }
  }
`

export const FELLOWSHIP_SEARCH = gql`
  query fellowshipSearch($searchKey: String, $fellowshipId: ID) {
    fellowshipMemberSearch(searchKey: $searchKey, fellowshipId: $fellowshipId) {
      id
      firstName
      lastName
      fullName
      pictureUrl
      stream_name
      fellowship {
        id
        name
      }
      ministry {
        id
        name
      }
    }
  }
`
