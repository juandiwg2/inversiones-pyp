import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { AboutUs } from '../components/sections/AboutUs'
import { Faq } from '../components/sections/Faq'
import { Hero } from '../components/sections/Hero'
import { HowItWorks } from '../components/sections/HowItWorks'
import { Requirements } from '../components/sections/Requirements'
import { WhyChooseUs } from '../components/sections/WhyChooseUs'
import { PrequalificationForm } from '../features/prequalification/PrequalificationForm'
import { SECTION_IDS } from '../lib/sectionIds'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <>
      <Hero />
      <AboutUs />
      <HowItWorks />
      <WhyChooseUs />
      <Requirements />
      <Faq />
      <section id={SECTION_IDS.form} className={styles.formSection}>
        <Container>
          <SectionHeading
            eyebrow="Precalificación"
            title="Solicitar evaluación"
            description="Completá tus datos. Enviar la solicitud no implica aprobación ni genera ningún compromiso."
            tone="onDark"
          />
          <div className={styles.trustNote}>
            <p className={styles.trustTitle}>Tu información se utiliza únicamente para evaluar la solicitud</p>
            <p className={styles.trustBody}>
              Los datos ingresados se guardan de forma segura y se utilizan para analizar el caso y continuar el
              contacto por WhatsApp.
            </p>
          </div>
          <PrequalificationForm />
        </Container>
      </section>
    </>
  )
}
