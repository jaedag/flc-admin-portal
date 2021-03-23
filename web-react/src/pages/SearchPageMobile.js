import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { MobileSearchNav } from '../components/MobileSearchNav'
import { GLOBAL_SEARCH } from '../queries/SearchQuery'
import { SearchContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import Spinner from '../components/Spinner'

export const SearchPageMobile = () => {
  const { searchKey } = useContext(SearchContext)
  // const { setMemberID } = useContext(MemberContext)
  const { determineChurch, clickCard } = useContext(ChurchContext)
  const history = useHistory()

  const { data: searchData, loading: searchLoading } = useQuery(GLOBAL_SEARCH, {
    variables: {
      searchKey: searchKey,
    },
  })

  if (searchLoading) {
    return (
      <React.Fragment>
        <MobileSearchNav />
        <div className="container body-container text-center">
          <div className="mt-5">
            <Spinner />
          </div>
        </div>
      </React.Fragment>
    )
  } else if (searchData) {
    const combinedData = [
      // ...new Set([
      ...searchData.Member,
      ...searchData.globalMemberSearch,
      ...searchData.globalCampusSearch,
      ...searchData.globalTownSearch,
      ...searchData.globalCentreSearch,
      ...searchData.globalBacentaSearch,
    ]
    // ),]

    return (
      <React.Fragment>
        <MobileSearchNav />
        <div className="container mt-5">
          {searchLoading && (
            <div className="d-flex justify-content-center">
              <Spinner />
            </div>
          )}
          {combinedData.map((searchResult, index) => {
            return (
              <div
                key={index}
                className="card mobile-search-card p-2 py-3 my-4"
                onClick={() => {
                  determineChurch(searchResult)
                  clickCard(searchResult)
                  history.push(
                    `/${searchResult.__typename.toLowerCase()}/displaydetails`
                  )
                }}
              >
                <div className="media">
                  {searchResult.pictureUrl ? (
                    <img
                      className="mr-3 rounded-circle img-search"
                      src={`${searchResult.pictureUrl}`}
                      alt={`${
                        searchResult.name
                          ? searchResult.name
                          : searchResult.firstName + ' ' + searchResult.lastName
                      }`}
                    />
                  ) : null}

                  <div className="media-body">
                    <h6 className="mt-0">{`${
                      searchResult.name
                        ? searchResult.name
                        : searchResult.firstName + ' ' + searchResult.lastName
                    }`}</h6>

                    {searchResult.bacenta ? (
                      <div>
                        <span className="font-weight-bold text-secondary">
                          Bacenta:
                        </span>{' '}
                        {searchResult.bacenta.name}
                      </div>
                    ) : searchResult.__typename ? (
                      <div>
                        <span className="font-weight-bold text-secondary">
                          {searchResult.__typename}
                        </span>
                      </div>
                    ) : null}
                    {searchResult.ministry ? (
                      <div>
                        <span className="font-weight-bold text-secondary">
                          Ministry:
                        </span>{' '}
                        {searchResult.ministry.name}{' '}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <MobileSearchNav />
        <div className="container full-body-center">
          <p className="text-center full-center">
            There seems to be an error loading data
          </p>
        </div>
      </React.Fragment>
    )
  }
}
