import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import MobileSearchNav from '../../components/MobileSearchNav.jsx'
import { FEDERAL_NEO_SEARCH } from './SearchQuery'
import { SearchContext } from '../../contexts/MemberContext'
import Spinner from '../../components/Spinner.jsx'
import MemberDisplayCard from '../../components/card/MemberDisplayCard'
import { capitalise } from '../../global-utils.js'

const SearchPageMobile = () => {
  const { searchKey } = useContext(SearchContext)

  const { data, loading } = useQuery(FEDERAL_NEO_SEARCH, {
    variables: {
      searchKey: capitalise(searchKey.trim()),
    },
  })

  if (loading) {
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
  } else if (data) {
    const combinedData = [
      ...data.members,
      ...data.campuses,
      ...data.towns,
      ...data.sontas,
      ...data.centres,
      ...data.bacentas,
    ]

    return (
      <>
        <MobileSearchNav />
        <div className="container mt-5">
          {loading && (
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
