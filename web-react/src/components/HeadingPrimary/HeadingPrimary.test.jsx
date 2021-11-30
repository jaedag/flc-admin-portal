import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { HeadingPrimary } from './HeadingPrimary'

afterEach(cleanup)

it('renders', () => {
  const { asFragment } = render(<HeadingPrimary>Heading</HeadingPrimary>)
  expect(asFragment()).toMatchSnapshot()
})
