import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { MobileSearchNav } from '../components/MobileSearchNav'
import { GLOBAL_SEARCH } from '../queries/SearchQuery'
import { SearchContext, MemberContext } from '../context/MemberContext'

export const SearchPageMobile = () => {
  const { searchKey } = useContext(SearchContext)
  const { setMemberID } = useContext(MemberContext)
  let history = useHistory()

  const {
    data: searchData,
    error: searchError,
    loading: searchLoading,
  } = useQuery(GLOBAL_SEARCH, {
    variables: { searchKey: searchKey },
  })

  if (searchError) {
    return (
      <React.Fragment>
        <MobileSearchNav />
        <ErrorScreen />
      </React.Fragment>
    )
  } else if (searchLoading) {
    return (
      <React.Fragment>
        <MobileSearchNav />
        <LoadingScreen />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <MobileSearchNav />
        <div className="container mt-5">
          {searchData.globalSearch.map((searchResult, index) => {
            return (
              <div
                key={index}
                className="card mobile-search-card p-2 py-3 my-4"
                onClick={() => {
                  setMemberID(searchResult.memberID)
                  history.push('/members/displaydetails')
                }}
              >
                <div className="media">
                  <img
                    className="mr-3 rounded-circle"
                    src={`${searchResult.pictureUrl}`}
                    alt={`${searchResult.firstName} ${searchResult.lastName}`}
                  />
                  <div className="media-body">
                    <h5 className="mt-0">{`${searchResult.firstName} ${searchResult.lastName}`}</h5>
                    {searchResult.centre ? (
                      <div>
                        <span className="font-weight-bold">Centre:</span>{' '}
                        {searchResult.centre.name}{' '}
                      </div>
                    ) : null}
                    {searchResult.sonta ? (
                      <div>
                        <span className="font-weight-bold">Ministry:</span>{' '}
                        {searchResult.sonta.name}{' '}
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
  }
}
