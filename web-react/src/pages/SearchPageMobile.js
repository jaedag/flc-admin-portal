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
  const { clickMember } = useContext(ChurchContext)

  const history = useHistory()
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
        <div className="container full-body-center">
          <p className="text-center full-center">
            There seems to be an error loading data
          </p>
        </div>
      </React.Fragment>
    )
  } else if (searchLoading) {
    return (
      <React.Fragment>
        <MobileSearchNav />
        <div className="container body-container text-center">
          <Spinner />
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <MobileSearchNav />
        <div className="container mt-5">
          {searchLoading && (
            <div className="d-flex justify-content-center">
              <Spinner />
            </div>
          )}
          {searchData.globalSearch.map((searchResult, index) => {
            return (
              <div
                key={index}
                className="card mobile-search-card p-2 py-3 my-4"
                onClick={() => {
                  clickMember(searchResult)
                  history.push('/member/displaydetails')
                }}
              >
                <div className="media">
                  <img
                    className="mr-3 rounded-circle img-search"
                    src={`${searchResult.pictureUrl}`}
                    alt={`${searchResult.firstName} ${searchResult.lastName}`}
                  />
                  <div className="media-body">
                    <h6 className="mt-0">{`${searchResult.firstName} ${searchResult.lastName}`}</h6>
                    {searchResult.bacenta ? (
                      <div>
                        <span className="font-weight-bold text-secondary">
                          Bacenta:
                        </span>{' '}
                        {searchResult.bacenta.name}{' '}
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
  }
}
