import Image from 'next/image'
import styles from './page.module.css'
import { cdnUrl } from '@/lib/assets'
// @ts-ignore
import sobreDataPt from '@/data/sobre.json'
// @ts-ignore
import sobreDataEn from '@/data/sobre.en.json'
import { getLocale } from 'next-intl/server'

// Adicione aqui os nomes dos arquivos de imagens dos certificados
// Coloque as imagens na pasta: public/images/certificados/
// Suporta PDF e imagens (JPG, PNG, etc.)
const certificados = [
  {
    file: 'CERTIFICADO ISO.pdf',
    title: 'Certificado ISO',
    type: 'pdf'
  },
  {
    file: 'CERTIFICADO LMP.pdf',
    title: 'Certificado LMP',
    type: 'pdf'
  },
  {
    file: 'CERTIFICADO PROELCO.pdf',
    title: 'Certificado PROELCO',
    type: 'pdf'
  },
]


// Helper para renderizar texto com ou sem HTML
function renderText(text: string | undefined | null) {
  if (!text) return <p></p>
  
  const hasHTML = /<[^>]+>/.test(text)
  
  if (hasHTML) {
    return <div dangerouslySetInnerHTML={{ __html: text }} />
  }
  
  return <p>{text}</p>
}

export default async function CertificadosPage() {
  const locale = await getLocale()
  const sobreData = (locale === 'en' ? sobreDataEn : sobreDataPt) as {
    certificados: { title: string; description: string }
  }
  const openPdfLabel = locale === 'en' ? 'Open PDF' : 'Abrir PDF'
  return (
    <section className={styles.page}>
      <div className="container">
        <h1>{sobreData.certificados.title}</h1>
        <div className={styles.content}>
          {renderText(sobreData.certificados.description)}
          
          {certificados.length > 0 ? (
            <div className={styles.gallery}>
              {certificados.map((certificado, index) => (
                <div key={index} className={styles.certificadoCard}>
                  {certificado.type === 'pdf' ? (
                    <div className={styles.pdfContainer}>
                      <iframe
                        src={cdnUrl(`/images/certificados/${certificado.file}`)}
                        className={styles.pdfViewer}
                        title={certificado.title}
                      />
                      <a
                        href={cdnUrl(`/images/certificados/${certificado.file}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.pdfLink}
                      >
                        {certificado.title} ({openPdfLabel})
                      </a>
                    </div>
                  ) : (
                    <Image
                      src={cdnUrl(`/images/certificados/${certificado.file}`)}
                      alt={certificado.title || `Certificado ${index + 1}`}
                      width={400}
                      height={560}
                      className={styles.certificadoImage}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.placeholder}>
              <p>📁 Adicione as imagens dos certificados na pasta:</p>
              <p className={styles.path}><code>public/images/certificados/</code></p>
              <p>E depois adicione os nomes dos arquivos no array <code>certificados</code> neste arquivo.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}



