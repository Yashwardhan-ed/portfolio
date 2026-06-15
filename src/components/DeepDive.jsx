import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export default function DeepDive({ project }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-5 border-t border-border pt-4">
      <button
        id={`deepdive-toggle-${project.id}`}
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 text-xs font-mono text-accent hover:text-accent-light transition-colors"
      >
        {open ? <FiChevronUp size={13} /> : <FiChevronDown size={13} />}
        Engineering Deep Dive
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-6 text-sm">
              {project.deepDive.map((block, i) => (
                <div key={i}>
                  <h4 className="text-text-primary font-semibold mb-2">{block.title}</h4>
                  {block.type === 'text' && (
                    <p className="text-text-secondary leading-relaxed">{block.content}</p>
                  )}
                  {block.type === 'comparison' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {block.items.map((item, j) => (
                        <div
                          key={j}
                          className={`rounded-lg p-3 border ${
                            item.chosen
                              ? 'border-accent/40 bg-accent/5'
                              : 'border-border bg-surface-3'
                          }`}
                        >
                          <p className="font-mono text-xs text-text-primary mb-1">
                            {item.name}
                            {item.chosen && (
                              <span className="ml-2 text-accent">← chosen</span>
                            )}
                          </p>
                          <ul className="space-y-0.5">
                            {item.pros.map((p, k) => (
                              <li key={k} className="text-text-secondary text-xs">
                                <span className="text-green-400">+</span> {p}
                              </li>
                            ))}
                            {item.cons.map((c, k) => (
                              <li key={k} className="text-text-secondary text-xs">
                                <span className="text-red-400">-</span> {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  {block.type === 'table' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs font-mono border-collapse">
                        <thead>
                          <tr className="border-b border-border">
                            {block.headers.map((h, j) => (
                              <th key={j} className="text-left py-2 pr-4 text-text-secondary font-medium">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.map((row, j) => (
                            <tr key={j} className="border-b border-border/50">
                              {row.map((cell, k) => (
                                <td key={k} className="py-2 pr-4 text-text-secondary">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {block.type === 'code' && (
                    <pre className="font-mono text-xs bg-surface-3 rounded-lg p-4 overflow-x-auto text-text-secondary border border-border leading-relaxed">
                      {block.content}
                    </pre>
                  )}
                  {block.type === 'list' && (
                    <ul className="space-y-1.5">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex gap-2 text-text-secondary">
                          <span className="text-accent mt-0.5">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
