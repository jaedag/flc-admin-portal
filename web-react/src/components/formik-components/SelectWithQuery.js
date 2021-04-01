import React, { useContext } from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import { useQuery } from '@apollo/client'
import { ChurchContext } from '../../contexts/ChurchContext'

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
  const { makeSelectOptions } = useContext(ChurchContext)

  const { data } = useQuery(optionsQuery, {
    variables: {
      [`${queryVariable}`]: varValue,
    },
  })

  const options = data
    ? makeSelectOptions(data[dataset ? `${dataset}` : null])
    : []

  return (
    <div>
      {label ? (
        <label className="label" htmlFor={name}>
          {label}
        </label>
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
