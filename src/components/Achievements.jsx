import { motion } from 'framer-motion'
import { FiAward, FiExternalLink } from 'react-icons/fi'

const achievements = [
  {
    id: 'uipath-agenthack-2026',
    title: 'UiPath AgentHack 2026',
    type: 'Grand Finalist',
    date: 'July 2026',
    description:
      'Selected as a global finalist for Percevia — AI-powered smart glasses for visually impaired users. Qualified for the Grand Finale to showcase the real-time computer vision pipeline and live interactive demo to the UiPath jury panel.',
    highlights: [
      'Project: Percevia — Real-time AI assistive smart glasses',
      'Advanced to the Grand Finale for live demo presentation & jury Q&A',
      'Featured on the official Devpost hackathon gallery',
    ],
    tags: ['UiPath', 'AgentHack', 'AI Agents', 'Assistive Tech', 'Computer Vision', 'Devpost'],
    link: 'https://devpost.com/software/percevia-8kb46z?ref_content=my-projects-tab&ref_feature=my_projects',
  },
  {
    id: 'scaler-hackathon',
    title: 'Scaler AI & RL Hackathon',
    type: 'Hackathon',
    date: '2024',
    description:
      'Participated in a 4-member team developing a Slack-like communication environment for multi-agent reinforcement learning experiments. Built the full-stack real-time messaging platform (React + Node.js + MongoDB + WebSocket) that served as the RL training environment.',
    highlights: [
      'Designed agent API interface for message observation and action dispatch',
      'Implemented WebSocket-based real-time message delivery',
      'Built persistent conversation store for replay and trajectory analysis',
    ],
    tags: ['Reinforcement Learning', 'Multi-Agent Systems', 'WebSocket', 'React', 'Node.js'],
  },
  {
    id: 'kaggle-nlp',
    title: 'Kaggle NLP Competition — Natural Disaster Tweets',
    type: 'Competition',
    date: '2024',
    description:
      'Independently built and compared two NLP architectures (LSTM + GloVe 50d and Transformer Encoder + GloVe 200d) for binary tweet classification. Achieved F1-score of 77.26 with the Transformer model.',
    highlights: [
      'Outperformed TF-IDF + Logistic Regression baseline by +7.14 F1 points',
      'Built custom vocabulary and tokenizer pipeline from scratch',
      'Implemented both architectures independently in PyTorch',
    ],
    tags: ['Kaggle', 'NLP', 'PyTorch', 'LSTM', 'Transformer', 'GloVe'],
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="section-container border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Recognition</p>
        <h2 className="section-title">Achievements &amp; Competitions</h2>

        <div className="space-y-5">
          {achievements.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <FiAward size={15} className="text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-text-primary font-semibold">{item.title}</h3>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-medium"
                        >
                          Devpost <FiExternalLink size={12} />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="tag text-xs">{item.type}</span>
                      <span className="font-mono text-xs text-text-muted">{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                {item.description}
              </p>

              <ul className="space-y-1.5 mb-3">
                {item.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-accent mt-0.5 shrink-0">—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {item.tags.map(tag => (
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
