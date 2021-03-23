import React, { useState, useContext } from 'react'
import Autosuggest from 'react-autosuggest'
import { useQuery } from '@apollo/client'
import { ErrorMessage } from 'formik'
import TextError from './TextError'
import { useHistory } from 'react-router-dom'
import { GLOBAL_SEARCH } from '../../queries/SearchQuery'
import { ChurchContext } from '../../contexts/ChurchContext'

function FormikSearchbox(props) {
  const { label, name, placeholder, setFieldValue } = props

  const [searchString, setSearchString] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const { clickCard } = useContext(ChurchContext)

  const history = useHistory()
  let combinedData
  const { error } = useQuery(GLOBAL_SEARCH, {
    variables: {
      searchKey: searchString,
    },
    onCompleted: (data) => {
      combinedData = [
        ...data.globalMemberSearch,
        ...data.globalCampusSearch,
        ...data.globalTownSearch,
        ...data.globalCentreSearch,
        ...data.globalBacentaSearch,
      ]
      setSuggestions(
        combinedData.map((row) => ({
          name: row.name,
          __typename: row.__typename,
          firstName: row.firstName,
          lastName: row.lastName,
          bishop: row.bishop,
          id: row.id,
        }))
      )
    },
  })
  if (error) {
    console.log(error)
  }
  return (
    <div>
      {label ? <label htmlFor={name}>{label}</label> : null}
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
            // setSuggestions(
            //   combinedData.map((row) => ({
            //     name: row.name,
            //     __typename: row.__typename,
            //     firstName: row.firstName,
            //     lastName: row.lastName,
            //     id: row.id,
            //     bacenta: row.bacenta,
            //     townBishop: row.townBishop,
            //     campusBishop: row.campusBishop,
            //     townGS0: row.townGSO,
            //     campusGSO: row.campusGSO,
            //   }))
            // )
            // console.log(suggestions)
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
          setFieldValue(`${name}`, suggestion.id)
          clickCard(suggestion)

          history.push(`/${suggestion.__typename.toLowerCase()}/displaydetails`)
        }}
        getSuggestionValue={(suggestion) =>
          `${suggestion.firstName} ${suggestion.lastName}`
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
