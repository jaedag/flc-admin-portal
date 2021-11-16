import React, { useContext, useState } from 'react'
import { ErrorMessage } from 'formik'
import TextError from './TextError'
import { Container, Spinner } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import './Formik.css'

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
  const { theme } = useContext(MemberContext)
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
    <>
      {label ? (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      ) : null}
      {loading && (
        <Container className="text-center my-3">
          <Spinner animation="grow" />
        </Container>
      )}
      {(image || initialValue) && (
        <>
          <img src={image || initialValue} className="img-preview" alt="" />
        </>
      )}
      <label className="w-100">
        <input
          id={name}
          name={name}
          style={{ display: 'none' }}
          type="file"
          accept="image/png, image/jpeg"
          onChange={uploadImage}
          {...rest}
        />

        <p className={`btn btn-primary image ${theme}`}>{placeholder}</p>
      </label>
      {props.error && <TextError>{props.error}</TextError>}
      {!props.error ?? <ErrorMessage name={name} component={TextError} />}
    </>
  )
}

export default ImageUpload
