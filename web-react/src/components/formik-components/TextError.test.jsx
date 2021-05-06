import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TextError from './TextError'

afterEach(cleanup)

it('renders', () => {
  const { asFragment } = render(<TextError>This is an error</TextError>)
  expect(asFragment()).toMatchSnapshot()
})
