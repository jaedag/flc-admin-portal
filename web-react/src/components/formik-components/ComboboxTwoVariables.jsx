import React, { useState, useEffect } from 'react'
import Autosuggest from 'react-autosuggest'
import './react-autosuggest.css'
import { useLazyQuery } from '@apollo/client'
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
    placeholder,
    optionsQuery,
    setFieldValue,
  } = props

  const [searchString, setSearchString] = useState(props.initialValue ?? '')
  const [suggestions, setSuggestions] = useState([])
  const [debouncedText, setDebouncedText] = useState('')

  const [query] = useLazyQuery(optionsQuery, {
    onCompleted: (data) => {
      setSuggestions(
        data[`${dataset}`].map((row) => ({
          name: row[`${suggestionText}`],
          id: row.id,
          firstName: row.firstName,
          lastName: row.lastName,
        }))
      )
    },
  })

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(searchString)
    }, 200)
    query({
      variables: {
        [`${queryVariable1}`]: variable1,
        [`${queryVariable2}`]: debouncedText?.trim(),
      },
    })
    return () => {
      clearTimeout(timerId)
    }
    // eslint-disable-next-line
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
          autoComplete: 'on',
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
          try {
            query({
              variables: {
                [`${queryVariable1}`]: variable1,
                [`${queryVariable2}`]: debouncedText.trim(),
              },
            })
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

          setDebouncedText(suggestion.name)
          setFieldValue(`${name}`, suggestion.id)
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
          <div className="combobox-control">{`${
            suggestion.name
              ? suggestion.name
              : suggestion.firstName + ' ' + suggestion.lastName
          }`}</div>
        )}
      />
      {props.error && <TextError>{props.error}</TextError>}
      {!props.error ?? <ErrorMessage name={name} component={TextError} />}
    </div>
  )
}

export default ComboboxTwoVariables
