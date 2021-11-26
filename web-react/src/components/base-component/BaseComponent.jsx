import React from 'react'
import ErrorScreen from './ErrorScreen'
import LoadingScreen from './LoadingScreen'

const BaseComponent = (props) => {
  const { loading, error, data, placeholder } = props

  if (data || placeholder) {
    return <>{props.children}</>
  } else if (loading) {
    return <LoadingScreen />
  } else if (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return <ErrorScreen />
  }

  return <LoadingScreen />
}

export default BaseComponent
