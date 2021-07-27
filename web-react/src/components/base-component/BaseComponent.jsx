import React from 'react'
import ErrorScreen from './ErrorScreen'
import LoadingScreen from './LoadingScreen'

const BaseComponent = (props) => {
  const { loadingState, errorState } = props

  if (loadingState) {
    return <LoadingScreen />
  } else if (errorState) {
    // eslint-disable-next-line no-console
    console.error(errorState)
    return <ErrorScreen />
  } else {
    return <>{props.children}</>
  }
}

export default BaseComponent
