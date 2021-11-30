import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MinusSign from './MinusSign'

afterEach(cleanup)

it('renders', () => {
  const { asFragment } = render(<MinusSign />)
  expect(asFragment()).toMatchSnapshot()
})
