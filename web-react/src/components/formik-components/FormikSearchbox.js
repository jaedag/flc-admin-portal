import React, { useState, useContext } from 'react'
import Autosuggest from 'react-autosuggest'
import { useQuery } from '@apollo/client'
import { ErrorMessage } from 'formik'
import TextError from './TextError'
import { useHistory } from 'react-router-dom'
import { GLOBAL_SEARCH } from '../../queries/SearchQuery'
import { MemberContext } from '../../contexts/MemberContext'
import { ChurchContext } from '../../contexts/ChurchContext'

function FormikSearchbox(props) {
  const { label, name, dataset, placeholder, setFieldValue } = props

  const [searchString, setSearchString] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const { setMemberID } = useContext(MemberContext)
  const { setChurch, setBishopID } = useContext(ChurchContext)
  const history = useHistory()

  const { data } = useQuery(GLOBAL_SEARCH, {
    variables: {
      searchKey: searchString,
    },
  })

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
            // console.log(data)
            setSuggestions(
              data[`${dataset}`].map((row) => ({
                firstName: row.firstName,
                lastName: row.lastName,
                id: row.memberID,
                bacenta: row.bacenta,
                townBishop: row.townBishop,
                campusBishop: row.campusBishop,
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

          if (
            (suggestion.bacenta.centre
              ? suggestion.bacenta.centre.town
              : null) ||
            (suggestion.townBishop[0] ? suggestion.townBishop[0].name : null)
          ) {
            setChurch({ church: 'town', subChurch: 'centre' })
            setBishopID(suggestion.bacenta.centre.town.bishop.memberID)
          } else if (
            (suggestion.bacenta.centre
              ? suggestion.bacenta.centre.campus
              : null) ||
            (suggestion.campusBishop[0]
              ? suggestion.campusBishop[0].name
              : null)
          ) {
            setChurch({ church: 'campus', subChurch: 'centre' })
            setBishopID(suggestion.bacenta.centre.campus.bishop.memberID)
          }

          setMemberID(suggestion.id)
          history.push('/members/displaydetails')
          setFieldValue(`${name}`, suggestion.memberID)
        }}
        getSuggestionValue={(suggestion) =>
          `${suggestion.firstName} ${suggestion.lastName}`
        }
        highlightFirstSuggestion={true}
        renderSuggestion={(suggestion) => (
          <div className="combobox-control">{`${suggestion.firstName} ${suggestion.lastName}`}</div>
        )}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default FormikSearchbox
