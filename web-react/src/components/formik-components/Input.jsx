import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import './Input.css'
import './Formik.css'

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
