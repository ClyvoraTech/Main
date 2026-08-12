import { useEffect, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react'
import Lenis from 'lenis'
import './styles.css'
import './project-home.css'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Elsewhere', href: '#elsewhere' },
]

const interests = [
  ['01', 'Web projects', 'Useful, considered experiences for the browser.'],
  ['02', 'Small tools', 'Focused software that solves one problem well.'],
  ['03', 'Experiments', 'Ideas explored through code, design, and AI.'],
  ['04', 'Open source', 'Work worth sharing, including the process behind it.'],
]

const projects = [
  {
    name: 'Clyvora Main',
    type: 'Website',
    status: 'Live',
    year: '2026',
    copy: 'The home for Clyvora and the projects that will live under its name.',
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

function SectionIntro({ eyebrow, title }: { eyebrow: string; title: ReactNode }) {
  return <Reveal><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></Reveal>
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
      <div className="orb orb-a"/><div className="orb orb-b"/><div className="hero-grid" aria-hidden="true"/>
      <div className="hero-content">
        <p className="hero-kicker">Independent project space <span>—</span> Since 2024</p>
        <h1 id="hero-title">Things I build,<br/><i>in one place.</i></h1>
        <p className="hero-copy">Clyvora is my personal home for software, experiments, and ideas I want to put into the world.</p>
        <div className="hero-actions">
          <Button href="#projects">See the projects <ArrowDownRight size={17}/></Button>
          <Button href="https://github.com/ClyvoraTech" secondary>View GitHub <ArrowUpRight size={17}/></Button>
        </div>
      </div>
      <div className="scroll-note"><span/> Keep scrolling</div>
    </section>

    <section id="about" className="section about">
      <SectionIntro eyebrow="01 — About" title={<>A name for my<br/><i>side projects.</i></>}/>
      <Reveal className="about-body">
        <p>Clyvora is not an agency or a big company. It is a simple umbrella for the things I make—some useful, some experimental, and all built because I wanted to learn or explore something.</p>
        <div className="glass-statement"><span>“</span><strong>Build interesting things.<br/>Share the good ones.</strong></div>
      </Reveal>
    </section>

    <section className="section technology">
      <SectionIntro eyebrow="02 — What lives here" title={<>Code, ideas,<br/>and <i>curiosity.</i></>}/>
      <div className="focus-list">
        {interests.map(([number, name, description]) => <Reveal key={name} className="focus-reveal"><article className="focus-row"><span>{number}</span><h3>{name}</h3><p>{description}</p><ArrowUpRight className="focus-arrow"/></article></Reveal>)}
      </div>
    </section>

    <section id="projects" className="section projects">
      <SectionIntro eyebrow="03 — Projects" title={<>Made, then<br/><i>shared.</i></>}/>
      <div className="project-layout">
        <div className="project-grid">
          {projects.map(project => <Reveal className="project-reveal" key={project.name}>
            <article className="project-card">
              <div className="project-art"><span className="art-label">Clyvora / {project.name}</span><div className="art-form"/></div>
              <div className="project-info"><div><div className="project-status"><span/>{project.status}</div><h3>{project.name}</h3><p>{project.copy}</p></div><div className="project-meta"><span>{project.type}</span><span>{project.year}</span></div></div>
            </article>
          </Reveal>)}
        </div>
        <Reveal className="project-note"><p className="eyebrow">A growing collection</p><h3>Only real work goes here.</h3><p>The list is short on purpose. New projects will be added when there is something genuine to show—not just a polished name and a placeholder.</p></Reveal>
      </div>
    </section>

    <section className="philosophy"><div className="philosophy-line"/><Reveal><p>How I want to work</p><h2>Small projects,<br/><i>finished carefully.</i></h2></Reveal></section>

    <section id="elsewhere" className="contact">
      <div className="contact-noise"/>
      <Reveal><p className="eyebrow">04 — Elsewhere</p><h2>See what I’m<br/><i>building next.</i></h2><p>Code, experiments, and future releases will appear on the Clyvora GitHub.</p><Button href="https://github.com/ClyvoraTech">Visit GitHub <ArrowUpRight size={18}/></Button></Reveal>
    </section>

    <footer><a href="#top" className="logo">Clyvora<span>.</span></a><div><a href="#about">About</a><a href="#projects">Projects</a><a href="https://github.com/ClyvoraTech" target="_blank" rel="noreferrer">GitHub</a></div><p>© {new Date().getFullYear()} Clyvora · Built by one person</p></footer>
  </main>
}

createRoot(document.getElementById('root')!).render(<App />)
