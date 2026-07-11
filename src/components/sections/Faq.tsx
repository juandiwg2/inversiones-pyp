import { BUSINESS_RULES } from '../../config/business-rules'
import { ZONA_OESTE_LABEL } from '../../config/locations'
import { SECTION_IDS } from '../../lib/sectionIds'
import { AccordionItem } from '../ui/AccordionItem'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Faq.module.css'

const FAQ_ITEMS = [
  {
    question: '¿Qué montos manejan?',
    answer: `Trabajamos con montos desde $${BUSINESS_RULES.minRequestedAmount.toLocaleString('es-AR')} hasta $${BUSINESS_RULES.maxRequestedAmount.toLocaleString('es-AR')}. El monto final se define según la evaluación de cada solicitud.`,
  },
  {
    question: '¿Quiénes pueden solicitar?',
    answer:
      'Personas mayores de 18 años, con una actividad laboral o comercial y capacidad para afrontar los pagos. Toda solicitud queda sujeta a revisión manual.',
  },
  {
    question: '¿Qué documentación solicitan?',
    answer:
      'El formulario inicial pide solo nombre, fecha de nacimiento, monto, actividad y modalidad de pago. La documentación adicional se solicita más adelante, durante la conversación por WhatsApp.',
  },
  {
    question: '¿Cuánto demora la respuesta?',
    answer:
      'El tiempo puede variar según cada caso. Después de completar el formulario continuás por WhatsApp para el análisis individual de tu solicitud.',
  },
  {
    question: '¿Trabajan en todo Gran Buenos Aires?',
    answer: `Por el momento atendemos ${ZONA_OESTE_LABEL}.`,
  },
  {
    question: '¿Las condiciones son iguales para todos?',
    answer: 'No. La modalidad, el monto y las condiciones se definen según el análisis de cada caso particular.',
  },
  {
    question: '¿Qué modalidades de pago existen?',
    answer:
      'Podés elegir modalidad diaria, semanal, quincenal o mensual al completar el formulario. Las condiciones definitivas se informan antes de avanzar.',
  },
  {
    question: '¿Completar el formulario garantiza la aceptación?',
    answer:
      'No. Enviar la solicitud no implica aprobación ni genera ningún compromiso: toda solicitud queda sujeta a revisión manual.',
  },
]

export function Faq() {
  return (
    <section id={SECTION_IDS.faq} className={styles.section}>
      <Container>
        <SectionHeading eyebrow="Dudas frecuentes" title="Preguntas frecuentes" tone="onDark" />
        <div className={styles.list}>
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.question} question={item.question} groupName="faq" tone="onDark">
              <p>{item.answer}</p>
            </AccordionItem>
          ))}
        </div>
      </Container>
    </section>
  )
}
