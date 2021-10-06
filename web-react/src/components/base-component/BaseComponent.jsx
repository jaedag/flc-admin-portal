import React from 'react'
import ErrorScreen from './ErrorScreen'
import LoadingScreen from './LoadingScreen'

const BaseComponent = (props) => {
  const { loadingState, errorState, data } = props

  if (loadingState) {
    return <LoadingScreen />
  } else if (data) {
    return <>{props.children}</>
  } else if (errorState) {
    // eslint-disable-next-line no-console
    console.error(errorState)
    return <ErrorScreen />
  }

  return <LoadingScreen />
}

export default BaseComponent
