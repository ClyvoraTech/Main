import { useEffect, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react'
import Lenis from 'lenis'
import './styles.css'

const navItems = ['About', 'Technology', 'Projects', 'Contact']
const focusAreas = [
  ['01', 'Software', 'Purpose-built products that make complexity feel quiet.'],
  ['02', 'Infrastructure', 'Resilient systems engineered for the work beneath the work.'],
  ['03', 'Artificial Intelligence', 'Useful intelligence with considered human boundaries.'],
  ['04', 'Digital Experiences', 'Interfaces with clarity, character, and a reason to exist.'],
]
const projects = [
  { name: 'Aurelia', type: 'Digital infrastructure', year: '2025', copy: 'A calmer operational layer for distributed teams.', className: 'project-one' },
  { name: 'Forma', type: 'Product system', year: '2024', copy: 'An adaptive workspace built around the rhythm of real work.', className: 'project-two' },
  { name: 'Field Notes', type: 'Intelligence platform', year: '2024', copy: 'Context that meets people before they need to ask.', className: 'project-three' },
]

function Button({ children, secondary = false, href = '#contact' }: { children: ReactNode; secondary?: boolean; href?: string }) {
  return <a className={`button ${secondary ? 'button-secondary' : ''}`} href={href}>{children}</a>
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update(); window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <header className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`}>
    <nav className="nav" aria-label="Main navigation">
      <a href="#top" className="logo" aria-label="Clyvora home">Clyvora<span>.</span></a>
      <div className="nav-links">{navItems.map(item => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</div>
      <a href="#contact" className="nav-cta">Get in touch <ArrowUpRight size={15}/></a>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
    </nav>
    <div className={`mobile-menu ${open ? 'open' : ''}`}>{navItems.map(item => <a onClick={() => setOpen(false)} key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}<a onClick={() => setOpen(false)} href="#contact">Get in touch <ArrowUpRight size={16}/></a></div>
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
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: 0.15 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return <main id="top">
    <Navbar />
    <section className="hero" aria-labelledby="hero-title">
      <div className="orb orb-a"/><div className="orb orb-b"/><div className="hero-grid" aria-hidden="true"/>
      <div className="hero-content"><p className="hero-kicker">Clyvora Technologies <span>—</span> Est. 2024</p><h1 id="hero-title">Technology,<br/><i>refined.</i></h1><p className="hero-copy">Clyvora Technologies builds focused software and digital systems designed for the next generation.</p><div className="hero-actions"><Button>Explore Clyvora <ArrowDownRight size={17}/></Button><Button secondary>Contact us</Button></div></div>
      <div className="scroll-note"><span/> Scroll to discover</div>
    </section>
    <section id="about" className="section about"><SectionIntro eyebrow="01 — About" title={<>Built with <i>intent.</i></>}/><Reveal className="about-body"><p>Clyvora is an independent technology company creating elegant, useful digital products and the infrastructure that makes them possible. We believe the most powerful systems are the ones you hardly notice.</p><div className="glass-statement"><span>“</span><strong>Simple on the surface.<br/>Sophisticated underneath.</strong></div></Reveal></section>
    <section id="technology" className="section technology"><SectionIntro eyebrow="02 — Technology" title={<>The technology<br/>behind <i>Clyvora.</i></>}/><div className="focus-list">{focusAreas.map(([number, name, description]) => <Reveal key={name} className="focus-reveal"><article className="focus-row"><span>{number}</span><h3>{name}</h3><p>{description}</p><ArrowUpRight className="focus-arrow"/></article></Reveal>)}</div></section>
    <section id="projects" className="section projects"><SectionIntro eyebrow="03 — Selected work" title={<>Made to <i>matter.</i></>}/><div className="project-grid">{projects.map((project, index) => <Reveal className={`project-reveal p${index + 1}`} key={project.name}><article className={`project-card ${project.className}`}><div className="project-art"><span className="art-label">Clyvora / {project.name}</span><div className="art-form"/></div><div className="project-info"><div><h3>{project.name}</h3><p>{project.copy}</p></div><div className="project-meta"><span>{project.type}</span><span>{project.year}</span><ArrowUpRight/></div></div></article></Reveal>)}</div></section>
    <section className="philosophy"><div className="philosophy-line"/><Reveal><p>Our philosophy</p><h2>Technology should <i>disappear</i> behind the experience.</h2></Reveal></section>
    <section id="contact" className="contact"><div className="contact-noise"/><Reveal><p className="eyebrow">04 — Contact</p><h2>Let’s build something <i>meaningful.</i></h2><p>Have an idea, project, or opportunity? Start a conversation with Clyvora.</p><Button href="mailto:hello@clyvora.com">Get in touch <ArrowUpRight size={18}/></Button></Reveal><a className="github" href="https://github.com/ClyvoraTech" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17}/></a></section>
    <footer><a href="#top" className="logo">Clyvora<span>.</span></a><div><a href="https://github.com/ClyvoraTech">GitHub</a><a href="#contact">Contact</a><a href="#">Privacy</a></div><p>© {new Date().getFullYear()} Clyvora Technologies</p></footer>
  </main>
}
createRoot(document.getElementById('root')!).render(<App />)
