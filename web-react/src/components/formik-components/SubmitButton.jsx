import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Button, Spinner } from 'react-bootstrap'

const SubmitButton = (props) => {
  const { formik, ...rest } = props
  const { theme } = useContext(MemberContext)
  console.log(formik.isSubmitting)
  return (
    <Button
      variant="primary"
      size="lg"
      type="submit"
      className={`btn-main ${theme}`}
      disabled={!formik.isValid || formik.isSubmitting}
      {...rest}
    >
      {formik.isSubmitting ? (
        <>
          <Spinner animation="grow" size="sm" />
          <span> Submitting</span>
        </>
      ) : (
        'Submit'
      )}
    </Button>
  )
}

export default SubmitButton
