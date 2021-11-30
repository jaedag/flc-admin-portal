import React from 'react'

const HeadingSecondary = (props) => {
  const { children, ...rest } = props
  return (
    <h6 className="text-secondary" {...rest}>
      {children}
    </h6>
  )
}

export default HeadingSecondary
