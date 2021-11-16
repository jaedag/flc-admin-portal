import React from 'react'

export const HeadingPrimary = (props) => {
  const { children, ...rest } = props
  return <h3 {...rest}>{children}</h3>
}
