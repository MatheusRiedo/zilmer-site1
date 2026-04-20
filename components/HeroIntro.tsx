'use client'

import styles from './HeroIntro.module.css'
import { useLocale } from 'next-intl'

export default function HeroIntro() {
  const locale = useLocale()
  const isEn = locale === 'en'
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.grid} />
      </div>

      <div className={styles.content}>
        <div className={styles.logoWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logoaba4.png"
            alt="Zilmer Transformadores"
            className={styles.logo}
          />
        </div>

        <div className={styles.divider} />

        <p className={styles.tagline}>
          {isEn ? 'Power & Instrument Transformers' : 'Transformadores de Potência & Instrumentos'}
        </p>
      </div>

      <a href="#areas" className={styles.scrollCue} aria-label={isEn ? 'Scroll down' : 'Rolar para baixo'}>
        <span className={styles.chevron} />
      </a>
    </section>
  )
}
