import React, { useContext } from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import { MemberContext } from 'contexts/MemberContext'
import './CheckboxGroup.css'

function CheckboxGroup(props) {
  const { label, name, options, ...rest } = props
  const { theme } = useContext(MemberContext)

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
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <>
                <button
                  type="button"
                  className={`filter-chips ${theme} ${
                    field.value.includes(option.value) && 'active'
                  }`}
                >
                  <div key={option.key} className="ml-2">
                    <input
                      className="d-none"
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

export default CheckboxGroup
