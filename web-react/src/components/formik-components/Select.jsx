import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError.jsx'

function Select(props) {
  const { label, name, options, defaultOption, ...rest } = props

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
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          )
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default Select
