import React from 'react'
import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'
import RadioButtons from './RadioButtons'
import CheckboxGroup from './CheckboxGroup'
import Combobox from './Combobox'
import FormikSearchbox from './FormikSearchbox'

function FormikControl(props) {
  const { control, ...rest } = props

  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'combobox':
      return <Combobox {...rest} />
    case 'searchbox':
      return <FormikSearchbox {...rest} />
    case 'textarea':
      return <Textarea {...rest} />
    case 'select':
      return <Select {...rest} />
    case 'radio':
      return <RadioButtons {...rest} />
    case 'checkbox':
      return <CheckboxGroup {...rest} />
    default:
      return null
  }
}

export default FormikControl
