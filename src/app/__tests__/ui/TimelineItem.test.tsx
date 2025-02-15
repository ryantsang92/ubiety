import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import TimelineItem from '@/app/ui/TimelineItem'
import { describe } from 'node:test'
import { Category, Status } from '@/app/lib/types'
 
describe('TimelineItem', () => {
  it('renders a TimelineItem component', () => {
    render(
      <TimelineItem
        name="test"
        photoUrl="https://example.com"
        category={Category.FAMILY}
        intervals={[[1, 2], [3, 4]]}
        currentStatus={Status.PRESENT}
      />
    )
 
    expect(screen.getByTestId('avatar')).toBeInTheDocument()
    expect(screen.getByTestId('intervals')).toBeInTheDocument()
    expect(screen.getByAltText('test')).toBeInTheDocument()
  })
  it('renders a TimelineItem component with a family avatar', () => {
    render(
      <TimelineItem
        name="test"
        photoUrl={null}
        category={Category.FAMILY}
        intervals={[[1, 2], [3, 4]]}
        currentStatus={Status.PRESENT}
      />
    )
 
    expect(screen.getByTestId('avatar')).toBeInTheDocument()
    expect(screen.getByTestId('intervals')).toBeInTheDocument()
    expect(screen.getByTestId('GroupIcon')).toBeInTheDocument()
  })
  it ('renders a TimelineItem component with a person avatar', () => {
    render(
      <TimelineItem
        name="test"
        photoUrl={null}
        category={Category.VISITOR}
        intervals={[[1, 2], [3, 4]]}
        currentStatus={Status.PRESENT}
      />
    )
 
    expect(screen.getByTestId('avatar')).toBeInTheDocument()
    expect(screen.getByTestId('intervals')).toBeInTheDocument()
    expect(screen.getByTestId('PersonIcon')).toBeInTheDocument()
  })
  it('renders a TimelineItem component with a question mark avatar', () => {
    render(
      <TimelineItem
        name="test"
        photoUrl={null}
        category={null}
        intervals={[[1, 2], [3, 4]]}
        currentStatus={Status.PRESENT}
      />
    )
 
    expect(screen.getByTestId('avatar')).toBeInTheDocument()
    expect(screen.getByTestId('intervals')).toBeInTheDocument()
    expect(screen.getByTestId('QuestionMarkIcon')).toBeInTheDocument()
  })
})
