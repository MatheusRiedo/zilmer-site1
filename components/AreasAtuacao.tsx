'use client'

import { useState } from 'react'
import { Link } from '@/i18n/routing'
import styles from './AreasAtuacao.module.css'
import areasDataPtJson from '@/data/areas.json'
import areasDataEnJson from '@/data/areas.en.json'
import { useLocale } from 'next-intl'

type AreasData = {
  [key: string]: {
    title: string
    aplicacao: {
      title: string
      description: string
      image: string
      heroImage?: string
      heroDescription?: string
    }
    solucao: {
      title: string
      problem: string
      melhora: string
      essencial: string
    }
  }
}

const orderedSlugs = [
  'transporte',
  'hidreletrica',
  'mineracao',
  'subestacoes',
  'energias-renovaveis',
  'controle-medicao',
]

function stripHtml(text: string | undefined): string {
  if (!text) return ''
  return text.replace(/<[^>]+>/g, '').trim()
}

export default function AreasAtuacao() {
  const locale = useLocale()
  const isEn = locale === 'en'
  const areasData = (isEn ? areasDataEnJson : areasDataPtJson) as AreasData
  const availableAreas = orderedSlugs
    .map((slug) => ({ slug, data: areasData[slug] }))
    .filter((item) => !!item.data)

  const [activeSlug, setActiveSlug] = useState<string>(orderedSlugs[0])

  if (availableAreas.length === 0) return null

  const activeArea =
    availableAreas.find((item) => item.slug === activeSlug)?.data ??
    availableAreas[0].data

  const heroImage =
    (activeArea.aplicacao as any).heroImage || activeArea.aplicacao.image
  const heroDescription =
    stripHtml((activeArea.aplicacao as any).heroDescription) ||
    stripHtml(activeArea.aplicacao.description)

  return (
    <section className={styles.areasSection}>
      <div className={styles.areasContainer}>
        <div className={styles.backgroundImageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={activeArea.title}
            className={styles.backgroundImage}
          />
          <div className={styles.imageOverlay} />
        </div>

        <div className={styles.contentWrapper}>
          <div className="container">

            {/* ── Section header (static) ── */}
            <header className={styles.sectionHeader}>
              <span className={styles.eyebrow}>{isEn ? 'Market Segments' : 'Segmentos de Mercado'}</span>
              <h2 className={styles.sectionHeading}>{isEn ? 'Areas of Application' : 'Áreas de Atuação'}</h2>
              <p className={styles.sectionSubtitle}>
                {isEn ? 'High-performance transformers for the main industrial sectors' : 'Transformadores de alta performance para os principais setores da indústria'}
              </p>
              <div className={styles.headerDivider} />
            </header>

            {/* ── Area tabs ── */}
            <nav className={styles.tabsNav} aria-label="Áreas de atuação">
              {availableAreas.map(({ slug, data }) => (
                <button
                  key={slug}
                  onMouseEnter={() => setActiveSlug(slug)}
                  onClick={() => setActiveSlug(slug)}
                  className={`${styles.tab} ${slug === activeSlug ? styles.tabActive : ''}`}
                >
                  {data.title}
                </button>
              ))}
            </nav>

            {/* ── Active area content ── */}
            <div className={styles.areaContent}>
              <div className={styles.areaMain}>
                <h3 className={styles.areaTitle}>{activeArea.title}</h3>
                <p className={styles.areaDescription}>{heroDescription}</p>

                <div className={styles.solutionBlock}>
                  <p>{activeArea.solucao.problem}</p>
                  <p>{activeArea.solucao.melhora}</p>
                  <p>{activeArea.solucao.essencial}</p>
                </div>

                <Link href={`/${activeSlug}`} className={styles.primaryButton}>
                  {isEn ? 'View area details' : 'Ver detalhes da área'}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
