import { useEffect, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import Lenis from 'lenis'
import './styles.css'
import './project-home.css'

// Add future projects here when they are ready to share.
const projects = [
  {
    name: 'Clyvora Lens',
    copy: 'A local-first workspace for inspecting, searching, and converting JSON, CSV, and text files without uploading them.',
    image: '/lens-preview.png',
    alt: 'Clyvora Lens interface showing a JSON tree transformed into a table',
    href: 'https://lens.clyvora.tech',
  },
  {
    name: 'Clyvora Convert',
    copy: 'A fast, local-first converter for PNG, JPG, WebP, MP3, and WAV files—without uploads or accounts.',
    image: '/convert-preview.png',
    alt: 'Clyvora Convert interface showing image and audio formats passing through a local conversion engine',
    href: 'https://convert.clyvora.tech',
  },
]

function Button({ children, secondary = false, href }: { children: ReactNode; secondary?: boolean; href: string }) {
  const external = href.startsWith('http')
  return <a className={`button ${secondary ? 'button-secondary' : ''}`} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{children}</a>
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

function Navbar() {
  const [obscured, setObscured] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const mark = document.querySelector<HTMLElement>('.nav-brand')
        if (!mark) return

        const markRect = mark.getBoundingClientRect()
        const collisionBox = {
          left: markRect.left - 8,
          right: markRect.right + 8,
          top: markRect.top - 8,
          bottom: markRect.bottom + 8,
        }
        const targets = document.querySelectorAll<HTMLElement>('h1, h2, h3, p, .button, .project-art, footer a')
        const overlapsContent = Array.from(targets).some((target) => {
          if (target.closest('.nav-wrap') || target.offsetParent === null) return false
          const rect = target.getBoundingClientRect()
          return rect.left < collisionBox.right
            && rect.right > collisionBox.left
            && rect.top < collisionBox.bottom
            && rect.bottom > collisionBox.top
        })
        setObscured(overlapsContent)
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return <header className={`nav-wrap ${obscured ? 'is-obscured' : ''}`}>
    <nav className="nav" aria-label="Main navigation">
      <a href="#top" className="nav-brand" aria-label="Clyvora home">
        <img src="/favicon.png" alt="" width="32" height="32" decoding="async" />
      </a>
    </nav>
  </header>
}

function SectionIntro({ title }: { title: ReactNode }) {
  return <Reveal><h2>{title}</h2></Reveal>
}

function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.35 })
    let frame = 0
    const animate = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(animate) }
    frame = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')),
      { threshold: 0.15 },
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return <main id="top">
    <Navbar />

    <section className="hero" aria-labelledby="hero-title">
      <div className="orb orb-a" aria-hidden="true"/><div className="orb orb-b" aria-hidden="true"><span/></div><div className="hero-grid" aria-hidden="true"/>
      <div className="hero-content">
        <h1 id="hero-title">Things I build,<br/><i>in one place.</i></h1>
        <p className="hero-copy">Clyvora is my personal home for software, experiments, and ideas I want to put into the world.</p>
        <div className="hero-actions">
          <Button href="#projects">See the projects <ArrowDownRight size={17}/></Button>
          <Button href="https://github.com/ClyvoraTech" secondary>View GitHub <ArrowUpRight size={17}/></Button>
        </div>
      </div>
    </section>

    <section id="projects" className="section projects">
      <SectionIntro title={<>Made, then<br/><i>shared.</i></>}/>
      <div className="project-layout">
        <div className="project-grid">
          {projects.map(project => <Reveal className="project-reveal" key={project.name}>
            <a className="project-card" href={project.href} aria-label={`Open ${project.name}`}>
              <div className={`project-art ${project.image ? 'has-image' : ''}`}>
                {project.image
                  ? <img src={project.image} alt={project.alt}/>
                  : <div className="art-form"/>}
              </div>
              <div className="project-info"><div><h3>{project.name}</h3><p>{project.copy}</p></div><span className="project-link">Open <ArrowUpRight size={15}/></span></div>
            </a>
          </Reveal>)}
        </div>
      </div>
    </section>

    <section id="about" className="section about">
      <div className="section-orbit" aria-hidden="true"><span/></div>
      <SectionIntro title={<>A name for my<br/><i>side projects.</i></>}/>
      <Reveal className="about-body">
        <p>Clyvora is the name I use for software projects and experiments I build in my spare time. This is where I collect the ones worth sharing.</p>
        <div className="glass-statement"><span>“</span><strong>Build interesting things.<br/>Share the good ones.</strong></div>
      </Reveal>
    </section>

    <footer><a href="#top" className="logo">Clyvora<span>.</span></a><div><a href="#projects">Projects</a><a href="#about">About</a><a href="https://github.com/ClyvoraTech" target="_blank" rel="noreferrer">GitHub</a></div><p>© {new Date().getFullYear()} Clyvora · Built independently</p></footer>
  </main>
}

createRoot(document.getElementById('root')!).render(<App />)
