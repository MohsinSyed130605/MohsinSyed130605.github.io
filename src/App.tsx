import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  Mail, ExternalLink, ArrowDown,
  Zap, Code2, Server, Database, Brain,
  ChevronRight, MessageSquare, Star, Coffee,
  ArrowUpRight
} from 'lucide-react'

// ── Inline SVG brand icons ──────────────────────────────────
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const CredlyIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-4.182-3.137-4.182 3.137a.5.5 0 0 1-.81-.47l1.515-8.526" />
  </svg>
)

// ── DATA ──────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    num: '01',
    appLabel: 'pulseboard.app',
    badge: 'DEVOPS / FULL STACK',
    title: 'PulseBoard – Self-hosted DevOps Control Center',
    description:
      'A self-hosted DevOps control center providing real-time system metrics, Docker container management, and GitHub activity tracking in one unified dashboard.',
    tags: ['ASTRO', 'PYTHON', 'FASTAPI', 'DOCKER', 'JAVASCRIPT'],
    sourceCode: 'https://github.com/MohsinSyed130605/PulseBoard',
    liveSite: null,
  },
  {
    id: 2,
    num: '02',
    appLabel: 'studvanceai.app',
    badge: 'AI / FULL STACK',
    title: 'StudvanceAI – AI-Powered Career & Education Guidance',
    description:
      'An AI-powered guidance platform utilizing RAG (Retrieval-Augmented Generation) to provide verified data on colleges, careers, and scholarships for students.',
    tags: ['PYTHON', 'JAVASCRIPT', 'RAG', 'FASTAPI', 'OPENAI'],
    sourceCode: 'https://github.com/MohsinSyed130605/Studvanceai',
    liveSite: 'https://studvanceai.vercel.app',
  },
]

const CERTIFICATION_GROUPS = [
  {
    id: 'ibm-skillsbuild',
    issuer: 'IBM SKILLSBUILD',
    count: '2 certifications',
    verifyUrl: 'https://www.credly.com/users/mohsin-syed.abac7f98/badges',
    verifyLabel: 'VERIFY ON CREDLY',
    items: [
      {
        title: 'Enterprise Design Thinking Practitioner',
        year: '2026',
        tags: ['ENTERPRISE DESIGN THINKING', 'UX DESIGN', 'PROTOTYPING', 'EMPATHY'],
      },
      {
        title: 'Machine Learning for Data Science Projects',
        year: '2026',
        tags: ['AI AUTOMATION', 'MACHINE LEARNING', 'DEEP LEARNING', 'DATA MODELING'],
      },
    ],
  },
  {
    id: 'anthropic-courses',
    issuer: 'ANTHROPIC COURSES & TRAINING',
    count: '2 certifications',
    verifyUrl: 'https://anthropic.skilljar.com/',
    verifyLabel: 'VERIFY ON SKILLJAR',
    items: [
      {
        title: 'Introduction to Model Context Protocol',
        year: '2026',
        tags: ['MODEL CONTEXT PROTOCOL', 'MCP ARCHITECTURE', 'AI AGENTS', 'TOOL INTEGRATION'],
      },
      {
        title: 'Model Context Protocol: Advanced Topics',
        year: '2026',
        tags: ['MCP CLIENTS & SERVERS', 'TOOL DEFINITIONS', 'RESOURCE TEMPLATES', 'SECURITY'],
      },
    ],
  },
]

const SKILLS_ROW1 = [
  { name: 'Python',     logo: 'https://cdn.simpleicons.org/python' },
  { name: 'React',      logo: 'https://cdn.simpleicons.org/react' },
  { name: 'Node.js',   logo: 'https://cdn.simpleicons.org/nodedotjs' },
  { name: 'FastAPI',   logo: 'https://cdn.simpleicons.org/fastapi' },
  { name: 'TypeScript',logo: 'https://cdn.simpleicons.org/typescript' },
  { name: 'MongoDB',   logo: 'https://cdn.simpleicons.org/mongodb' },
  { name: 'PostgreSQL',logo: 'https://cdn.simpleicons.org/postgresql' },
  { name: 'Redis',     logo: 'https://cdn.simpleicons.org/redis' },
]

const SKILLS_ROW2 = [
  { name: 'LangChain', logo: 'https://cdn.simpleicons.org/langchain' },
  { name: 'OpenAI',   logo: 'https://svgl.app/library/openai.svg' },
  { name: 'Docker',   logo: 'https://cdn.simpleicons.org/docker' },
  { name: 'AWS',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'Git',      logo: 'https://cdn.simpleicons.org/git' },
  { name: 'Tailwind', logo: 'https://cdn.simpleicons.org/tailwindcss' },
  { name: 'Next.js',  logo: 'https://svgl.app/library/nextjs_icon_dark.svg' },
  { name: 'GraphQL',  logo: 'https://cdn.simpleicons.org/graphql' },
]

const STATS = [
  { value: '2', label: 'Years Experience', icon: <Coffee size={18} /> },
  { value: '4+', label: 'Projects Shipped', icon: <Zap size={18} /> },
  { value: '3', label: 'Certifications', icon: <Star size={18} /> },
  { value: '99%', label: 'Client Satisfaction', icon: <MessageSquare size={18} /> },
]

// ── ANIMATION VARIANTS ────────────────────────────────────────
const easeBezier = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeBezier, delay },
  }),
}

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeBezier, delay },
  }),
}

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeBezier, delay },
  }),
}

function RevealSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const variant = direction === 'left' ? fadeLeft : direction === 'right' ? fadeRight : fadeUp

  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── NAVBAR ────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['About', 'Projects', 'Certifications', 'Skills']

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-3 sm:pt-5 sm:px-4"
    >
      <div
        className={`nav-pill rounded-full px-4 sm:px-6 py-3 flex items-center gap-4 sm:gap-8 transition-all duration-500 ${scrolled ? 'shadow-2xl shadow-black/60' : ''}`}
        style={{ maxWidth: scrolled ? '680px' : '720px', width: '100%' }}
      >
        <a href="#about" className="font-bold text-base tracking-tight text-white mr-auto whitespace-nowrap">
          <span className="gradient-text">MS</span>
          <span className="text-[#a89880] ml-1">/ Mohsin Syed</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm font-medium text-[#a89880] hover:text-white transition-colors duration-200"
            >
              {l}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="btn-primary hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white ml-2"
        >
          Let's Talk <ChevronRight size={14} />
        </a>

        <button
          id="menu-toggle"
          className="md:hidden text-[#a89880] hover:text-white transition-colors p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="nav-pill absolute top-[68px] left-3 right-3 rounded-2xl p-4 flex flex-col gap-2 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-[#a89880] hover:text-white transition-colors font-medium py-2 px-3 rounded-xl hover:bg-white/5"
              >
                {l}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold text-white mt-1"
            >
              Let's Talk <ChevronRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ── HERO + ABOUT (combined) ────────────────────────────────────
function HeroAbout() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <section id="about" ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20"
      style={{ background: '#0a0805' }}>
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 0%, rgba(251,100,20,0.16) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 15% 80%, rgba(234,88,12,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 85% 60%, rgba(168,85,247,0.07) 0%, transparent 60%),
            linear-gradient(180deg, #0a0805 0%, #0c0a07 100%)`,
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(249,115,22,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* Status badge */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center lg:justify-start mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-[#fb923c]"
            style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)' }}>
            <span className="w-2 h-2 rounded-full bg-[#4ade80] pulse-ring inline-block shrink-0" />
            Open to full-stack &amp; backend roles
          </span>
        </motion.div>

        {/* Two-column grid: text left, photo right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT — Name + bio + certs + CTAs */}
          <div>
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
              className="font-black leading-[0.9] tracking-tight mb-4 sm:mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(38px, 8vw, 96px)' }}>
              <span className="text-[#faf5ef]">Hello, I am</span>
              <br />
              <span className="gradient-text text-glow">Mohsin Syed.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}
              className="text-[#fb923c] font-semibold tracking-wide text-sm sm:text-base uppercase mb-5 sm:mb-6">
              Fullstack Developer | Backend AI Engineering Intern
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="space-y-3 text-[#a89880] leading-relaxed text-sm sm:text-base mb-6 sm:mb-7 max-w-lg">
              <p>I craft fast, scalable web applications and integrate{' '}
                <span className="text-[#faf5ef] font-medium">AI capabilities</span> that actually make a
                difference — across the full stack from React to Python.
              </p>
              <p>Lately I've been deep in{' '}
                <span className="text-[#fb923c] font-medium">LLM-powered tools</span> with LangChain &amp; OpenAI,
                while shipping clean full-stack products at speed.
              </p>
            </motion.div>

            {/* Cert pills */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.05 }}
              className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {['IBM Design Thinking Practitioner', 'IBM ML for Data Science', 'Anthropic Model Context Protocol'].map((cert) => (
                <span key={cert} className="px-2.5 py-1.5 rounded-full text-xs font-medium text-[#fb923c]"
                  style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.18)' }}>
                  🏆 {cert}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.15 }}
              className="flex flex-col sm:flex-row gap-3">
              <a href="#projects" className="btn-primary flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-sm">
                View Projects <ExternalLink size={15} />
              </a>
              <a href="#contact"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[#faf5ef] text-sm hover:text-white transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                Let's Chat <ChevronRight size={15} />
              </a>
            </motion.div>
          </div>

          {/* RIGHT — Frameless portrait cutout with subtle ambient glow & orbit line */}
          <div className="relative flex justify-center lg:justify-end items-end w-full">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px] xl:max-w-[500px] flex items-end justify-center">
              
              {/* Soft amber/orange radial ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[420px] lg:w-[480px] h-[320px] sm:h-[420px] lg:h-[480px] rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(249,115,22,0.22) 0%, rgba(234,88,12,0.08) 45%, transparent 70%)',
                  filter: 'blur(50px)',
                  zIndex: 0,
                }} />

              {/* Secondary subtle warm core glow */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[260px] h-[200px] sm:h-[260px] rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(251,146,60,0.18) 0%, transparent 70%)',
                  filter: 'blur(35px)',
                  zIndex: 0,
                }} />

              {/* Low-opacity decorative circular orbit line behind the silhouette */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[360px] lg:w-[420px] h-[280px] sm:h-[360px] lg:h-[420px] rounded-full pointer-events-none"
                style={{
                  border: '1px dashed rgba(249,115,22,0.15)',
                  zIndex: 0,
                }} />

              {/* Frameless transparent portrait cutout */}
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="relative z-10 w-full flex justify-center lg:justify-end"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full flex justify-center lg:justify-end"
                >
                  <img
                    src="/mohsin-cutout.png"
                    alt="Mohsin Syed — Fullstack Developer | Backend AI Engineering Intern"
                    className="w-full h-auto object-contain select-none pointer-events-none"
                    style={{
                      maxHeight: 'min(72vh, 600px)',
                      filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.75)) drop-shadow(0 0 35px rgba(249,115,22,0.14))',
                      maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <RevealSection delay={0.4} className="mt-12 sm:mt-16 lg:mt-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {STATS.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="p-4 sm:p-5 rounded-2xl card-hover text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-[#f97316] mb-2 flex justify-center">{s.icon}</div>
                <p className="font-black text-[#faf5ef] leading-none mb-1"
                  style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {s.value}
                </p>
                <p className="text-[#6b5c4e] text-xs font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="flex flex-col items-center gap-2 scroll-indicator mt-12 sm:mt-16">
          <span className="text-xs text-[#6b5c4e] tracking-widest uppercase font-medium">Scroll</span>
          <ArrowDown size={16} className="text-[#f97316]" />
        </motion.div>
      </div>
    </section>
  )
}

// ── PROJECTS ──────────────────────────────────────────────────
function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 36 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
        },
      }}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.08] bg-[#120f0c]/90 flex flex-col justify-between transition-all duration-300 hover:border-[#f97316]/40 hover:shadow-2xl hover:shadow-[#f97316]/5 group"
    >
      <div>
        {/* Retro/macOS style window topbar */}
        <div className="bg-[#1c1712] border-b border-white/[0.08] px-4 sm:px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-[2px] border border-white/40 bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-[2px] border border-white/40 bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-[2px] border border-white/40 bg-white/10" />
          </div>
          <span className="font-mono text-xs text-[#a89880] tracking-wider">{project.appLabel}</span>
          <div className="w-8" />
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-7">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono font-bold text-2xl sm:text-3xl text-[#faf5ef]">
              {project.num}
            </span>
            <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded border border-white/20 text-[#faf5ef] tracking-wider uppercase bg-white/[0.03]">
              {project.badge}
            </span>
          </div>

          <h3
            className="font-bold text-lg sm:text-xl text-[#faf5ef] mb-3 group-hover:text-white transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {project.title}
          </h3>

          <p className="text-sm text-[#a89880] leading-relaxed mb-6 font-normal">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] sm:text-[11px] font-medium tracking-wider px-2.5 py-1 border border-white/10 rounded text-[#a89880] bg-white/[0.02]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Links */}
      <div className="border-t border-white/[0.08] px-5 sm:px-7 py-3.5 flex items-center gap-5 bg-white/[0.01]">
        <a
          href={project.sourceCode}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs font-semibold tracking-wider text-[#a89880] hover:text-[#f97316] inline-flex items-center gap-1 transition-colors"
        >
          SOURCE CODE <ArrowUpRight size={14} />
        </a>
        {project.liveSite && (
          <a
            href={project.liveSite}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs font-semibold tracking-wider text-[#a89880] hover:text-[#f97316] inline-flex items-center gap-1 transition-colors"
          >
            LIVE SITE <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </motion.div>
  )
}

function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative" style={{ background: '#0a0805' }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.2), transparent)' }}
      />
      <div className="max-w-6xl mx-auto">
        <RevealSection className="mb-10 sm:mb-14">
          <h2
            className="font-black gradient-text-subtle leading-tight mb-3"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(34px, 7vw, 64px)',
            }}
          >
            Featured Projects
          </h2>
          <p className="text-[#a89880] text-sm sm:text-base max-w-2xl leading-relaxed">
            A showcase of my work — from real-time analytics platforms to AI-powered web applications.
          </p>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CERTIFICATIONS ────────────────────────────────────────────
function Certifications() {
  const [openGroup, setOpenGroup] = useState<string | null>('ibm-skillsbuild')

  const toggleGroup = (id: string) => {
    setOpenGroup(openGroup === id ? null : id)
  }

  return (
    <section id="certifications" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative" style={{ background: '#0d0a07' }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.2), transparent)' }}
      />
      <div className="max-w-4xl mx-auto">
        <RevealSection className="mb-10 sm:mb-14">
          <p className="text-[#f97316] font-mono font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3">
            // CREDENTIALS
          </p>
          <h2
            className="font-black gradient-text-subtle leading-tight mb-3"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 7vw, 60px)',
            }}
          >
            Certifications
          </h2>
          <p className="text-[#a89880] text-sm sm:text-base leading-relaxed">
            Verified credentials and professional learning tracks in AI, Cloud, and Design.
          </p>
        </RevealSection>

        <div className="flex flex-col gap-4 sm:gap-5">
          {CERTIFICATION_GROUPS.map((group, gIdx) => {
            const isOpen = openGroup === group.id
            return (
              <RevealSection key={group.id} delay={gIdx * 0.1}>
                <div
                  className="rounded-2xl overflow-hidden border border-white/[0.08] transition-all duration-300"
                  style={{
                    background: isOpen ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.015)',
                  }}
                >
                  {/* Folder Accordion Header */}
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors hover:bg-white/[0.03] cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border border-[#f97316]/30 bg-[#f97316]/10 text-xl shrink-0">
                        📁
                      </div>
                      <div className="min-w-0">
                        <h3
                          className="font-bold text-sm sm:text-base text-[#faf5ef] tracking-wide uppercase"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {group.issuer}
                        </h3>
                        <p className="font-mono text-xs text-[#6b5c4e]">{group.count}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#a89880] p-1">
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-white/[0.06]"
                      >
                        <div className="divide-y divide-white/[0.06]">
                          {group.items.map((item, iIdx) => (
                            <div key={iIdx} className="p-4 sm:p-5 hover:bg-white/[0.02] transition-colors">
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div className="flex items-start gap-2.5">
                                  <span className="text-[#f97316] text-xs mt-1 shrink-0">▷</span>
                                  <h4 className="font-bold text-sm sm:text-base text-[#faf5ef] leading-snug">
                                    {item.title}
                                  </h4>
                                </div>
                                <span className="font-mono text-xs text-[#6b5c4e] shrink-0">
                                  {item.year}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5 ml-5 mt-2">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="font-mono text-[9px] sm:text-[10px] tracking-wider px-2 py-0.5 border border-white/10 rounded text-[#8c7d6e] bg-white/[0.02]"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Bottom link in folder */}
                        <div className="p-4 sm:p-5 border-t border-white/[0.06] bg-white/[0.01]">
                          <a
                            href={group.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#f97316] hover:text-[#fb923c] tracking-wider transition-colors"
                          >
                            {group.verifyLabel} <ArrowUpRight size={14} />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── SKILLS ────────────────────────────────────────────────────
function SkillPill({ name, logo }: { name: string; logo: string }) {
  return (
    <div
      className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shrink-0 font-medium text-[#a89880] text-xs sm:text-sm whitespace-nowrap hover:text-white transition-colors duration-200"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <img src={logo} alt={name} className="w-4 h-4 sm:w-5 sm:h-5 object-contain flex-shrink-0" />
      {name}
    </div>
  )
}

function Skills() {
  const doubled1 = [...SKILLS_ROW1, ...SKILLS_ROW1]
  const doubled2 = [...SKILLS_ROW2, ...SKILLS_ROW2]

  return (
    <section id="skills" className="py-16 sm:py-24 lg:py-32 overflow-hidden relative" style={{ background: '#0f0c09' }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.2), transparent)' }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 sm:mb-16">
        <RevealSection>
          <p className="text-[#f97316] font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3">Tech Stack</p>
          <h2
            className="font-black gradient-text-subtle leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(32px, 7vw, 64px)' }}
          >
            Tools I wield<br />every day.
          </h2>
        </RevealSection>
      </div>

      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0f0c09, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0f0c09, transparent)' }}
        />

        <div className="flex flex-col gap-3 sm:gap-4 py-2">
          <div className="marquee-track gap-3 sm:gap-4">
            {doubled1.map((s, i) => (
              <SkillPill key={i} {...s} />
            ))}
          </div>
          <div className="marquee-track-reverse gap-3 sm:gap-4">
            {doubled2.map((s, i) => (
              <SkillPill key={i} {...s} />
            ))}
          </div>
        </div>
      </div>

      {/* Skill categories */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 sm:mt-20">
        <RevealSection delay={0.2}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { title: 'Front-End', desc: 'React, Next.js, TypeScript, Tailwind', icon: <Code2 size={22} /> },
              { title: 'Back-End', desc: 'Node.js, Python, FastAPI, REST / GraphQL', icon: <Server size={22} /> },
              { title: 'Data', desc: 'MongoDB, PostgreSQL, Redis, Prisma', icon: <Database size={22} /> },
              { title: 'AI / ML', desc: 'LangChain, OpenAI, Hugging Face, RAG', icon: <Brain size={22} /> },
            ].map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl card-hover"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="text-[#f97316] mb-2 sm:mb-3">{cat.icon}</div>
                <h3 className="font-bold text-[#faf5ef] mb-1 text-sm sm:text-base">{cat.title}</h3>
                <p className="text-xs text-[#6b5c4e] leading-relaxed">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  )
}

// ── CONTACT ───────────────────────────────────────────────────
function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'mohsinsyed1020@gmail.com'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const contactLinks = [
    {
      id: 'email',
      label: 'EMAIL',
      value: email,
      href: `mailto:${email}`,
      icon: <Mail size={19} />,
      isExternal: false,
      onClick: handleCopyEmail,
      extraBadge: copied ? (
        <span className="text-xs text-[#4ade80] font-mono font-medium ml-2 inline-flex items-center">
          ✓ Copied!
        </span>
      ) : null,
    },
    {
      id: 'github',
      label: 'GITHUB',
      value: 'MohsinSyed130605',
      href: 'https://github.com/MohsinSyed130605',
      icon: <GithubIcon size={19} />,
      isExternal: true,
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN',
      value: 'Mohsin Syed',
      href: 'https://www.linkedin.com/in/mohsinsyed-dev/',
      icon: <LinkedinIcon size={19} />,
      isExternal: true,
    },
    {
      id: 'credly',
      label: 'CREDLY',
      value: 'Verified Badges',
      href: 'https://www.credly.com/users/mohsin-syed.abac7f98/badges',
      icon: <CredlyIcon size={19} />,
      isExternal: true,
    },
  ]

  return (
    <section id="contact" className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 relative overflow-hidden" style={{ background: '#0a0805' }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.25), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, rgba(249,115,22,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <RevealSection className="mb-10 sm:mb-12 text-left">
          <p className="text-[#f97316] font-mono font-semibold text-xs sm:text-sm tracking-widest uppercase mb-4">
            // CONTACT
          </p>
          <h2
            className="font-black gradient-text-subtle leading-tight mb-4 sm:mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(36px, 8vw, 76px)' }}
          >
            Let's work<br />together.
          </h2>
          <p className="text-[#a89880] text-sm sm:text-base leading-relaxed max-w-lg">
            Have a project in mind or want to connect? I'd love to hear from you.
          </p>
        </RevealSection>

        {/* Stacked Contact List (matching reference image) */}
        <RevealSection delay={0.2}>
          <div
            className="rounded-2xl sm:rounded-3xl overflow-hidden divide-y divide-white/[0.08]"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {contactLinks.map((item, idx) => (
              <motion.a
                key={item.id}
                id={`contact-${item.id}`}
                href={item.href}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                onClick={item.onClick}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * idx, duration: 0.45 }}
                className="group flex items-center justify-between p-4 sm:p-5 sm:px-6 transition-all duration-300 hover:bg-white/[0.04] cursor-pointer"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  {/* Square Outline Icon Box */}
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-[#a89880] group-hover:text-[#f97316] group-hover:border-[#f97316]/40 group-hover:bg-[#f97316]/10 transition-all duration-300 shrink-0"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Label & Value */}
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase text-[#6b5c4e] group-hover:text-[#fb923c] transition-colors leading-none mb-1.5">
                      {item.label}
                    </p>
                    <div className="flex items-center">
                      <p
                        className="text-[#faf5ef] font-bold text-sm sm:text-base group-hover:text-white transition-colors truncate"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {item.value}
                      </p>
                      {item.extraBadge}
                    </div>
                  </div>
                </div>

                {/* Arrow up-right */}
                <div className="text-[#6b5c4e] group-hover:text-[#f97316] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 ml-3">
                  <ArrowUpRight size={18} />
                </div>
              </motion.a>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  )
}

// ── FOOTER ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="py-6 sm:py-8 px-4 text-center"
      style={{ background: '#090704', borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <p className="text-[#6b5c4e] text-xs sm:text-sm">
        © {new Date().getFullYear()}{' '}
        <span className="text-[#a89880] font-medium">Mohsin Syed</span> · Built with
        React + Framer Motion
      </p>
    </footer>
  )
}

// ── APP ───────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="noise-overlay" style={{ overflowX: 'hidden' }}>
      <Navbar />
      <main>
        <HeroAbout />
        <Projects />
        <Certifications />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
