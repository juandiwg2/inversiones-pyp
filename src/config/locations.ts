/**
 * Localidades admitidas (Zona Oeste del Gran Buenos Aires). Editable sin tocar
 * lógica de negocio: agregar/quitar localidades acá alcanza para cambiar el
 * área de cobertura.
 *
 * `OUT_OF_ZONE_VALUE` es la opción que se muestra en el formulario para quien
 * vive fuera de la zona admitida. Es un valor de formulario válido (no rompe la
 * validación), pero la clasificación automática lo trata como zona no admitida.
 */
export interface LocalityOption {
  value: string
  label: string
  partido: string
}

export const ZONA_OESTE_LABEL = 'Zona Oeste del Gran Buenos Aires'

export const OUT_OF_ZONE_VALUE = 'fuera_de_zona_oeste'

export const ALLOWED_LOCALITIES: readonly LocalityOption[] = [
  { value: 'moron', label: 'Morón', partido: 'Morón' },
  { value: 'haedo', label: 'Haedo', partido: 'Morón' },
  { value: 'castelar', label: 'Castelar', partido: 'Morón' },
  { value: 'el_palomar', label: 'El Palomar', partido: 'Morón' },

  { value: 'ituzaingo', label: 'Ituzaingó', partido: 'Ituzaingó' },
  { value: 'villa_udaondo', label: 'Villa Udaondo', partido: 'Ituzaingó' },

  { value: 'hurlingham', label: 'Hurlingham', partido: 'Hurlingham' },
  { value: 'villa_tesei', label: 'Villa Tesei', partido: 'Hurlingham' },
  { value: 'william_morris', label: 'William Morris', partido: 'Hurlingham' },

  { value: 'merlo', label: 'Merlo', partido: 'Merlo' },
  { value: 'san_antonio_de_padua', label: 'San Antonio de Padua', partido: 'Merlo' },
  { value: 'libertad', label: 'Libertad', partido: 'Merlo' },
  { value: 'pontevedra', label: 'Pontevedra', partido: 'Merlo' },

  { value: 'moreno', label: 'Moreno', partido: 'Moreno' },
  { value: 'paso_del_rey', label: 'Paso del Rey', partido: 'Moreno' },
  { value: 'francisco_alvarez', label: 'Francisco Álvarez', partido: 'Moreno' },
  { value: 'trujui', label: 'Trujuí', partido: 'Moreno' },

  { value: 'caseros', label: 'Caseros', partido: 'Tres de Febrero' },
  { value: 'ciudadela', label: 'Ciudadela', partido: 'Tres de Febrero' },
  { value: 'santos_lugares', label: 'Santos Lugares', partido: 'Tres de Febrero' },
  { value: 'villa_bosch', label: 'Villa Bosch', partido: 'Tres de Febrero' },
  { value: 'saenz_pena', label: 'Sáenz Peña', partido: 'Tres de Febrero' },
  { value: 'martin_coronado', label: 'Martín Coronado', partido: 'Tres de Febrero' },

  { value: 'san_justo', label: 'San Justo', partido: 'La Matanza' },
  { value: 'ramos_mejia', label: 'Ramos Mejía', partido: 'La Matanza' },
  { value: 'isidro_casanova', label: 'Isidro Casanova', partido: 'La Matanza' },
  { value: 'gregorio_de_laferrere', label: 'Gregorio de Laferrere', partido: 'La Matanza' },
  { value: 'gonzalez_catan', label: 'González Catán', partido: 'La Matanza' },
  { value: 'villa_luzuriaga', label: 'Villa Luzuriaga', partido: 'La Matanza' },
  { value: 'la_tablada', label: 'La Tablada', partido: 'La Matanza' },
  { value: 'tapiales', label: 'Tapiales', partido: 'La Matanza' },
] as const

export const ALLOWED_LOCALITY_VALUES: readonly string[] = ALLOWED_LOCALITIES.map((l) => l.value)

/** Todos los valores aceptables por el formulario, incluida la opción "fuera de zona". */
export const LOCALITY_FORM_VALUES: readonly string[] = [...ALLOWED_LOCALITY_VALUES, OUT_OF_ZONE_VALUE]

export function isLocalityAllowed(value: string): boolean {
  return ALLOWED_LOCALITY_VALUES.includes(value)
}
