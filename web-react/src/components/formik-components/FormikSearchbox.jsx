import React, { useState, useEffect, useContext } from 'react'
import Autosuggest from 'react-autosuggest'
import './react-autosuggest.css'
import { useLazyQuery } from '@apollo/client'
import { ErrorMessage } from 'formik'
import TextError from './TextError'
import { useHistory } from 'react-router-dom'
import { GLOBAL_NEO_SEARCH } from '../../pages/mobile/SearchQuery.js'
import { ChurchContext } from '../../contexts/ChurchContext'
import { capitalise } from '../../global-utils'

function FormikSearchbox(props) {
  const { label, name, placeholder, setFieldValue } = props

  const [searchString, setSearchString] = useState('')
  const [debouncedText, setDebouncedText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const { clickCard } = useContext(ChurchContext)
  const history = useHistory()

  let combinedData
  const [globalSearch] = useLazyQuery(GLOBAL_NEO_SEARCH, {
    onCompleted: (data) => {
      combinedData = [
        ...data.members,
        ...data.campuses,
        ...data.towns,
        ...data.sontas,
        ...data.centres,
        ...data.bacentas,
      ]

      setSuggestions(
        combinedData.slice(0, 10).map((row) => ({
          name: row.name,
          __typename: row.__typename,
          firstName: row.firstName,
          lastName: row.lastName,
          bacenta: row.bacenta,
          centre: row.centre,
          town: row.town,
          campus: row.campus,
          bishop: row.bishop,
          leadsBacenta: row.leadsBacenta,
          leadsCentre: row.leadsCentre,
          leadsCampus: row.leadsCampus,
          leadsTown: row.leadsTown,
          townBishop: row.townBishop,
          campusBishop: row.campusBishop,
          id: row.id,
        }))
      )
    },
  })

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(searchString)
      globalSearch({
        variables: { searchKey: capitalise(debouncedText.trim()) },
      })
    }, 200)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchString, globalSearch, debouncedText])

  return (
    <div>
      {label ? (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <Autosuggest
        inputProps={{
          placeholder: placeholder,
          id: name,
          autoComplete: 'off',
          value: searchString,
          name: name,
          className: 'nav-search-box',
          onChange: (_event, { newValue }) => {
            setSearchString(newValue)
          },
        }}
        suggestions={suggestions}
        onSuggestionsFetchRequested={async ({ value }) => {
          if (!value) {
            setSuggestions([])
          }
          try {
            globalSearch({ variables: { searchKey: debouncedText.trim() } })
          } catch {
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
          setDebouncedText(
            suggestion.name ?? suggestion.firstName + ' ' + suggestion.lastName
          )
          setFieldValue(`${name}`, suggestion.id)
          clickCard(suggestion)
          history.push(`/${suggestion.__typename.toLowerCase()}/displaydetails`)
        }}
        getSuggestionValue={(suggestion) =>
          `${
            suggestion.name
              ? suggestion.name
              : suggestion.firstName + ' ' + suggestion.lastName
          }`
        }
        highlightFirstSuggestion={true}
        renderSuggestion={(suggestion) => (
          <div className="combobox-control">
            <span>{`${
              suggestion.name
                ? suggestion.name
                : suggestion.firstName + ' ' + suggestion.lastName
            }`}</span>
            <br />
            {suggestion.__typename && (
              <small className="text-secondary">{`${suggestion?.__typename}`}</small>
            )}
          </div>
        )}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default FormikSearchbox
