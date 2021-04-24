import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError.jsx'
import './Input.css'

function Input(props) {
  const { label, name, ...rest } = props

  return (
    <div>
      {label ? (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default Input
