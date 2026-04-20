'use client'

import { useState } from 'react'
import { Link } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { useTransition } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)

  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const isEn = locale === 'en'

  const toggleLanguage = () => {
    const newLocale = isEn ? 'pt' : 'en'
    startTransition(() => {
      router.replace(pathname, { locale: newLocale } as any)
    })
  }

  const close = () => setIsMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img src="/logoaba4.png" alt="Zilmer Transformadores" />
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link href="/" onClick={close}>
            {isEn ? 'HOME' : 'INÍCIO'}
          </Link>

          <div
            className={styles.dropdown}
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <span>{isEn ? 'ABOUT' : 'SOBRE'}</span>
            {isAboutOpen && (
              <>
                <div className={styles.dropdownBridge}></div>
                <div className={styles.dropdownMenu}>
                  <Link href="/sobre" onClick={close}>
                    {isEn ? 'ABOUT US' : 'SOBRE NÓS'}
                  </Link>
                  <Link href="/sobre/historico" onClick={close}>
                    {isEn ? 'HISTORY' : 'HISTÓRICO'}
                  </Link>
                  <Link href="/sobre/clientes" onClick={close}>
                    {isEn ? 'CLIENTS' : 'CLIENTES'}
                  </Link>
                  <Link href="/sobre/certificados" onClick={close}>
                    {isEn ? 'CERTIFICATES' : 'CERTIFICADOS'}
                  </Link>
                </div>
              </>
            )}
          </div>

          <div
            className={styles.dropdown}
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <span>{isEn ? 'PRODUCTS' : 'PRODUTOS'}</span>
            {isProductsOpen && (
              <>
                <div className={styles.dropdownBridge}></div>
                <div className={styles.dropdownMenu}>
                  <Link href="/produtos/transformadores-oleo" onClick={close}>
                    {isEn ? 'OIL-IMMERSED TRANSFORMERS' : 'TRANSFORMADORES IMERSOS EM ÓLEO'}
                  </Link>
                  <Link href="/produtos/transformadores-seco" onClick={close}>
                    {isEn ? 'DRY-TYPE TRANSFORMERS' : 'TRANSFORMADORES A SECO'}
                  </Link>
                  <Link href="/produtos/transformadores-instrumentos" onClick={close}>
                    {isEn ? 'INSTRUMENT TRANSFORMERS' : 'TRANSFORMADORES PARA INSTRUMENTOS'}
                  </Link>
                </div>
              </>
            )}
          </div>

          <Link href="/contato" onClick={close}>
            {isEn ? 'CONTACT' : 'CONTATO'}
          </Link>

          <button
            onClick={toggleLanguage}
            disabled={isPending}
            aria-label={isEn ? 'Mudar para Português' : 'Switch to English'}
            className={styles.langBtn}
          >
            {isEn ? 'PT' : 'EN'}
          </button>
        </nav>

        <div className={styles.headerRight}>
          <button
            onClick={toggleLanguage}
            disabled={isPending}
            aria-label={isEn ? 'Mudar para Português' : 'Switch to English'}
            className={styles.langBtn}
          >
            {isEn ? 'PT' : 'EN'}
          </button>

          <button
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

