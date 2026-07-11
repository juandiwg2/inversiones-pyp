import { describe, expect, it } from 'vitest'
import { parseUtmFromSearch } from './utm'

describe('parseUtmFromSearch', () => {
  it('extracts all recognized utm_* parameters', () => {
    const result = parseUtmFromSearch(
      '?utm_source=google&utm_medium=cpc&utm_campaign=verano&utm_term=prestamos&utm_content=banner1',
    )
    expect(result).toEqual({
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: 'verano',
      utmTerm: 'prestamos',
      utmContent: 'banner1',
    })
  })

  it('returns an empty object when there are no utm parameters', () => {
    expect(parseUtmFromSearch('')).toEqual({})
    expect(parseUtmFromSearch('?ref=other&foo=bar')).toEqual({})
  })

  it('ignores unrelated query parameters and only keeps utm_* ones', () => {
    const result = parseUtmFromSearch('?utm_source=meta&gclid=abc123')
    expect(result).toEqual({ utmSource: 'meta' })
  })

  it('omits keys for utm parameters that are present but empty', () => {
    const result = parseUtmFromSearch('?utm_source=&utm_medium=email')
    expect(result).toEqual({ utmMedium: 'email' })
  })
})
