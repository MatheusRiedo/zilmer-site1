import AreasAtuacao from '@/components/AreasAtuacao'
import XRaySection from '@/components/XRaySection'
import ProjetosRecentes from '@/components/ProjetosRecentes'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <AreasAtuacao />
      <XRaySection />
      <ProjetosRecentes />
    </>
  )
}

