import React from 'react'
import NavBar from './nav/NavBar'

const ErrorScreen = () => {
  return (
    <>
      <NavBar />
      <div className="container full-body-center">
        <p className="text-center full-center">
          There seems to be an error loading data
        </p>
      </div>
    </>
  )
}

export default ErrorScreen
