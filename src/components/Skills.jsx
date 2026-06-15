import { motion } from 'framer-motion'

const skills = [
  {
    category: 'Languages',
    items: ['Java', 'Python', 'JavaScript', 'SQL', 'C'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Redis', 'PostgreSQL', 'MongoDB', 'WebSocket'],
  },
  {
    category: 'Frontend',
    items: ['React', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    category: 'Machine Learning',
    items: ['PyTorch', 'scikit-learn', 'NumPy', 'pandas'],
  },
  {
    category: 'Developer Tools',
    items: ['Docker', 'Git', 'Linux', 'Vite', 'VS Code'],
  },
  {
    category: 'Concepts',
    items: ['Distributed Systems', 'Consistent Hashing', 'Caching', 'REST APIs', 'NLP'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section-container border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Toolkit</p>
        <h2 className="section-title">Technical Skills</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="card"
            >
              <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map(item => (
                  <span key={item} className="tag text-xs px-2 py-1">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
