import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { makeSelectOptions } from '../../global-utils'
import TextError from './TextError'
import { useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import PlaceholderCustom from 'components/Placeholder'

function SelectWithQuery(props) {
  const {
    label,
    name,
    modifier,
    queryVariable,
    optionsQuery,
    varValue,
    dataset,
    defaultOption,
    ...rest
  } = props

  const { data } = useQuery(optionsQuery, {
    variables: {
      [`${queryVariable}`]: varValue,
    },
  })
  const { isAuthenticated } = useAuth0()

  const options = data
    ? makeSelectOptions(data[dataset ? `${dataset}` : null])
    : []

  return (
    <div>
      {label ? (
        <PlaceholderCustom loading={!isAuthenticated}>
          <label className="label" htmlFor={name}>
            {label}
          </label>
        </PlaceholderCustom>
      ) : null}
      <Field as="select" id={name} name={name} {...rest}>
        <option value="" disabled defaultValue>
          {defaultOption}
        </option>
        {options.map((option) => {
          return (
            <option
              key={option.value}
              value={modifier === 'filter' ? option.key : option.value}
            >
              {option.key}
            </option>
          )
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default SelectWithQuery
