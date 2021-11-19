import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PlusSign from './PlusSign'

afterEach(cleanup)

it('renders', () => {
  const { asFragment } = render(<PlusSign />)
  expect(asFragment()).toMatchSnapshot()
})
