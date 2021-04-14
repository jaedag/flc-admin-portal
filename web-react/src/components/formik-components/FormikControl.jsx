import React from 'react'
import Input from './Input.jsx'
import Textarea from './Textarea.jsx'
import Select from './Select.jsx'
import SelectWithQuery from './SelectWithQuery.jsx'
import RadioButtons from './RadioButtons.jsx'
import CheckboxGroup from './CheckboxGroup.jsx'
import Combobox from './Combobox.jsx'
import ComboboxTwoVariables from './ComboboxTwoVariables.jsx'
import FormikSearchbox from './FormikSearchbox.jsx'

function FormikControl(props) {
  const { control, ...rest } = props

  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'combobox':
      return <Combobox {...rest} />
    case 'combobox2':
      return <ComboboxTwoVariables {...rest} />
    case 'searchbox':
      return <FormikSearchbox {...rest} />
    case 'textarea':
      return <Textarea {...rest} />
    case 'select':
      return <Select {...rest} />
    case 'selectWithQuery':
      return <SelectWithQuery {...rest} />
    case 'radio':
      return <RadioButtons {...rest} />
    case 'checkbox':
      return <CheckboxGroup {...rest} />
    default:
      return null
  }
}

export default FormikControl
