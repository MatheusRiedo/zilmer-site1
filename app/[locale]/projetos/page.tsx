'use client'

import Image from 'next/image'
import { Link } from '@/i18n/routing'
import styles from './page.module.css'

const projetos = [
  {
    id: '1',
    title: 'Projeto em Operação - Hidrelétrica',
    description: 'Transformadores de força para sistema de geração de energia hidrelétrica continuam operando com máxima eficiência e confiabilidade.',
    image: '/images/projetos/projeto-1.jpeg',
    slug: 'projeto-hidreletrica',
    date: '2024-01-15',
  },
  {
    id: '2',
    title: 'Novo Projeto Aplicado - Subestação Industrial',
    description: 'Solução completa em transformadores para subestação de grande porte recém-instalada e em fase de testes.',
    image: '/images/projetos/projeto-1.jpeg',
    slug: 'projeto-subestacao',
    date: '2024-02-20',
  },
  {
    id: '3',
    title: 'Projeto em Operação - Mineração',
    description: 'Transformadores robustos para operação em ambiente de mineração mantendo alta performance e durabilidade.',
    image: '/images/projetos/projeto-1.jpeg',
    slug: 'projeto-mineracao',
    date: '2024-01-10',
  },
]

export default function ProjetosPage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Projetos</h1>
          <p className={styles.subtitle}>
            Acompanhe nossos projetos em operação e as novidades sobre instalações recentes.
          </p>
        </div>

        <div className={styles.grid}>
          {projetos.map((projeto) => (
            <article key={projeto.id} className={styles.card}>
              <Link href={`/projetos/${projeto.slug}`} className={styles.cardLink}>
                <div className={styles.imageContainer}>
                  <Image
                    src={projeto.image}
                    alt={projeto.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{projeto.title}</h2>
                  <p className={styles.cardDescription}>{projeto.description}</p>
                  <span className={styles.readMore}>Leia mais →</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
