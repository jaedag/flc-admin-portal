import React, { useState, useEffect } from 'react'
import Autosuggest from 'react-autosuggest'
import './react-autosuggest.css'
import { useQuery } from '@apollo/client'
import { ErrorMessage } from 'formik'
import TextError from './TextError.jsx'

function ComboboxTwoVariables(props) {
  const {
    label,
    name,
    dataset,
    queryVariable1,
    queryVariable2,
    variable1,
    suggestionText,
    suggestionID,
    placeholder,
    optionsQuery,
    setFieldValue,
  } = props

  const [searchString, setSearchString] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [debouncedText, setDebouncedText] = useState('')

  useQuery(optionsQuery, {
    variables: {
      [`${queryVariable1}`]: variable1,
      [`${queryVariable2}`]: debouncedText,
    },
    onCompleted: (data) => {
      setSuggestions(
        data[`${dataset}`].map((row) => ({
          name: row[`${suggestionText}`],
          id: row[`${suggestionID}`],
        }))
      )
    },
  })

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(searchString)
    }, 500)
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
          setSuggestions([])
        }}
        onSuggestionsClearRequested={() => {
          setSuggestions([])
        }}
        onSuggestionSelected={(event, { suggestion, method }) => {
          if (method === 'enter') {
            event.preventDefault()
          }
          setSearchString(suggestion.name)
          setFieldValue(`${name}`, suggestion.id)
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

export default ComboboxTwoVariables