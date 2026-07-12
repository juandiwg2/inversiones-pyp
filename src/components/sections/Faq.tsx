import { BUSINESS_RULES } from '../../config/business-rules'
import { SECTION_IDS } from '../../lib/sectionIds'
import { AccordionItem } from '../ui/AccordionItem'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Faq.module.css'

const FAQ_ITEMS = [
  {
    question: '¿Qué montos manejan?',
    answer: `Desde $${BUSINESS_RULES.minRequestedAmount.toLocaleString('es-AR')} hasta $${BUSINESS_RULES.maxRequestedAmount.toLocaleString('es-AR')}, según la evaluación de cada solicitud.`,
  },
  {
    question: '¿Quiénes pueden solicitar?',
    answer: 'Personas mayores de 18 años, con trabajo o actividad y capacidad de pago.',
  },
  {
    question: '¿Qué modalidades de pago existen?',
    answer: 'Diaria, semanal, quincenal o mensual, según lo que se acuerde en cada caso.',
  },
  {
    question: '¿Completar el formulario garantiza la aprobación?',
    answer: 'No. Enviar la solicitud no implica aprobación: cada caso se revisa antes de continuar.',
  },
]

export function Faq() {
  return (
    <section id={SECTION_IDS.faq} className={styles.section}>
      <Container>
        <SectionHeading eyebrow="Dudas frecuentes" title="Preguntas frecuentes" />
        <div className={styles.list}>
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.question} question={item.question} groupName="faq">
              <p>{item.answer}</p>
            </AccordionItem>
          ))}
        </div>
      </Container>
    </section>
  )
}
