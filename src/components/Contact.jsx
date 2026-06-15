import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'

const links = [
  {
    id: 'contact-email',
    icon: FiMail,
    label: 'Email',
    value: '2006.yws@gmail.com',
    href: 'mailto:2006.yws@gmail.com',
  },
  {
    id: 'contact-github',
    icon: FiGithub,
    label: 'GitHub',
    value: 'github.com/Yashwardhan-ed',
    href: 'https://github.com/Yashwardhan-ed',
  },
  {
    id: 'contact-linkedin',
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/yashwardhan-singh-316b51322',
    href: 'https://www.linkedin.com/in/yashwardhan-singh-316b51322/',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section-container border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Get in Touch</p>
        <h2 className="section-title">Contact</h2>

        <p className="text-text-secondary text-base mb-8 max-w-xl leading-relaxed">
          I'm open to internships, research collaborations, and interesting engineering problems.
          Feel free to reach out.
        </p>

        <div className="space-y-3 mb-12">
          {links.map((link, i) => (
            <motion.a
              key={link.id}
              id={link.id}
              href={link.href}
              target={link.id !== 'contact-email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-4 p-4 card hover:border-accent/40 transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-surface-3 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                <link.icon size={16} className="text-text-secondary group-hover:text-accent transition-colors" />
              </div>
              <div>
                <p className="text-xs text-text-muted mb-0.5">{link.label}</p>
                <p className="text-sm text-text-primary font-medium">{link.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-text-muted text-xs font-mono pb-6">
          Built with React + Tailwind · Yashwardhan Singh · 2025
        </p>
      </motion.div>
    </section>
  )
}
