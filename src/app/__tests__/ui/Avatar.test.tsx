import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Avatar from '@/app/ui/Avatar'
import { describe } from 'node:test'
import { Status } from '@/app/lib/types'

describe('Avatar', () => {
  it('renders an Avatar component', () => {
    render(
      <Avatar
        name="test"
        currentStatus={Status.PRESENT}
      />
    )

    expect(screen.getByTestId('avatar-parent')).toBeInTheDocument()
  })
})
