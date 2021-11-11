import React, { useContext } from 'react'
import { Field, ErrorMessage } from 'formik'
import { makeSelectOptions } from '../../global-utils'
import TextError from './TextError'
import { useQuery } from '@apollo/client'
import { MemberContext } from 'contexts/MemberContext'
import './CheckboxGroup.css'

function CheckboxWithQuery(props) {
  const {
    label,
    name,
    modifier,
    queryVariable,
    optionsQuery,
    varValue,
    dataset,
    ...rest
  } = props

  const { theme } = useContext(MemberContext)
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
        <>
          <label className="checkbox-label" htmlFor={name}>
            {label}
          </label>
          <br />
        </>
      ) : null}
      {/* <Field as="select" id={name} name={name} {...rest}>
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
      </Field> */}
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <>
                <button
                  type="button"
                  className={`filter-chips ${theme} ${
                    field.value.includes(option.key) && 'active'
                  }`}
                >
                  <div key={option.key} className="ml-2">
                    <input
                      className="d-none"
                      type="checkbox"
                      id={option.value}
                      {...field}
                      value={modifier === 'filter' ? option.key : option.value}
                      checked={field.value.includes(option.key)}
                    />
                    <label className="pl-4" htmlFor={option.value}>
                      {option.key}
                    </label>
                  </div>
                </button>
              </>
            )
          })
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default CheckboxWithQuery
