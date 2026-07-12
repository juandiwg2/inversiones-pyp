import { BUSINESS_RULES } from '../../config/business-rules'
import { ZONA_OESTE_LABEL } from '../../config/locations'
import { SECTION_IDS } from '../../lib/sectionIds'
import { AccordionItem } from '../ui/AccordionItem'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Faq.module.css'

const FAQ_ITEMS = [
  {
    question: '¿Quiénes pueden solicitar?',
    answer:
      'Comerciantes, emprendedores y trabajadores independientes mayores de 18 años, con actividad comercial y capacidad de pago.',
  },
  {
    question: '¿Qué ingresos necesito demostrar?',
    answer: 'Ingresos que respalden tu actividad comercial. Se evalúan según la información que nos compartas.',
  },
  {
    question: '¿Qué antigüedad laboral o comercial solicitan?',
    answer: 'Contar con una actividad comercial en marcha. La antigüedad se evalúa según cada caso.',
  },
  {
    question: '¿Qué montos manejan?',
    answer: `Desde $${BUSINESS_RULES.minRequestedAmount.toLocaleString('es-AR')} hasta $${BUSINESS_RULES.maxRequestedAmount.toLocaleString('es-AR')}, según la evaluación de cada solicitud.`,
  },
  {
    question: '¿En qué localidades trabajan?',
    answer: `Atendemos ${ZONA_OESTE_LABEL}.`,
  },
  {
    question: '¿Qué modalidades de pago existen?',
    answer: 'Actualmente se evalúan opciones de pago diario o semanal, según cada caso.',
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
