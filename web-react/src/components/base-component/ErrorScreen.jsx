import React from 'react'

const ErrorScreen = ({ error }) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }

  return (
    <>
      <div className="container full-body-center h-100">
        <p className="text-center full-center">
          There seems to be an error loading data
        </p>
      </div>
    </>
  )
}

export default ErrorScreen
