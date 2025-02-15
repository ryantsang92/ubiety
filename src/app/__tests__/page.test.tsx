import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('page', () => {
  it('renders a page component', () => {
    render(
      <Home />
    )

    expect(screen.getByText('Presence Timeline'))
    expect(screen.getByTestId('presence-timeline')).toBeInTheDocument()
  })
})
