import React from 'react'
import NavBar from '../nav/NavBar'

const ErrorScreen = ({ error }) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }

  return (
    <>
      <NavBar />
      <div className="container full-body-center h-100">
        <p className="text-center full-center">
          There seems to be an error loading data
        </p>
      </div>
    </>
  )
}

export default ErrorScreen
