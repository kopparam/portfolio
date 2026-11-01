import { describe, expect, test } from 'bun:test'

import { formatDate } from './formatDate'

describe('formatDate', () => {
  test('spells out the month', () => {
    expect(formatDate('2024-03-07')).toBe('March 7, 2024')
  })

  // Article dates have no time, so they must not slip a day in timezones
  // behind UTC.
  test('keeps the date in UTC at the edges of a year', () => {
    expect(formatDate('2023-01-01')).toBe('January 1, 2023')
    expect(formatDate('2023-12-31')).toBe('December 31, 2023')
  })
})
