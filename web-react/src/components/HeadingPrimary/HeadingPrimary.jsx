import PlaceholderCustom from 'components/Placeholder'
import React from 'react'

export const HeadingPrimary = (props) => {
  const { children, loading, ...rest } = props
  return (
    <PlaceholderCustom as="h3" loading={loading}>
      <h3 {...rest}>{children}</h3>
    </PlaceholderCustom>
  )
}
