import type { UtmValues } from '../schemas/utm.schema'

const PARAM_TO_KEY: Record<string, keyof UtmValues> = {
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_term: 'utmTerm',
  utm_content: 'utmContent',
}

const STORAGE_KEY = 'pyp_utm'

/** Parsea los parámetros utm_* de un query string. No toca el DOM: testeable en aislamiento. */
export function parseUtmFromSearch(search: string): UtmValues {
  const params = new URLSearchParams(search)
  const result: UtmValues = {}
  for (const [param, key] of Object.entries(PARAM_TO_KEY)) {
    const value = params.get(param)
    if (value) {
      result[key] = value
    }
  }
  return result
}

/**
 * Captura los UTM de la URL actual y los persiste en sessionStorage (sin datos
 * personales) para que sobrevivan la navegación dentro de la misma sesión. Si
 * la URL actual no trae UTM nuevos, devuelve los que ya estaban guardados.
 */
export function captureAndPersistUtm(
  location: Pick<Location, 'search' | 'pathname'> = window.location,
): UtmValues & { landingPath?: string } {
  const parsed = parseUtmFromSearch(location.search)

  if (Object.keys(parsed).length > 0) {
    const toStore = { ...parsed, landingPath: location.pathname }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toStore))
    return toStore
  }

  const stored = sessionStorage.getItem(STORAGE_KEY)
  if (!stored) return {}

  try {
    return JSON.parse(stored) as UtmValues & { landingPath?: string }
  } catch {
    return {}
  }
}
