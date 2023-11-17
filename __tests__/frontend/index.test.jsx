import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../../src/app/page'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const el = screen.getByText(/HomePage/i)

    expect(el).toBeInTheDocument()
  })
})
