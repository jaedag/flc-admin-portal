import React from 'react'
import { NavBar } from '../components/NavBar'
import SpinnerPage from '../components/SpinnerPage'

export const ErrorScreen = () => {
  return (
    <React.Fragment>
      <NavBar />
      <div className="container full-body-center">
        <p className="text-center full-center">
          There seems to be an error loading data
        </p>
      </div>
    </React.Fragment>
  )
}

export const LoadingScreen = () => {
  return (
    <React.Fragment>
      <NavBar />
      <SpinnerPage />
    </React.Fragment>
  )
}
