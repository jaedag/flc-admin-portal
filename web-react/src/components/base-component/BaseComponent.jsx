import React from 'react'
import ErrorScreen from './ErrorScreen'
import LoadingScreen from './LoadingScreen'

const BaseComponent = (props) => {
  const { loadingState, errorState, data, placeholder } = props

  if (data || placeholder) {
    return <>{props.children}</>
  } else if (loadingState) {
    return <LoadingScreen />
  } else if (errorState) {
    // eslint-disable-next-line no-console
    console.error(errorState)
    return <ErrorScreen />
  }

  return <LoadingScreen />
}

export default BaseComponent
