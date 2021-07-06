import React, { useState } from 'react'
import { ErrorMessage } from 'formik'
import Spinner from '../Spinner'
import TextError from './TextError'

function ImageUpload(props) {
  const {
    label,
    name,
    setFieldValue,
    uploadPreset,
    placeholder,
    ...rest
  } = props
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')

  const uploadImage = async (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', uploadPreset)

    setLoading(true)

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/firstlovecenter/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )
    const file = await res.json()

    setImage(file.secure_url)

    setFieldValue(`${name}`, file.secure_url)
    setLoading(false)
  }

  return (
    <div className="container text-center my-2">
      {label ? (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      ) : null}
      {loading ? (
        <div className="container my-3">
          <Spinner />
        </div>
      ) : (
        <div>
          <img src={image} className="profile-img rounded my-3" alt="" />
        </div>
      )}
      <label>
        <input
          id={name}
          name={name}
          style={{ display: 'none' }}
          type="file"
          accept="image/png, image/jpeg"
          onChange={uploadImage}
          {...rest}
        />
        <p className="btn btn-primary px-4">{placeholder}</p>
      </label>
      {props.error && <TextError>{props.error}</TextError>}
      {!props.error ?? <ErrorMessage name={name} component={TextError} />}
    </div>
  )
}

export default ImageUpload
