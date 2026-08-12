import { useEffect, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react'
import Lenis from 'lenis'
import './styles.css'
import './project-home.css'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
]

// Add future projects here when they are ready to share.
const projects = [
  {
    name: 'Clyvora Lens',
    copy: 'A local-first workspace for inspecting, searching, and converting JSON, CSV, and text files without uploading them.',
    image: '/lens-preview.png',
  },
  {
    name: 'Clyvora',
    copy: 'The home for Clyvora and everything I build under its name.',
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
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <header className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`}>
    <nav className="nav" aria-label="Main navigation">
      <a href="#top" className="logo" aria-label="Clyvora home">Clyvora<span>.</span></a>
      <div className="nav-links">{navItems.map(item => <a key={item.label} href={item.href}>{item.label}</a>)}</div>
      <a href="https://github.com/ClyvoraTech" target="_blank" rel="noreferrer" className="nav-cta">GitHub <ArrowUpRight size={15}/></a>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
    </nav>
    <div className={`mobile-menu ${open ? 'open' : ''}`}>
      {navItems.map(item => <a onClick={() => setOpen(false)} key={item.label} href={item.href}>{item.label}</a>)}
      <a onClick={() => setOpen(false)} href="https://github.com/ClyvoraTech" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16}/></a>
    </div>
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
      <div className="orb orb-a" aria-hidden="true"><span/></div><div className="orb orb-b" aria-hidden="true"><span/></div><div className="hero-grid" aria-hidden="true"/>
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
            <article className="project-card">
              <div className={`project-art ${project.image ? 'has-image' : ''}`}>
                {project.image
                  ? <img src={project.image} alt="Clyvora Lens interface showing a JSON tree transformed into a table"/>
                  : <div className="art-form"/>}
              </div>
              <div className="project-info"><div><h3>{project.name}</h3><p>{project.copy}</p></div></div>
            </article>
          </Reveal>)}
        </div>
        <Reveal className="project-note"><h3>A growing collection.</h3><p>More projects will appear here when they’re ready.</p></Reveal>
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
