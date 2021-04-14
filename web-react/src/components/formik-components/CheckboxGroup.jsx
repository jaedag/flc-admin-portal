import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError.jsx'

function CheckboxGroup(props) {
  const { label, name, options, ...rest } = props

  return (
    <div>
      {label ? (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <div key={option.key} className="ml-2">
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label className="pl-4" htmlFor={option.value}>
                  {option.key}
                </label>
              </div>
            )
          })
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default CheckboxGroup
