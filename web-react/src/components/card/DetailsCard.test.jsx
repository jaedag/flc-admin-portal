import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DetailsCard from './DetailsCard'

afterEach(cleanup)

it('renders', () => {
  const { asFragment } = render(<DetailsCard>Heading</DetailsCard>)
  expect(asFragment()).toMatchSnapshot()
})
