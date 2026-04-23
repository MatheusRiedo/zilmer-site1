'use client'

import Image from 'next/image'
import { Link } from '@/i18n/routing'
import styles from './page.module.css'
import { useLocale } from 'next-intl'
import { cdnUrl } from '@/lib/assets'

const projetosPt = [
  {
    id: '1',
    title: 'Projeto em Operação - Hidrelétrica',
    description: 'Transformadores de força para sistema de geração de energia hidrelétrica continuam operando com máxima eficiência e confiabilidade.',
    image: '/images/projetos/projeto-1.jpeg',
    slug: 'projeto-hidreletrica',
  },
  {
    id: '2',
    title: 'Novo Projeto Aplicado - Subestação Industrial',
    description: 'Solução completa em transformadores para subestação de grande porte recém-instalada e em fase de testes.',
    image: '/images/projetos/projeto-1.jpeg',
    slug: 'projeto-subestacao',
  },
  {
    id: '3',
    title: 'Projeto em Operação - Mineração',
    description: 'Transformadores robustos para operação em ambiente de mineração mantendo alta performance e durabilidade.',
    image: '/images/projetos/projeto-1.jpeg',
    slug: 'projeto-mineracao',
  },
]

const projetosEn = [
  {
    id: '1',
    title: 'Project in Operation – Hydropower',
    description: 'Power transformers for a hydropower generation system continue operating with maximum efficiency and reliability.',
    image: '/images/projetos/projeto-1.jpeg',
    slug: 'projeto-hidreletrica',
  },
  {
    id: '2',
    title: 'New Applied Project – Industrial Substation',
    description: 'Complete transformer solution for a large-scale substation recently installed and under commissioning.',
    image: '/images/projetos/projeto-1.jpeg',
    slug: 'projeto-subestacao',
  },
  {
    id: '3',
    title: 'Project in Operation – Mining',
    description: 'Robust transformers for operation in a mining environment, maintaining high performance and durability.',
    image: '/images/projetos/projeto-1.jpeg',
    slug: 'projeto-mineracao',
  },
]

export default function ProjetosPage() {
  const locale = useLocale()
  const isEn = locale === 'en'
  const projetos = isEn ? projetosEn : projetosPt

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>{isEn ? 'Projects' : 'Projetos'}</h1>
          <p className={styles.subtitle}>
            {isEn
              ? 'Follow our projects in operation and the latest news on recent installations.'
              : 'Acompanhe nossos projetos em operação e as novidades sobre instalações recentes.'}
          </p>
        </div>

        <div className={styles.grid}>
          {projetos.map((projeto) => (
            <article key={projeto.id} className={styles.card}>
              <Link href={`/projetos/${projeto.slug}`} className={styles.cardLink}>
                <div className={styles.imageContainer}>
                  <Image
                    src={cdnUrl(projeto.image)}
                    alt={projeto.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{projeto.title}</h2>
                  <p className={styles.cardDescription}>{projeto.description}</p>
                  <span className={styles.readMore}>{isEn ? 'Read more →' : 'Leia mais →'}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
