import React from 'react'
import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'
import SelectWithQuery from './SelectWithQuery'
import RadioButtons from './RadioButtons'
import CheckboxGroup from './CheckboxGroup'
import Combobox from './Combobox'
import ComboboxTwoVariables from './ComboboxTwoVariables'
import FormikSearchbox from './FormikSearchbox'
import ImageUpload from './ImageUpload'
import CheckboxWithQuery from './CheckboxWithQuery'
import MemberSearch from './MemberSearch'

function FormikControl(props) {
  const { control, ...rest } = props

  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'combobox':
      return <Combobox {...rest} />
    case 'combobox2':
      return <ComboboxTwoVariables {...rest} />
    case 'memberSearch':
      return <MemberSearch {...rest} />
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
    case 'checkboxWithQuery':
      return <CheckboxWithQuery {...rest} />
    case 'imageUpload':
      return <ImageUpload {...rest} />
    default:
      return null
  }
}

export default FormikControl
