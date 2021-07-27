import React, { useState, useEffect } from 'react'
import Autosuggest from 'react-autosuggest'
import './react-autosuggest.css'
import { useLazyQuery } from '@apollo/client'
import { ErrorMessage } from 'formik'
import TextError from './TextError'
import { DEBOUNCE_TIMER } from 'global-utils'

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
  const [debouncedText, setDebouncedText] = useState(searchString)

  const [query] = useLazyQuery(optionsQuery, {
    onCompleted: (data) => {
      if (props.church === 'bacenta') {
        setSuggestions(
          data.members[0]?.bacentas.map((row) => {
            return {
              id: row.id,
              name: row[`${suggestionText}`],
              //if any type of church
              centre: row.centre,
            }
          })
        )
      } else if (props.church === 'centre') {
        setSuggestions(
          data.members[0].centres.map((row) => {
            return {
              id: row.id,
              name: row[`${suggestionText}`],
              //if any type of church
              centre: row.centre,
              campus: row.campus,
              town: row.town,
            }
          })
        )
      } else if (props.church === 'constituency') {
        setSuggestions(
          data.members[0].centres.map((row) => {
            return {
              id: row.id,
              name: row[`${suggestionText}`],
              //if any type of church
              centre: row.centre,
              campus: row.campus,
              town: row.town,
            }
          })
        )
      } else {
        setSuggestions(
          data[`${dataset}`].map((row) => {
            // console.log(row);
            return {
              id: row.id,
              name: row[`${suggestionText}`],
              //if members
              firstName: row.firstName,
              lastName: row.lastName,
              //if any type of church
              centre: row.centre,
            }
          })
        )
      }
      console.log('API Call', data)

      // setSearchString(debouncedText)
    },
  })

  useEffect(() => {
    const timerId = setTimeout(() => {
      query({
        variables: {
          [`${queryVariable1}`]: variable1,
          [`${queryVariable2}`]: searchString?.trim(),
        },
      })
    }, DEBOUNCE_TIMER)

    return () => {
      clearTimeout(timerId)
    }
    // eslint-disable-next-line
  }, [searchString, query])

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
          if (props.returnObject) {
            setFieldValue(`${name}`, suggestion)
          } else {
            setFieldValue(`${name}`, suggestion.id)
          }
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
