import { motion } from 'framer-motion'

const experiences = [
  {
    id: 'percevia',
    role: 'Co-founder',
    company: 'Percevia',
    period: '2024 – Present',
    location: 'Bengaluru, India',
    description:
      'Building AI-powered smart glasses for visually impaired users. Percevia combines computer vision, real-time inference, and embedded AI to provide contextual audio descriptions of the user\'s environment.',
    highlights: [
      'Designed and implemented the computer vision pipeline for object and scene recognition',
      'Built real-time inference system optimized for edge hardware (Raspberry Pi / Jetson Nano)',
      'Led dataset curation: collection, labeling, and augmentation for visually impaired-specific contexts',
      'Architected the audio feedback module with context-aware narration',
      'Coordinating cross-functional team across hardware, ML, and product',
    ],
    tags: ['Computer Vision', 'Real-time Inference', 'Embedded AI', 'Dataset Curation', 'PyTorch'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section-container border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Experience</p>
        <h2 className="section-title">Work Experience</h2>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card border-accent/20"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-text-primary font-semibold text-lg">
                    {exp.role}{' '}
                    <span className="text-accent">@ {exp.company}</span>
                  </h3>
                  <p className="text-text-muted text-sm mt-0.5">{exp.location}</p>
                </div>
                <span className="font-mono text-xs text-text-muted shrink-0 mt-1">
                  {exp.period}
                </span>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {exp.description}
              </p>

              <ul className="space-y-2 mb-4">
                {exp.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-accent mt-0.5 shrink-0">→</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
