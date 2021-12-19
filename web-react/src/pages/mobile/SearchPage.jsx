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
import { isAuthorised, throwErrorMsg } from 'global-utils.js'
import { Container, Spinner } from 'react-bootstrap'

const SearchPageMobile = () => {
  const { searchKey } = useContext(SearchContext)
  const { currentUser } = useContext(MemberContext)

  const [combinedData, setCombinedData] = useState([])

  const [federalSearch, { loading: federalLoading, error: federalError }] =
    useLazyQuery(FEDERAL_SEARCH, {
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

  const [councilSearch, { loading: councilLoading, error: councilError }] =
    useLazyQuery(COUNCIL_SEARCH, {
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
  const [
    constituencySearch,
    { loading: constituencyLoading, error: constituencyError },
  ] = useLazyQuery(CONSTITUENCY_SEARCH, {
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

  const [bacentaSearch, { loading: bacentaLoading, error: bacentaError }] =
    useLazyQuery(BACENTA_SEARCH, {
      onCompleted: (data) => {
        setCombinedData([
          ...data.bacentaMemberSearch,
          ...data.bacentaFellowshipSearch,
        ])
        return
      },
    })

  const [
    fellowshipSearch,
    { loading: fellowshipLoading, error: fellowshipError },
  ] = useLazyQuery(FELLOWSHIP_SEARCH, {
    onCompleted: (data) => {
      setCombinedData([...data.fellowshipMemberSearch])
      return
    },
  })
  const error =
    federalError ||
    councilError ||
    constituencyError ||
    bacentaError ||
    fellowshipError
  throwErrorMsg(error)

  const loading =
    federalLoading ||
    councilLoading ||
    constituencyLoading ||
    bacentaLoading ||
    fellowshipLoading

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
      {loading && (
        <Container className="text-center">
          <Spinner animation="grow" className="mt-5" />
        </Container>
      )}

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
