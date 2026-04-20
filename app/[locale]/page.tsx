import HeroIntro from '@/components/HeroIntro'
import AreasAtuacao from '@/components/AreasAtuacao'
import XRaySection from '@/components/XRaySection'
import ProjetosRecentes from '@/components/ProjetosRecentes'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <HeroIntro />
      <div id="areas">
        <AreasAtuacao />
      </div>
      <XRaySection />
      <ProjetosRecentes />
    </>
  )
}

