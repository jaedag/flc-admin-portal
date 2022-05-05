import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Button, Spinner } from 'react-bootstrap'

const SubmitButton = (props) => {
  const { formik, ...rest } = props
  const { theme } = useContext(MemberContext)

  return (
    <Button
      variant="primary"
      size="lg"
      type="submit"
      className={`btn-main ${theme} ${!formik.isValid && 'invalid'}`}
      disabled={formik.isSubmitting}
      {...rest}
    >
      {formik.isSubmitting ? (
        <>
          <Spinner animation="grow" size="sm" />
          <span> Submitting</span>
        </>
      ) : (
        props.children || 'Submit'
      )}
    </Button>
  )
}

export default SubmitButton
