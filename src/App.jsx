import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Github, Mail, Code2, BookOpen, Rocket, Database, Braces, Wrench, Menu, X, ExternalLink, Sparkles, Sun, Moon } from 'lucide-react'
import { profile } from './data/profile'
import { skillCategories } from './data/skills'
import { projects } from './data/projects'

const nav = [['Tentang', '#about'], ['Keahlian', '#skills'], ['Project', '#projects'], ['Kontak', '#contact']]

function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  return <header className="navbar glass">
    <a className="brand" href="#home"><span className="brand-mark"><Code2 size={18}/></span>GR<span className="accent">.</span></a>
    <nav className={open ? 'nav-links nav-open' : 'nav-links'}>{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>
    <div className="nav-actions"><button className="theme-toggle" onClick={onToggleTheme} aria-label={theme === 'dark' ? 'Aktifkan tema terang' : 'Aktifkan tema gelap'} title={theme === 'dark' ? 'Tema terang' : 'Tema gelap'}>{theme === 'dark' ? <Sun size={17}/> : <Moon size={17}/>}<span>{theme === 'dark' ? 'Terang' : 'Gelap'}</span></button><a className="nav-cta" href="#contact">Mari terhubung ↗</a></div>
    <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Buka navigasi">{open ? <X/> : <Menu/>}</button>
  </header>
}

function Heading({ eyebrow, title, description }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{description}</p></div>
}

function Hero() {
  return <section className="hero section-wrap" id="home">
    <motion.div className="hero-copy" initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.75}}>
      <div className="status-pill"><span className="status-dot"/> {profile.availability}</div>
      <p className="hero-greeting">Halo, saya</p>
      <h1>Gibran <span>Rasendria.</span></h1>
      <div className="hero-role"><Sparkles size={16}/> {profile.role}</div>
      <h2>{profile.headline}</h2>
      <p className="hero-description">{profile.description}</p>
      <div className="hero-actions"><a className="button button-primary" href="#projects">Jelajahi Project <ArrowUpRight size={17}/></a><a className="button button-secondary" href="#contact">Hubungi Saya</a></div>
      <div className="hero-social"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a><span className="social-divider"/><span>Belajar · Membangun · Bertumbuh</span></div>
    </motion.div>
    <motion.div className="hero-visual" initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} transition={{duration:.85,delay:.15}}>
      <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
      <div className="profile-frame glass"><div className="profile-image-wrap"><img src="/images/profile/gibran.png" alt="Foto profil Gibran Rasendria"/></div><div className="profile-caption"><div><strong>Gibran Rasendria</strong><span>Junior Web Developer</span></div><span className="profile-code">&lt;/&gt;</span></div></div>
      <div className="floating-chip chip-top glass"><span className="chip-dot blue"/> React Developer</div>
      <div className="floating-chip chip-bottom glass"><Sparkles size={14}/> Terus berkembang</div>
    </motion.div>
    <a className="scroll-cue" href="#about"><ArrowDown size={15}/> Gulir untuk mengenal saya</a>
  </section>
}

function About() {
  const values = [{icon:BookOpen,title:'Terus belajar',text:'Aktif mempelajari konsep dan teknologi baru.'},{icon:Code2,title:'Belajar lewat praktik',text:'Mengubah materi yang dipelajari menjadi project nyata.'},{icon:Rocket,title:'Terus berkembang',text:'Mengevaluasi hasil dan memperbaiki kemampuan dari setiap project.'}]
  return <section className="section-wrap section-block" id="about">
    <Heading eyebrow="Tentang saya" title="Sedang bertumbuh, terus berkarya." description="Perjalanan menjadi developer adalah proses belajar yang dibangun satu project demi satu project."/>
    <div className="about-layout"><motion.div className="about-panel glass" initial={{opacity:0,x:-18}} whileInView={{opacity:1,x:0}} viewport={{once:true}}><span className="about-number">01 / PERJALANAN</span><h3>Belajar bukan hanya memahami, tetapi juga mencoba dan membangun.</h3><p>Saya merupakan Junior Web Developer yang telah belajar dan langsung mempraktikkan pengembangan web selama kurang lebih satu tahun. Saya menikmati proses mengeksplorasi ide, menyelesaikan tantangan, dan membuat sesuatu yang bisa digunakan.</p><p>Melalui berbagai project, saya terus melatih logika pemrograman, pemahaman teknologi web, serta kemampuan memecahkan masalah.</p></motion.div>
    <div className="value-list">{values.map(({icon:Icon,title,text},i)=><motion.div className="value-card glass" key={title} initial={{opacity:0,x:18}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.1}}><span className="value-icon"><Icon size={20}/></span><div><h3>{title}</h3><p>{text}</p></div></motion.div>)}</div></div>
  </section>
}

function Skills() {
  const icons = [Braces, Braces, Wrench]
  return <section className="section-wrap section-block" id="skills">
    <Heading eyebrow="Keahlian & teknologi" title="Tools yang saya eksplorasi." description="Teknologi dan tools yang pernah saya pelajari serta gunakan dalam proses membangun project."/>
    <div className="skills-grid">{skillCategories.map((cat,i)=>{const Icon=i===2?Database:icons[i];return <motion.div className="skill-card glass" key={cat.title} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.1}}><span className="skill-icon"><Icon size={21}/></span><h3>{cat.title}</h3><p>{cat.description}</p><div className="skill-tags">{cat.skills.map(s=><span key={s}>{s}</span>)}</div></motion.div>})}</div>
    <p className="skills-note">Daftar ini menunjukkan teknologi yang pernah dipelajari atau digunakan, bukan klaim tingkat kemahiran profesional.</p>
  </section>
}

function ProjectCard({project,index}) {
  return <motion.article className="project-card glass" layout initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.1}} transition={{duration:.45,delay:(index%3)*.06}} whileHover={{y:-6}}>
    <a className="project-visual" href={project.demo} target="_blank" rel="noreferrer" aria-label={`Buka ${project.title}`}><img src={project.image} alt={`Preview ${project.title}`} onError={e=>{e.currentTarget.style.display='none'}}/><div className="project-visual-fallback"><span>{String(project.id).padStart(2,'0')}</span><strong>{project.title}</strong><small>{project.category}</small></div><span className="project-open"><ArrowUpRight size={18}/></span></a>
    <div className="project-content"><div className="project-meta"><span>{project.category}</span>{project.featured&&<span className="featured-label">Unggulan</span>}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.stack.map(s=><span key={s}>{s}</span>)}</div><a className="project-link" href={project.demo} target="_blank" rel="noreferrer">Lihat project <ExternalLink size={14}/></a></div>
  </motion.article>
}

function Projects() {
  const [filter,setFilter] = useState('Semua')
  const categories = useMemo(()=>['Semua',...new Set(projects.map(p=>p.category))],[])
  const filtered = filter==='Semua'?projects:projects.filter(p=>p.category===filter)
  return <section className="section-wrap section-block" id="projects">
    <Heading eyebrow="Karya pilihan" title="Project yang pernah saya bangun." description="Kumpulan eksperimen dan karya yang menjadi bagian dari perjalanan belajar dan praktik saya sebagai developer."/>
    <div className="project-toolbar"><div className="filter-list">{categories.map(c=><button key={c} className={filter===c?'filter-button active':'filter-button'} onClick={()=>setFilter(c)}>{c}</button>)}</div><span className="project-count">{filtered.length} project</span></div>
    <motion.div layout className="projects-grid">{filtered.map((p,i)=><ProjectCard key={p.id} project={p} index={i}/>)}</motion.div>
    <p className="projects-footnote">Pilih “Lihat project” untuk membuka website yang sudah dipublikasikan. Tambahkan screenshot asli agar setiap kartu menampilkan preview project.</p>
  </section>
}

function Contact() {
  return <section className="section-wrap section-block contact-section" id="contact">
    <Heading eyebrow="Mari terhubung" title="Punya ide untuk dibangun bersama?" description="Saya terbuka untuk belajar, berdiskusi, dan berkolaborasi dalam project yang menarik."/>
    <div className="contact-panel glass"><div><span className="contact-kicker"><Mail size={15}/> LET'S CONNECT</span><h3>Mari mulai percakapan.</h3><p>Temukan karya dan perjalanan coding saya melalui GitHub.</p></div><a className="button button-primary" href={profile.github} target="_blank" rel="noreferrer"><Github size={17}/> Kunjungi GitHub <ArrowUpRight size={16}/></a></div>
  </section>
}

function Footer() {
  return <footer className="footer section-wrap"><a className="brand" href="#home">GR<span className="accent">.</span></a><p>© {new Date().getFullYear()} Gibran Rasendria. Dibuat dengan semangat untuk terus berkembang.</p><a href="#home">Kembali ke atas ↑</a></footer>
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark' } catch { return 'dark' }
  })
  const toggleTheme = () => setTheme(current => {
    const next = current === 'dark' ? 'light' : 'dark'
    try { localStorage.setItem('portfolio-theme', next) } catch {}
    return next
  })
  return <div className="app-shell" data-theme={theme}><div className="ambient ambient-one"/><div className="ambient ambient-two"/><Navbar theme={theme} onToggleTheme={toggleTheme}/><main><Hero/><About/><Skills/><Projects/><Contact/></main><Footer/></div>
}
