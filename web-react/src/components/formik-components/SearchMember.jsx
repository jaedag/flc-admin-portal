import { useLazyQuery } from '@apollo/client'
import { MemberContext } from 'contexts/MemberContext'
import { ErrorMessage } from 'formik'
import { DEBOUNCE_TIMER, isAuthorised, throwErrorMsg } from 'global-utils'
import React, { useContext, useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import {
  COUNCIL_MEMBER_SEARCH,
  GATHERINGSERVICE_MEMBER_SEARCH,
  STREAM_MEMBER_SEARCH,
  CONSTITUENCY_MEMBER_SEARCH,
  BACENTA_MEMBER_SEARCH,
  FELLOWSHIP_MEMBER_SEARCH,
} from './SearchMemberQueries'
import TextError from './TextError'

const SearchMember = (props) => {
  const { currentUser } = useContext(MemberContext)
  const [suggestions, setSuggestions] = useState([])
  const [searchString, setSearchString] = useState(props.initialValue ?? '')

  const [gatheringServiceSearch, { error: gatheringServiceError }] =
    useLazyQuery(GATHERINGSERVICE_MEMBER_SEARCH, {
      onCompleted: (data) => {
        setSuggestions(data.gatheringServices[0].memberSearch)
        return
      },
    })
  const [streamSearch, { error: streamError }] = useLazyQuery(
    STREAM_MEMBER_SEARCH,
    {
      onCompleted: (data) => {
        setSuggestions(data.streamSearch[0].memberSearch)
        return
      },
    }
  )
  const [councilSearch, { error: councilError }] = useLazyQuery(
    COUNCIL_MEMBER_SEARCH,
    {
      onCompleted: (data) => {
        setSuggestions(data.councilSearch[0].memberSearch)
        return
      },
    }
  )

  const [constituencySearch, { error: constituencyError }] = useLazyQuery(
    CONSTITUENCY_MEMBER_SEARCH,
    {
      onCompleted: (data) => {
        setSuggestions(data.constituencySearch[0].memberSearch)
        return
      },
    }
  )
  const [bacentaSearch, { error: bacentaError }] = useLazyQuery(
    BACENTA_MEMBER_SEARCH,
    {
      onCompleted: (data) => {
        setSuggestions(data.bacentaSearch[0].memberSearch)
        return
      },
    }
  )
  const [fellowshipSearch, { error: fellowshipError }] = useLazyQuery(
    FELLOWSHIP_MEMBER_SEARCH,
    {
      onCompleted: (data) => {
        setSuggestions(data.fellowshipSearch[0].memberSearch)
        return
      },
    }
  )

  const error =
    gatheringServiceError ||
    streamError ||
    councilError ||
    constituencyError ||
    bacentaError ||
    fellowshipError
  throwErrorMsg(error)

  const whichSearch = (searchString) => {
    if (isAuthorised(['adminFederal'], currentUser.roles)) {
      gatheringServiceSearch({
        variables: {
          id: currentUser.gatheringService,
          key: searchString?.trim(),
        },
      })
    } else if (
      isAuthorised(['adminStream', 'leaderStream'], currentUser.roles)
    ) {
      streamSearch({
        variables: {
          id: currentUser.stream,
          key: searchString?.trim(),
        },
      })
    } else if (
      isAuthorised(['adminCouncil', 'leaderCouncil'], currentUser.roles)
    ) {
      councilSearch({
        variables: {
          id: currentUser.council,
          key: searchString?.trim(),
        },
      })
    } else if (
      isAuthorised(
        ['adminConstituency', 'leaderConstituency'],
        currentUser.roles
      )
    ) {
      constituencySearch({
        variables: {
          id: currentUser.constituency,
          key: searchString?.trim(),
        },
      })
    } else if (isAuthorised(['leaderBacenta'], currentUser.roles)) {
      bacentaSearch({
        variables: {
          id: currentUser.fellowship.bacenta.id,
          key: searchString?.trim(),
        },
      })
    } else if (isAuthorised(['leaderFellowship'], currentUser.roles)) {
      fellowshipSearch({
        variables: {
          id: currentUser.fellowship,
          key: searchString?.trim(),
        },
      })
    }
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      whichSearch(searchString)
    }, DEBOUNCE_TIMER)

    return () => {
      clearTimeout(timerId)
    }
    // eslint-disable-next-line
  }, [searchString])

  return (
    <div>
      {props.label ? (
        <label className="label" htmlFor={name}>
          {props.label}
        </label>
      ) : null}
      <Autosuggest
        inputProps={{
          placeholder: props.placeholder,
          id: name,
          autoComplete: 'off',
          value: searchString,
          name: name,
          className: 'form-control',
          onChange: (_event, { newValue }) => {
            setSearchString(newValue)
          },
        }}
        suggestions={suggestions}
        onSuggestionsFetchRequested={async ({ value }) => {
          if (!value) {
            setSuggestions([])
          }
        }}
        onSuggestionsClearRequested={() => {
          setSuggestions([])
        }}
        onSuggestionSelected={(event, { suggestion, method }) => {
          if (method === 'enter') {
            event.preventDefault()
          }
          setSearchString(suggestion.firstName + ' ' + suggestion.lastName)

          props.setFieldValue(`${props.name}`, suggestion.id)
        }}
        getSuggestionValue={(suggestion) =>
          suggestion.firstName + ' ' + suggestion.lastName
        }
        highlightFirstSuggestion={true}
        renderSuggestion={(suggestion) => (
          <div className="combobox-control">
            {suggestion.firstName + ' ' + suggestion.lastName}
          </div>
        )}
      />

      {props.error && <TextError>{props.error}</TextError>}
      {!props.error ?? <ErrorMessage name={name} component={TextError} />}
    </div>
  )
}

export default SearchMember
