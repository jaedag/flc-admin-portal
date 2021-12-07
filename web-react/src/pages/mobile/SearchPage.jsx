import React, { useContext, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import MobileSearchNav from '../../components/MobileSearchNav.jsx'
import {
  COUNCIL_SEARCH,
  CONSTITUENCY_SEARCH,
  FEDERAL_SEARCH,
  BACENTA_SEARCH,
  FELLOWSHIP_SEARCH,
} from './SearchQuery'
import { MemberContext, SearchContext } from '../../contexts/MemberContext'
import MemberDisplayCard from '../../components/card/MemberDisplayCard'
import { isAuthorised } from 'global-utils.js'
import { Container } from 'react-bootstrap'

const SearchPageMobile = () => {
  const { searchKey } = useContext(SearchContext)
  const { currentUser } = useContext(MemberContext)

  const [combinedData, setCombinedData] = useState([])

  const [federalSearch] = useLazyQuery(FEDERAL_SEARCH, {
    onCompleted: (data) => {
      setCombinedData([
        ...data.federalMemberSearch,
        ...data.federalCampusSearch,
        ...data.federalTownSearch,
        ...data.federalSontaSearch,
        ...data.federalBacentaSearch,
        ...data.federalFellowshipSearch,
      ])
      return
    },
  })

  const [councilSearch] = useLazyQuery(COUNCIL_SEARCH, {
    onCompleted: (data) => {
      setCombinedData([
        ...data.councilMemberSearch,
        ...data.councilCampusSearch,
        ...data.councilTownSearch,
        ...data.councilSontaSearch,
        ...data.councilBacentaSearch,
        ...data.councilFellowshipSearch,
      ])
      return
    },
  })
  const [constituencySearch] = useLazyQuery(CONSTITUENCY_SEARCH, {
    onCompleted: (data) => {
      setCombinedData([
        ...data.constituencyMemberSearch,
        ...data.constituencySontaSearch,
        ...data.constituencyBacentaSearch,
        ...data.constituencyFellowshipSearch,
      ])
      return
    },
  })

  const [bacentaSearch] = useLazyQuery(BACENTA_SEARCH, {
    onCompleted: (data) => {
      setCombinedData([
        ...data.bacentaMemberSearch,
        ...data.bacentaFellowshipSearch,
      ])
      return
    },
  })

  const [fellowshipSearch] = useLazyQuery(FELLOWSHIP_SEARCH, {
    onCompleted: (data) => {
      setCombinedData([...data.fellowshipMemberSearch])
      return
    },
  })

  const whichSearch = (searchString) => {
    if (isAuthorised(['adminFederal'], currentUser.roles)) {
      federalSearch({
        variables: { searchKey: searchString?.trim() },
      })
    } else if (isAuthorised(['adminCouncil', 'bishop'], currentUser.roles)) {
      councilSearch({
        variables: {
          councilId: currentUser.council,
          searchKey: searchString?.trim(),
        },
      })
    } else if (
      isAuthorised(
        ['adminCampus', 'adminTown', 'leaderCampus', 'leaderTown'],
        currentUser.roles
      )
    ) {
      constituencySearch({
        variables: {
          constituencyId: currentUser.constituency,
          searchKey: searchString?.trim(),
        },
      })
    } else if (isAuthorised(['leaderBacenta'], currentUser.roles)) {
      bacentaSearch({
        variables: {
          bacentaId: currentUser.fellowship.bacenta.id,
          searchKey: searchString?.trim(),
        },
      })
    } else if (isAuthorised(['leaderFellowship'], currentUser.roles)) {
      fellowshipSearch({
        variables: {
          fellowshipId: currentUser.fellowship.id,
          searchKey: searchString?.trim(),
        },
      })
    }
  }

  useEffect(() => {
    whichSearch(searchKey)
  }, [searchKey])

  return (
    <>
      <MobileSearchNav />
      <Container>
        {combinedData.slice(0, 10).map((searchResult, index) => {
          return (
            <MemberDisplayCard
              key={index}
              index={index}
              member={searchResult}
            />
          )
        })}
      </Container>
    </>
  )
}

export default SearchPageMobile
