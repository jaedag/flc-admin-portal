import { useLazyQuery } from '@apollo/client'
import { MemberContext } from 'contexts/MemberContext'
import { ErrorMessage } from 'formik'
import { DEBOUNCE_TIMER, isAuthorised, throwErrorMsg } from 'global-utils'
import { permitMe } from 'permission-utils'
import React, { useContext, useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import {
  GATHERINGSERVICE_COUNCIL_SEARCH,
  STREAM_COUNCIL_SEARCH,
  MEMBER_COUNCIL_SEARCH,
} from './SearchCouncilQueries'
import TextError from './TextError'

const SearchCouncil = (props) => {
  const { currentUser } = useContext(MemberContext)
  const [suggestions, setSuggestions] = useState([])
  const [searchString, setSearchString] = useState(props.initialValue ?? '')

  const [gatheringServiceSearch, { error: gatheringServiceError }] =
    useLazyQuery(GATHERINGSERVICE_COUNCIL_SEARCH, {
      onCompleted: (data) => {
        setSuggestions(data.gatheringServices[0].councilSearch)
        return
      },
    })
  const [streamSearch, { error: streamError }] = useLazyQuery(
    STREAM_COUNCIL_SEARCH,
    {
      onCompleted: (data) => {
        setSuggestions(data.streams[0].councilSearch)
        return
      },
    }
  )

  const [memberSearch, { error: memberError }] = useLazyQuery(
    MEMBER_COUNCIL_SEARCH,
    {
      onCompleted: (data) => {
        setSuggestions(data.members[0].councilSearch)
        return
      },
    }
  )

  const error = memberError || gatheringServiceError || streamError
  throwErrorMsg(error)

  const whichSearch = (searchString) => {
    memberSearch({
      variables: {
        id: currentUser.id,
        key: searchString?.trim(),
      },
    })
    if (props.roleBased) {
      if (isAuthorised(permitMe('GatheringService'), currentUser.roles)) {
        gatheringServiceSearch({
          variables: {
            id: currentUser.gatheringService,
            key: searchString?.trim(),
          },
        })
      } else if (isAuthorised(permitMe('Stream'), currentUser.roles)) {
        streamSearch({
          variables: {
            id: currentUser.stream,
            key: searchString?.trim(),
          },
        })
      }
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
          setSearchString(suggestion.name)
          props.setFieldValue(`${props.name}`, suggestion)
        }}
        getSuggestionValue={(suggestion) => suggestion.name}
        highlightFirstSuggestion={true}
        renderSuggestion={(suggestion) => (
          <div className="combobox-control">{suggestion.name}</div>
        )}
      />

      {props.error && <TextError>{props.error}</TextError>}
      {!props.error ?? <ErrorMessage name={name} component={TextError} />}
    </div>
  )
}

export default SearchCouncil
