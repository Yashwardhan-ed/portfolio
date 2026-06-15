import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion'

const TYPEAHEAD_ARCH = `
  ┌─────────────────────────────────┐
  │           Client Request        │
  └──────────────┬──────────────────┘
                 │
                 ▼
  ┌─────────────────────────────────┐
  │         Express API Layer       │
  │     (Rate limiting, routing)    │
  └──────────────┬──────────────────┘
                 │
                 ▼
  ┌─────────────────────────────────┐
  │       LRU Cache (In-memory)     │   ← L1: ~1ms hit
  │      capacity: 1000 entries     │
  └──────────────┬──────────────────┘
                 │ miss
                 ▼
  ┌─────────────────────────────────┐
  │     Redis Cluster (Strings)     │   ← L2: ~3–5ms hit
  │   Consistent Hashing (3 nodes) │
  └──────────────┬──────────────────┘
                 │ miss
                 ▼
  ┌─────────────────────────────────┐
  │       PostgreSQL (Source)       │   ← L3: ~20–50ms
  │     Trigram index on terms      │
  └─────────────────────────────────┘
`

const projects = [
  {
    id: 'typeahead',
    title: 'Distributed TypeAhead Search Engine',
    stack: ['Node.js', 'Redis', 'PostgreSQL', 'Docker', 'Express'],
    description:
      'A production-grade prefix search system with multi-level caching, consistent hashing, and Dockerized multi-node architecture. Designed to handle thousands of concurrent autocomplete queries with sub-5ms median latency at L2.',
    highlights: [
      'Prefix search using Redis Strings with O(1) key-based lookups',
      'LRU cache (L1) → Redis Cluster (L2) → PostgreSQL (L3) cache hierarchy',
      'Consistent hashing across 3 Redis nodes for horizontal scaling',
      'Dockerized multi-node setup with automatic failover',
      'Trigram index on PostgreSQL for fuzzy fallback search',
    ],
    architecture: TYPEAHEAD_ARCH,
    metrics: [
      { value: '< 1ms', label: 'L1 Cache hit' },
      { value: '< 5ms', label: 'L2 Cache hit' },
      { value: '87%', label: 'Cache hit rate' },
    ],
    github: 'https://github.com/Yashwardhan-ed/TypeAhead',
    deepDive: [
      {
        title: 'Problem Statement',
        type: 'text',
        content:
          'Build a scalable autocomplete system that can serve prefix-search results with sub-10ms latency under high concurrency. The core challenge: relational databases are too slow for interactive autocomplete, but a naive in-memory cache doesn\'t scale across nodes.',
      },
      {
        title: 'Design Decision: Redis Strings vs. Trie',
        type: 'comparison',
        items: [
          {
            name: 'Trie (in-memory)',
            pros: ['O(prefix length) lookup', 'Very fast for exact prefix'],
            cons: ['Huge memory overhead for large datasets', 'Not persistent — loss on restart', 'Single-node only'],
            chosen: false,
          },
          {
            name: 'Redis Strings',
            pros: ['Persistent + distributed', 'O(1) key lookup by prefix', 'Scales horizontally with consistent hashing'],
            cons: ['Requires prefix enumeration for suggestions', 'Network hop required'],
            chosen: true,
          },
        ],
      },
      {
        title: 'Caching Strategy',
        type: 'text',
        content:
          'Three-tier cache: (1) LRU in-memory for hot prefixes (<1ms), (2) Redis Strings per shard for warm prefixes (<5ms), (3) PostgreSQL with trigram index as source of truth (~30ms). Each prefix key maps to a serialized list of top-N suggestions. On write, all three layers are invalidated. The LRU evicts the least-recently-used entry to keep memory bounded.',
      },
      {
        title: 'Consistent Hashing',
        type: 'code',
        content:
`// Each Redis node is placed at multiple virtual points on the hash ring
// to ensure even distribution when nodes are added/removed.

const ring = new ConsistentHashRing(virtualNodes = 150)
ring.addNode('redis-node-1:6379')
ring.addNode('redis-node-2:6379')
ring.addNode('redis-node-3:6379')

// Lookup: hash the prefix → find nearest node clockwise
const node = ring.getNode(prefix)  // e.g. "ca" → redis-node-2`,
      },
      {
        title: 'Benchmarks',
        type: 'table',
        headers: ['Scenario', 'p50', 'p95', 'p99'],
        rows: [
          ['L1 cache hit', '0.4ms', '0.9ms', '1.2ms'],
          ['L2 cache hit', '3.1ms', '6.2ms', '9.4ms'],
          ['DB fallback', '22ms', '48ms', '71ms'],
          ['Cold start', '28ms', '55ms', '82ms'],
        ],
      },
      {
        title: 'Future Improvements',
        type: 'list',
        items: [
          'Bloom filter at API layer to skip cache lookup for guaranteed misses',
          'Read-through cache population to warm up on first miss',
          'Weighted scoring: combine frequency rank + recency for suggestion ordering',
          'Write-ahead log (WAL) for cache invalidation across nodes',
        ],
      },
    ],
  },
  {
    id: 'disaster-tweets',
    title: 'Natural Disaster Tweets Classification',
    stack: ['PyTorch', 'LSTM', 'Transformer', 'GloVe', 'scikit-learn', 'Python'],
    description:
      'Kaggle NLP competition: classify tweets as reporting real natural disasters vs. metaphorical usage. Built and compared two model architectures — an LSTM with GloVe embeddings and a custom Transformer encoder.',
    highlights: [
      'LSTM with GloVe Twitter 50d embeddings and custom vocabulary generation',
      'Transformer encoder with GloVe Twitter 200d for richer contextual representations',
      'Custom tokenizer and vocabulary built from training corpus',
      'Achieved F1-score of 77.26 on test set',
    ],
    modelTable: {
      headers: ['Model', 'Embedding', 'F1 Score', 'Accuracy', 'Params'],
      rows: [
        ['LSTM (BiDir)', 'GloVe 50d', '74.81', '81.3%', '~2.1M'],
        ['Transformer Enc', 'GloVe 200d', '77.26', '83.9%', '~4.8M'],
        ['Baseline (TF-IDF + LR)', '—', '70.12', '78.6%', '<1M'],
      ],
    },
    metrics: [
      { value: '77.26', label: 'Best F1 Score' },
      { value: '83.9%', label: 'Accuracy' },
      { value: '2', label: 'Models built' },
    ],
    github: 'https://github.com/yashwardhan/disaster-tweets',
    deepDive: [
      {
        title: 'Why Transformer outperformed LSTM',
        type: 'text',
        content:
          'Tweets have short, non-sequential context — self-attention captures long-range dependency better than the sequential bottleneck of LSTM hidden states. Additionally, GloVe 200d provides richer semantic relationships, and the Transformer\'s multi-head attention allowed the model to simultaneously attend to disaster keywords, location terms, and urgency markers.',
      },
      {
        title: 'Key Preprocessing Decisions',
        type: 'list',
        items: [
          'Lowercased and removed URLs, @mentions, and HTML entities',
          'Kept hashtags (#wildfire) since they are strong disaster signals',
          'Built custom vocabulary from training set — OOV mapped to GloVe\'s <unk> vector',
          'GloVe embedding matrix frozen for first 3 epochs, then fine-tuned at 1/10th LR',
        ],
      },
      {
        title: 'Model Architecture: Transformer Encoder',
        type: 'code',
        content:
`class DisasterTransformer(nn.Module):
    def __init__(self, vocab_size, embed_dim=200, nhead=4, nlayers=2):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        # Load pretrained GloVe weights
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=embed_dim, nhead=nhead, dim_feedforward=512
        )
        self.transformer = nn.TransformerEncoder(encoder_layer, nlayers)
        self.classifier = nn.Linear(embed_dim, 1)

    def forward(self, x):
        x = self.embedding(x)           # (B, T, D)
        x = self.transformer(x)         # attend across tokens
        x = x.mean(dim=1)               # mean pooling
        return self.classifier(x)       # binary output`,
      },
    ],
  },
  {
    id: 'slack-rl',
    title: 'Slack Clone for RL Environment Training',
    stack: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'Express'],
    description:
      'A real-time communication platform built as an environment for multi-agent reinforcement learning experiments. Designed to allow RL agents to interact via structured message channels, simulating human communication dynamics.',
    highlights: [
      'WebSocket-based messaging with persistent conversation history',
      'Dynamic chat room creation and management via REST API',
      'MongoDB for persistent conversation storage with efficient querying',
      'Structured message format suitable for RL reward signals',
    ],
    metrics: [
      { value: 'WS', label: 'Real-time protocol' },
      { value: 'Multi', label: 'Agent support' },
      { value: 'REST', label: 'Channel API' },
    ],
    github: 'https://github.com/yashwardhan/slack-rl-env',
    deepDive: [
      {
        title: 'Why Build a Slack Clone for RL?',
        type: 'text',
        content:
          'Most RL environments (OpenAI Gym, etc.) are grid-worlds or game simulations. Multi-agent NLP research requires environments where agents exchange natural language. Building a real-time chat infrastructure allowed us to run experiments where RL agents learn communication strategies by interacting in structured channels.',
      },
      {
        title: 'Agent API Design',
        type: 'list',
        items: [
          'Each agent authenticates with a JWT token and has an assigned channel',
          'Agents poll /observations endpoint for new messages in their context window',
          'Actions are POST requests to /send — treated as environment steps',
          'Reward signals computed server-side based on task-specific metrics (e.g., information sharing)',
        ],
      },
    ],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section-container border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Work</p>
        <h2 className="section-title">Projects</h2>
      </motion.div>

      <div className="space-y-6">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            featured={i === 0}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}
