import '@testing-library/jest-dom'
import {getDateTime, beautifyStatus} from '@/app/lib/utils'

describe('getDateTime', () => {
  it('returns a formatted date and time', () => {
    const timestamp = 1737673603498;
    expect(getDateTime(timestamp)).toBe('1/23/2025, 5:06:43 PM')
  })
})

describe('beautifyStatus', () => {
  it('returns a formatted status', () => {
    expect(beautifyStatus('present')).toBe('Present')
    expect(beautifyStatus('absent')).toBe('Absent')
  })
})
