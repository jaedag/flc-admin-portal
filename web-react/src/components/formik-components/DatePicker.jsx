import React from 'react'
import DateView from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError.jsx'

function DatePicker(props) {
  const { label, name, ...rest } = props

  return (
    <div>
      {label ? (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <Field name={name}>
        {({ field, form }) => {
          const { setFieldValue } = form
          // const { value } = field

          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              isClearable
              onChange={(val) => setFieldValue(name, val)}
            />
          )
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default DatePicker
