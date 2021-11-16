import React, { useState } from 'react'
import { ErrorMessage } from 'formik'
import TextError from './TextError'
import { Container, Spinner, Button } from 'react-bootstrap'

function ImageUpload(props) {
  const {
    label,
    name,
    initialValue,
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
    <Container className="text-center my-2">
      {label ? (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      ) : null}
      {loading ? (
        <Container className="my-3">
          <Spinner animation="border" />
        </Container>
      ) : (
        <>
          <img
            src={image || initialValue}
            className="profile-img rounded my-3"
            alt=""
          />
        </>
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
        <Button variant="primary" size="lg">
          {placeholder}
        </Button>
      </label>
      {props.error && <TextError>{props.error}</TextError>}
      {!props.error ?? <ErrorMessage name={name} component={TextError} />}
    </Container>
  )
}

export default ImageUpload
