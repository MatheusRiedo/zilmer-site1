import styles from './page.module.css'
// @ts-ignore
import sobreDataJson from '@/data/sobre.json'

const sobreData = sobreDataJson as {
  historico: {
    title: string
    subtitle: string
    content: string
  }
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, '').trim()
}

function renderText(text: string | undefined | null) {
  if (!text) return null
  const plain = stripHtml(text)
  if (!plain) return null
  return (
    <>
      {plain.split('\n\n').filter(p => p.trim()).map((p, i) => (
        <p key={i}>{p.trim()}</p>
      ))}
    </>
  )
}

export default function HistoricoPage() {
  return (
    <section className={styles.page}>
      <div className="container">
        <h1>{sobreData.historico.title}</h1>
        <div className={styles.content}>
          <h2>{sobreData.historico.subtitle}</h2>
          {renderText(sobreData.historico.content)}
        </div>
      </div>
    </section>
  )
}

