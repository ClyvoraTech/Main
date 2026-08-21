import { useEffect, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  FileJson2,
  Image,
  LockKeyhole,
} from 'lucide-react'
import './styles.css'
import './project-home.css'

type Project = {
  name: string
  label: string
  status: string
  copy: string
  image: string
  alt: string
  href: string
  repo: string
  features: string[]
  formats: string
  accent: 'lens' | 'convert'
  icon: ReactNode
}

const projects: Project[] = [
  {
    name: 'Clyvora Lens',
    label: 'Data workbench',
    status: 'Beta',
    copy: 'Inspect, search, filter, and convert structured data without sending it anywhere.',
    image: '/lens-preview.png',
    alt: 'Clyvora Lens turning a nested JSON document into a readable table',
    href: 'https://www.lens.clyvora.tech',
    repo: 'https://github.com/Clyvora/Lens',
    features: ['Search JSON keys and values', 'Sort and filter CSV data', 'Convert JSON and CSV locally'],
    formats: 'JSON · CSV · TXT',
    accent: 'lens',
    icon: <FileJson2 aria-hidden="true" />,
  },
  {
    name: 'Clyvora Convert',
    label: 'Media converter',
    status: 'Beta',
    copy: 'Convert images and audio on your device, with batch tools and no upload queue.',
    image: '/convert-preview.png',
    alt: 'Clyvora Convert processing image and audio formats locally',
    href: 'https://www.convert.clyvora.tech',
    repo: 'https://github.com/Clyvora/Convert',
    features: ['Batch conversion and ZIP export', 'Image resize and quality controls', 'Offline use after first load'],
    formats: 'PNG · JPG · WEBP · MP3 · WAV',
    accent: 'convert',
    icon: <Image aria-hidden="true" />,
  },
]

function ExternalLink({ children, href, className = '' }: { children: ReactNode; href: string; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

function Navbar() {
  return <header className="nav-wrap">
    <nav className="nav" aria-label="Main navigation">
      <a href="#top" className="nav-brand" aria-label="Clyvora home">
        <img src="/favicon.png" alt="" width="30" height="30" decoding="async" />
      </a>
      <div className="nav-links">
        <a href="#projects">Projects</a>
        <a href="#principles">Principles</a>
        <a href="/about/">About</a>
        <ExternalLink href="https://github.com/Clyvora">GitHub <ArrowUpRight size={13} /></ExternalLink>
      </div>
    </nav>
  </header>
}

function ProjectCard({ project }: { project: Project }) {
  return <Reveal className={`project-reveal project-${project.accent}`}>
    <article className="project-card">
      <ExternalLink className="project-art-link" href={project.href}>
        <div className="project-art">
          <img
            src={project.image}
            alt={project.alt}
            width={project.accent === 'lens' ? 1729 : 1672}
            height={project.accent === 'lens' ? 910 : 941}
            loading="lazy"
            decoding="async"
          />
          <span className="project-format">{project.formats}</span>
        </div>
      </ExternalLink>

      <div className="project-content">
        <div className="project-heading">
          <div className="project-icon">{project.icon}</div>
          <div>
            <p className="project-label">{project.label}</p>
            <h3>{project.name}</h3>
          </div>
          <span className="status"><i />{project.status}</span>
        </div>

        <p className="project-copy">{project.copy}</p>

        <ul className="feature-list">
          {project.features.map(feature => <li key={feature}><Check size={14} />{feature}</li>)}
        </ul>

        <div className="project-actions">
          <ExternalLink className="button button-primary" href={project.href}>Try it now <ArrowUpRight size={15} /></ExternalLink>
          <ExternalLink className="text-link" href={project.repo}><Code2 size={15} />View source <ArrowUpRight size={13} /></ExternalLink>
        </div>
      </div>
    </article>
  </Reveal>
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return <main id="top">
    <Navbar />

    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true"><span /></div>

      <div className="hero-content">
        <h1 id="hero-title">Useful file tools.<br /><i>Your files stay yours.</i></h1>
        <p className="hero-copy">Clyvora builds focused browser tools for data and media. Local files are processed on your device; link imports contact the source host only after you request them.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">Explore the tools <ArrowDownRight size={16} /></a>
          <ExternalLink className="button button-secondary" href="https://github.com/Clyvora">Browse the code <ArrowUpRight size={16} /></ExternalLink>
        </div>
      </div>
    </section>

    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <Reveal className="section-heading">
        <h2 id="projects-title">Tools you can<br /><i>use today.</i></h2>
        <p>Small, focused utilities with a clear privacy boundary: selected files stay in your browser.</p>
      </Reveal>

      <div className="project-grid">
        {projects.map(project => <ProjectCard key={project.name} project={project} />)}
      </div>
    </section>

    <section id="principles" className="section principles" aria-labelledby="principles-title">
      <div className="principle-orbit" aria-hidden="true"><span /></div>
      <Reveal className="principles-intro">
        <h2 id="principles-title">Privacy is<br /><i>the architecture.</i></h2>
        <p>No vague promise and no hidden upload step. Clyvora tools are designed to do their work on the device already in front of you.</p>
      </Reveal>

      <div className="principle-grid">
        <Reveal className="principle-card">
          <span>01</span>
          <LockKeyhole size={24} />
          <h3>Local by default</h3>
          <p>Your files are parsed and transformed inside the browser, not on a conversion server.</p>
        </Reveal>
        <Reveal className="principle-card">
          <span>02</span>
          <Check size={24} />
          <h3>No account or advertising</h3>
          <p>There is no sign-up flow, cloud library, advertising, or behavioural profile. Cookie-free page analytics measure anonymous site traffic only.</p>
        </Reveal>
        <Reveal className="principle-card">
          <span>03</span>
          <Code2 size={24} />
          <h3>Open to inspection</h3>
          <p>The source is public. Inspect how the tools work, report a problem, or contribute an improvement.</p>
        </Reveal>
      </div>
    </section>

    <section className="closing" aria-labelledby="closing-title">
      <div className="closing-grid" aria-hidden="true" />
      <Reveal>
        <h2 id="closing-title">Pick a tool.<br /><i>Keep your files.</i></h2>
        <div className="closing-actions">
          <ExternalLink className="button button-primary" href="https://www.lens.clyvora.tech">Open Lens <ArrowUpRight size={16} /></ExternalLink>
          <ExternalLink className="button button-secondary" href="https://www.convert.clyvora.tech">Open Convert <ArrowUpRight size={16} /></ExternalLink>
        </div>
      </Reveal>
    </section>

    <footer>
      <a href="#top" className="footer-brand">Clyvora<span>.</span></a>
      <p>Independent and maintained in the open by <a href="https://github.com/scaryzombies">Levi (scaryzombies)</a>.</p>
      <div>
        <a href="#projects">Projects</a>
        <a href="#principles">Principles</a>
        <a href="/about/">About</a>
        <ExternalLink href="https://github.com/Clyvora">GitHub</ExternalLink>
      </div>
      <small>© {new Date().getFullYear()} Clyvora</small>
    </footer>
  </main>
}

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Analytics />
  </>,
)
