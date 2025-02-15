import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import PresenceTimeline from '@/app/ui/PresenceTimeline'

describe('PresenceTimeline', () => {
  it('renders a PresenceTimeline component', () => {
    render(
      <PresenceTimeline
        presenceData={{
          "1": {
            current_status: "present",
            presence_intervals: [[1, 2], [3, 4]]
          }
        }}
        profileData={[{
          uid: 1,
          name: "test",
          photo_url: "https://example.com",
          category: null,
          created_at: 1
        }]}
      />
    )

    expect(screen.getByTestId('timeline-item-1')).toBeInTheDocument()
    expect(screen.getByTestId('min-timestamp')).toBeInTheDocument()
    expect(screen.getByTestId('current-timestamp')).toBeInTheDocument()
  })
})
