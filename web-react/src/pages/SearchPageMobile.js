import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { MobileSearchNav } from '../components/MobileSearchNav'
import { GLOBAL_SEARCH } from '../queries/SearchQuery'
import { SearchContext, MemberContext } from '../contexts/MemberContext'
import { ChurchContext } from '../contexts/ChurchContext'
import SpinnerPage from '../components/SpinnerPage'

export const SearchPageMobile = () => {
  const { searchKey } = useContext(SearchContext)
  const { setMemberID } = useContext(MemberContext)
  const { setChurch, setBishopID } = useContext(ChurchContext)
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
        <SpinnerPage />
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
                  if (!searchResult.bacenta) {
                    if (searchResult.townBishop[0]) {
                      setChurch({ church: 'town', subChurch: 'centre' })
                      setBishopID(searchResult.memberID)
                      return
                    } else if (searchResult.campusBishop[0]) {
                      setChurch({ church: 'campus', subChurch: 'centre' })
                      setBishopID(searchResult.memberID)
                      return
                    }
                  } else if (!searchResult.bacenta.name) {
                    return
                  } else if (searchResult.bacenta.centre.town) {
                    setChurch({ church: 'town', subChurch: 'centre' })
                    setBishopID(
                      searchResult.bacenta.centre.town.bishop.memberID
                    )
                  } else if (
                    searchResult.bacenta.centre.campus ||
                    searchResult.campusGSO
                  ) {
                    setChurch({ church: 'campus', subChurch: 'centre' })
                    setBishopID(
                      searchResult.bacenta.centre.campus.bishop.memberID
                    )
                  }
                }}
              >
                <div className="media">
                  <img
                    className="mr-3 rounded-circle img-search"
                    src={`${searchResult.pictureUrl}`}
                    alt={`${searchResult.firstName} ${searchResult.lastName}`}
                  />
                  <div className="media-body">
                    <h5 className="mt-0">{`${searchResult.firstName} ${searchResult.lastName}`}</h5>
                    {searchResult.bacenta ? (
                      <div>
                        <span className="font-weight-bold">Bacenta:</span>{' '}
                        {searchResult.bacenta.name}{' '}
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
