import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { useQuery } from '@apollo/client'
import { ErrorMessage } from 'formik'
import TextError from './TextError'

function FormikAutocomplete(props) {
  const { label, name, placeholder, optionsQuery, setFieldValue } = props

  const [searchString, setSearchString] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const { data } = useQuery(optionsQuery, {
    variables: { centreName: searchString },
  })

  return (
    <div>
      {label ? <label htmlFor={name}>{label}</label> : null}
      <Autosuggest
        inputProps={{
          placeholder: placeholder,
          id: name,
          autoComplete: 'abcd',
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
            console.log(data)
            setSuggestions(
              data.centreDropdown.map((row) => ({
                name: row.name,
              }))
            )
          } catch (error) {
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
          setFieldValue({ name }, suggestion.name)
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

export default FormikAutocomplete
