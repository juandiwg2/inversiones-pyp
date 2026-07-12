import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Enfoque } from '../components/sections/Enfoque'
import { Faq } from '../components/sections/Faq'
import { Hero } from '../components/sections/Hero'
import { HowItWorks } from '../components/sections/HowItWorks'
import { Requirements } from '../components/sections/Requirements'
import { TrustSignals } from '../components/sections/TrustSignals'
import { PrequalificationForm } from '../features/prequalification/PrequalificationForm'
import { SECTION_IDS } from '../lib/sectionIds'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustSignals />
      <Enfoque />
      <HowItWorks />
      <Requirements />
      <section id={SECTION_IDS.form} className={styles.formSection}>
        <Container>
          <SectionHeading
            eyebrow="Precalificación"
            title="Solicitar evaluación"
            description="Completá estos datos y continuá por WhatsApp."
          />
          <PrequalificationForm />
        </Container>
      </section>
      <Faq />
    </>
  )
}
