import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="section-container border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">About</p>
        <h2 className="section-title">About Me</h2>

        <div className="max-w-2xl space-y-4 text-text-secondary text-base leading-relaxed">
          <p>
            I'm a Computer Science student at{' '}
            <span className="text-text-primary font-medium">BITS Pilani Bengaluru</span> and a
            co-founder at{' '}
            <span className="text-accent font-medium">Percevia</span>, where we're building
            AI-powered smart glasses for visually impaired users.
          </p>
          <p>
            I'm interested in{' '}
            <span className="text-text-primary">backend engineering</span>,{' '}
            <span className="text-text-primary">distributed systems</span>, and{' '}
            <span className="text-text-primary">machine learning</span>. I enjoy designing
            scalable architectures and reasoning about tradeoffs — from caching layers to model
            selection.
          </p>
          <p>
            Outside of coursework, I spend time on Kaggle competitions, contribute to open-source
            projects, and participate in hackathons focused on AI and systems.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
