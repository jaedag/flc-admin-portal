import React, { useState, useEffect } from 'react'
import Autosuggest from 'react-autosuggest'
import './react-autosuggest.css'
import { useQuery } from '@apollo/client'
import { ErrorMessage } from 'formik'
import TextError from './TextError.jsx'

function Combobox(props) {
  const {
    label,
    name,
    dataset,
    modifier,
    initValue,
    queryVariable,
    suggestionText,
    suggestionID,
    placeholder,
    optionsQuery,
    setFieldValue,
  } = props

  const [searchString, setSearchString] = useState(initValue ? initValue : '')
  const [suggestions, setSuggestions] = useState([])
  const [debouncedText, setDebouncedText] = useState('')

  useQuery(optionsQuery, {
    variables: {
      [`${queryVariable}`]: debouncedText,
    },
    onCompleted: (data) => {
      setSuggestions(
        data[`${dataset}`].map((row) => ({
          name: row[`${suggestionText}`],
          id: row[`${suggestionID}`],
          centre: row.centre,
          campus: row.campus,
          town: row.town,
        }))
      )
    },
  })

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(searchString)
    }, 200)
    return () => {
      clearTimeout(timerId)
    }
  }, [searchString])

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
          if (modifier === 'id-only') {
            setFieldValue(`${name}`, suggestion.id)
          } else {
            setFieldValue(`${name}`, suggestion)
          }
        }}
        getSuggestionValue={(suggestion) => suggestion.name}
        highlightFirstSuggestion={true}
        renderSuggestion={(suggestion) => (
          <div className="combobox-control">{suggestion.name}</div>
        )}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default Combobox
