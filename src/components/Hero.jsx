import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiFileText, FiArrowDown } from 'react-icons/fi'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center section-container pt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl"
      >
        {/* Status badge */}
        <div className="mb-6 flex flex-wrap gap-2">
          <a
            href="https://devpost.com/software/percevia-8kb46z?ref_content=my-projects-tab&ref_feature=my_projects"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs text-amber-300 font-medium hover:bg-amber-500/20 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            🏆 UiPath AgentHack 2026 Grand Finalist — Percevia
          </a>
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-3">
          Yashwardhan{' '}
          <span className="text-gradient">Singh</span>
        </h1>

        {/* Title */}
        <p className="text-xl text-text-secondary font-light mb-4">
          Computer Science Student at{' '}
          <span className="text-text-primary font-medium">BITS Pilani Bengaluru</span>
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['Backend Engineering', 'Machine Learning', 'Distributed Systems'].map(t => (
            <span key={t} className="tag text-sm px-3 py-1">{t}</span>
          ))}
        </div>

        {/* Tagline */}
        <p className="text-text-secondary text-base mb-8 leading-relaxed">
          Building AI-powered assistive technologies at{' '}
          <span className="text-accent font-medium">Percevia</span>.
          <br />
          Interested in scalable systems that solve real-world problems.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          <a
            id="hero-resume-btn"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <FiFileText size={15} />
            Resume
          </a>
          <a
            id="hero-github-btn"
            href="https://github.com/Yashwardhan-ed"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <FiGithub size={15} />
            GitHub
          </a>
          <a
            id="hero-linkedin-btn"
            href="https://www.linkedin.com/in/yashwardhan-singh-316b51322/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <FiLinkedin size={15} />
            LinkedIn
          </a>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex items-center gap-2 text-text-muted text-xs"
        >
          <FiArrowDown size={13} />
          scroll to explore
        </motion.div>
      </motion.div>
    </section>
  )
}
