import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button, LinkButton } from '../../components/ui/Button'
import { WhatsAppIcon } from '../../components/ui/icons'
import { BUSINESS_RULES } from '../../config/business-rules'
import { MODALITY_OPTIONS } from '../../config/form-options'
import { LEGAL_TEXT } from '../../config/legal'
import { ALLOWED_LOCALITIES, OUT_OF_ZONE_VALUE, type LocalityOption } from '../../config/locations'
import { buildWhatsappUrl } from '../../config/whatsapp'
import { trackEvent } from '../../lib/analytics'
import { captureAndPersistUtm } from '../../lib/utm'
import { calculateAge } from '../../schemas/prequalification.schema'
import { FormField } from './formFields/FormField'
import { INITIAL_SIMPLIFIED_VALUES, type SimplifiedFieldErrors, type SimplifiedRawValues } from './simplifiedFormValues'
import { simplifiedRequestSchema } from './simplifiedRequestSchema'
import styles from './PrequalificationForm.module.css'

const LOCALITY_GROUPS = ALLOWED_LOCALITIES.reduce<Record<string, LocalityOption[]>>((acc, locality) => {
  const group = acc[locality.partido] ?? []
  group.push(locality)
  acc[locality.partido] = group
  return acc
}, {})

export function PrequalificationForm() {
  const [values, setValues] = useState<SimplifiedRawValues>(INITIAL_SIMPLIFIED_VALUES)
  const [errors, setErrors] = useState<SimplifiedFieldErrors>({})
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null)

  useEffect(() => {
    captureAndPersistUtm()
  }, [])

  function updateField<K extends keyof SimplifiedRawValues>(field: K, value: SimplifiedRawValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (whatsappUrl) return

    const parsed = simplifiedRequestSchema.safeParse(values)
    if (!parsed.success) {
      const nextErrors: SimplifiedFieldErrors = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path[0]
        if (typeof field === 'string' && !(field in nextErrors)) {
          nextErrors[field as keyof SimplifiedRawValues] = issue.message
        }
      }
      setErrors(nextErrors)
      return
    }

    setErrors({})
    trackEvent('prequalification_form_submit')

    const modalityLabel =
      MODALITY_OPTIONS.find((option) => option.value === parsed.data.preferredModality)?.label ??
      parsed.data.preferredModality
    const localityLabel =
      parsed.data.locality === OUT_OF_ZONE_VALUE
        ? 'Otra localidad (fuera de zona)'
        : (ALLOWED_LOCALITIES.find((option) => option.value === parsed.data.locality)?.label ?? parsed.data.locality)

    const url = buildWhatsappUrl({
      fullName: parsed.data.fullName,
      age: calculateAge(parsed.data.birthDate),
      monthlyIncome: parsed.data.monthlyIncome,
      seniority: parsed.data.seniority,
      requestedAmount: parsed.data.requestedAmount,
      locality: localityLabel,
      modalityLabel,
    })

    setWhatsappUrl(url)
    trackEvent('prequalification_whatsapp_redirect')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (whatsappUrl) {
    return (
      <div className={styles.readyPanel}>
        <WhatsAppIcon className={styles.readyIcon} />
        <h3 className={styles.readyTitle}>Te estamos llevando a WhatsApp</h3>
        <p className={styles.readyBody}>Si no se abrió automáticamente, continuá la conversación desde este botón.</p>
        <LinkButton
          href={whatsappUrl}
          variant="whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          icon={<WhatsAppIcon />}
        >
          Continuar por WhatsApp
        </LinkButton>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        <FormField id="fullName" label="Nombre completo" required error={errors.fullName}>
          {(describedBy) => (
            <input
              id="fullName"
              className={styles.input}
              value={values.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={describedBy}
              autoComplete="name"
            />
          )}
        </FormField>

        <FormField id="birthDate" label="Fecha de nacimiento" required error={errors.birthDate}>
          {(describedBy) => (
            <input
              id="birthDate"
              type="date"
              className={styles.input}
              value={values.birthDate}
              onChange={(e) => updateField('birthDate', e.target.value)}
              aria-invalid={Boolean(errors.birthDate)}
              aria-describedby={describedBy}
              autoComplete="bday"
            />
          )}
        </FormField>

        <FormField id="monthlyIncome" label="Ingresos aproximados" required error={errors.monthlyIncome}>
          {(describedBy) => (
            <input
              id="monthlyIncome"
              type="number"
              inputMode="numeric"
              min={0}
              className={styles.input}
              value={values.monthlyIncome}
              onChange={(e) => updateField('monthlyIncome', e.target.value)}
              aria-invalid={Boolean(errors.monthlyIncome)}
              aria-describedby={describedBy}
            />
          )}
        </FormField>

        <FormField
          id="seniority"
          label="Antigüedad laboral o comercial"
          required
          error={errors.seniority}
        >
          {(describedBy) => (
            <input
              id="seniority"
              className={styles.input}
              value={values.seniority}
              onChange={(e) => updateField('seniority', e.target.value)}
              aria-invalid={Boolean(errors.seniority)}
              aria-describedby={describedBy}
              placeholder="Ej: 2 años"
            />
          )}
        </FormField>

        <FormField
          id="requestedAmount"
          label="Monto a solicitar"
          required
          error={errors.requestedAmount}
          hint={`Entre $${BUSINESS_RULES.minRequestedAmount.toLocaleString('es-AR')} y $${BUSINESS_RULES.maxRequestedAmount.toLocaleString('es-AR')}`}
        >
          {(describedBy) => (
            <input
              id="requestedAmount"
              type="number"
              inputMode="numeric"
              min={BUSINESS_RULES.minRequestedAmount}
              max={BUSINESS_RULES.maxRequestedAmount}
              className={styles.input}
              value={values.requestedAmount}
              onChange={(e) => updateField('requestedAmount', e.target.value)}
              aria-invalid={Boolean(errors.requestedAmount)}
              aria-describedby={describedBy}
            />
          )}
        </FormField>

        <FormField id="locality" label="Localidad" required error={errors.locality}>
          {(describedBy) => (
            <select
              id="locality"
              className={styles.select}
              value={values.locality}
              onChange={(e) => updateField('locality', e.target.value)}
              aria-invalid={Boolean(errors.locality)}
              aria-describedby={describedBy}
            >
              <option value="">Seleccioná tu localidad</option>
              {Object.entries(LOCALITY_GROUPS).map(([partido, localities]) => (
                <optgroup key={partido} label={partido}>
                  {localities.map((locality) => (
                    <option key={locality.value} value={locality.value}>
                      {locality.label}
                    </option>
                  ))}
                </optgroup>
              ))}
              <option value={OUT_OF_ZONE_VALUE}>Otra localidad (fuera de zona)</option>
            </select>
          )}
        </FormField>

        <FormField
          id="preferredModality"
          label="Modalidad preferida para los pagos"
          required
          error={errors.preferredModality}
        >
          {(describedBy) => (
            <select
              id="preferredModality"
              className={styles.select}
              value={values.preferredModality}
              onChange={(e) => updateField('preferredModality', e.target.value)}
              aria-invalid={Boolean(errors.preferredModality)}
              aria-describedby={describedBy}
            >
              <option value="">Seleccioná una opción</option>
              {MODALITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </FormField>
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxRow} htmlFor="acceptedConsent">
          <input
            id="acceptedConsent"
            type="checkbox"
            className={styles.checkbox}
            checked={values.acceptedConsent}
            onChange={(e) => updateField('acceptedConsent', e.target.checked)}
            aria-invalid={Boolean(errors.acceptedConsent)}
            aria-describedby={errors.acceptedConsent ? 'acceptedConsent-error' : undefined}
          />
          <span className={styles.checkboxLabel}>{LEGAL_TEXT.combinedConsentStatement}</span>
        </label>
        {errors.acceptedConsent ? (
          <p id="acceptedConsent-error" className={styles.fieldError} role="alert">
            {errors.acceptedConsent}
          </p>
        ) : null}
      </div>

      <div className={styles.formFooter}>
        <Button type="submit" variant="primary" fullWidthOnMobile icon={<WhatsAppIcon />}>
          Solicitar evaluación
        </Button>
        <p className={styles.disclaimer}>
          {LEGAL_TEXT.dataUseNotice}{' '}
          <Link to="/politica-de-privacidad" className={styles.privacyLink}>
            Política de Privacidad
          </Link>
          .
        </p>
      </div>
    </form>
  )
}
