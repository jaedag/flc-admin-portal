import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import MobileSearchNav from '../../components/MobileSearchNav.jsx'
import { GLOBAL_SEARCH } from '../../queries/SearchQuery'
import { SearchContext } from '../../contexts/MemberContext'
import Spinner from '../../components/Spinner.jsx'
import MemberDisplayCard from '../../components/card/MemberDisplayCard'

const SearchPageMobile = () => {
  const { searchKey } = useContext(SearchContext)

  const { data: searchData, loading: searchLoading } = useQuery(GLOBAL_SEARCH, {
    variables: {
      searchKey: searchKey,
    },
  })

  if (searchLoading) {
    return (
      <>
        <MobileSearchNav />
        <div className="container body-container text-center">
          <div className="mt-5">
            <Spinner />
          </div>
        </div>
      </>
    )
  } else if (searchData) {
    const combinedData = [
      // ...new Set([
      // ...searchData.Member,
      ...searchData.globalMemberSearch,
      ...searchData.globalCampusSearch,
      ...searchData.globalTownSearch,
      ...searchData.globalSontaSearch,
      ...searchData.globalCentreSearch,
      ...searchData.globalBacentaSearch,
    ]
    // ),]

    return (
      <>
        <MobileSearchNav />
        <div className="container mt-5">
          {searchLoading && (
            <div className="d-flex justify-content-center">
              <Spinner />
            </div>
          )}
          {combinedData.slice(0, 10).map((searchResult, index) => {
            return (
              <MemberDisplayCard
                key={index}
                index={index}
                member={searchResult}
              />
            )
          })}
        </div>
      </>
    )
  } else {
    return (
      <>
        <MobileSearchNav />
        <div className="container full-body-center">
          <p className="text-center full-center">
            There seems to be an error loading data
          </p>
        </div>
      </>
    )
  }
}

export default SearchPageMobile
