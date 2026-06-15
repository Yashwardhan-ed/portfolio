import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import DeepDive from './DeepDive'

export default function ProjectCard({ project, featured = false, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`card ${featured ? 'border-accent/30 bg-surface-2' : ''}`}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
        <div>
          {featured && (
            <p className="text-xs font-mono text-accent mb-1">Featured Project</p>
          )}
          <h3 className="text-text-primary font-semibold text-lg">{project.title}</h3>
        </div>
        <div className="flex items-center gap-3">
          {project.github && (
            <a
              id={`project-github-${project.id}`}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="GitHub"
            >
              <FiGithub size={17} />
            </a>
          )}
          {project.demo && (
            <a
              id={`project-demo-${project.id}`}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="Live demo"
            >
              <FiExternalLink size={17} />
            </a>
          )}
        </div>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Bullet highlights */}
      {project.highlights && (
        <ul className="space-y-1.5 mb-4">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
              <span className="text-accent mt-0.5 shrink-0">—</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Architecture diagram */}
      {project.architecture && (
        <div className="mb-4 rounded-lg bg-surface-3 border border-border p-4">
          <p className="text-xs font-mono text-text-muted mb-3 uppercase tracking-widest">
            Architecture
          </p>
          <pre className="font-mono text-xs text-text-secondary leading-relaxed overflow-x-auto">
            {project.architecture}
          </pre>
        </div>
      )}

      {/* Metrics */}
      {project.metrics && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {project.metrics.map((m, i) => (
            <div key={i} className="rounded-lg bg-surface-3 border border-border p-3 text-center">
              <p className="text-lg font-semibold text-accent font-mono">{m.value}</p>
              <p className="text-xs text-text-muted mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Model comparison table (ML projects) */}
      {project.modelTable && (
        <div className="mb-4 overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-border">
                {project.modelTable.headers.map((h, i) => (
                  <th key={i} className="text-left py-2 pr-4 text-text-secondary font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {project.modelTable.rows.map((row, i) => (
                <tr key={i} className="border-b border-border/50">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`py-2 pr-4 ${j === 0 ? 'text-text-primary' : 'text-text-secondary'}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Engineering Deep Dive */}
      {project.deepDive && <DeepDive project={project} />}
    </motion.article>
  )
}
