import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import PlaceholderCustom from 'components/Placeholder'
import { useAuth0 } from '@auth0/auth0-react'

function Select(props) {
  const { label, name, options, defaultOption, ...rest } = props
  const { isAuthenticated } = useAuth0()

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
        {options?.map((option) => {
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
