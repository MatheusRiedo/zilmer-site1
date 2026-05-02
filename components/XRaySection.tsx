'use client'

import { useRef, useState, useCallback } from 'react'
import styles from './XRaySection.module.css'
import { useLocale } from 'next-intl'
import { cdnUrl } from '@/lib/assets'

export default function XRaySection() {
  const locale = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  const mask = isHovering
    ? `radial-gradient(circle 150px at ${cursor.x}px ${cursor.y}px, black 0%, black 60%, transparent 100%)`
    : 'none'

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Left: text */}
        <div className={styles.textSide}>
          <div className={styles.tagline}>{locale === 'en' ? 'ZILMER TECHNOLOGY' : locale === 'es' ? 'TECNOLOGÍA ZILMER' : 'TECNOLOGIA ZILMER'}</div>
          <h2 className={styles.headline}>
            {locale === 'en' ? 'PRECISION' : locale === 'es' ? 'INGENIERÍA' : 'ENGENHARIA'}<br />
            <span className={styles.accentWord}>{locale === 'en' ? 'ENGINEERING' : locale === 'es' ? 'DE PRECISIÓN' : 'DE PRECISÃO'}</span>
          </h2>
          <p className={styles.subtitle}>
            {locale === 'en'
              ? 'Each transformer is engineered with absolute technical rigour. Internal components selected to the millimetre, tested under the most demanding standards to guarantee decades of reliable operation.'
              : locale === 'es'
              ? 'Cada transformador es diseñado con rigor técnico absoluto. Componentes internos seleccionados al milímetro, probados bajo las normas más exigentes para garantizar décadas de operación confiable.'
              : 'Cada transformador é projetado com rigor técnico absoluto. Componentes internos selecionados ao milímetro, testados sob as normas mais exigentes para garantir décadas de operação confiável.'}
          </p>

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>60+</span>
              <span className={styles.statLabel}>{locale === 'en' ? 'years of experience' : locale === 'es' ? 'años de experiencia' : 'anos de experiência'}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>ISO</span>
              <span className={styles.statLabel}>{locale === 'en' ? 'international certification' : locale === 'es' ? 'certificación internacional' : 'certificação internacional'}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>{locale === 'en' ? 'factory tested' : locale === 'es' ? 'probado en fábrica' : 'testado em fábrica'}</span>
            </div>
          </div>
        </div>

        {/* Right: xray viewer */}
        <div className={styles.viewerSide}>
          <div
            ref={containerRef}
            className={`${styles.viewer} ${isHovering ? styles.viewerActive : ''}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* External image (base layer) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cdnUrl("/images/xray/tco-interno.jpg")}
              alt="Transformador externo"
              className={styles.imgBase}
              draggable={false}
            />

            {/* Internal image (revealed layer) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cdnUrl("/images/xray/tco-externo.jpg")}
              alt="Transformador interno - raio-x"
              className={styles.imgReveal}
              style={{ WebkitMaskImage: mask, maskImage: mask }}
              draggable={false}
            />

            {/* Reticle overlay — follows cursor */}
            <div
              className={`${styles.reticle} ${isHovering ? styles.reticleVisible : ''}`}
              style={
                {
                  '--rx': `${cursor.x}px`,
                  '--ry': `${cursor.y}px`,
                } as React.CSSProperties
              }
            />

            {/* Corner scan-lines decoration */}
            <div className={styles.cornerTL} />
            <div className={styles.cornerTR} />
            <div className={styles.cornerBL} />
            <div className={styles.cornerBR} />

            {/* Scan line animation */}
            <div className={`${styles.scanLine} ${isHovering ? styles.scanLineActive : ''}`} />

          </div>
        </div>
      </div>
    </section>
  )
}
