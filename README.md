# 🐸 PromQL Froggy

**Learn PromQL by helping a friendly frog solve puzzles!**

Inspired by [Flexbox Froggy](https://flexboxfroggy.com/), PromQL Froggy is an interactive web application that teaches Prometheus Query Language through hands-on, gamified learning experiences.

## 📚 What is PromQL Froggy?

PromQL Froggy is an educational platform designed to help developers, SREs, and DevOps engineers learn PromQL in a fun and engaging way. Each level introduces a new PromQL concept, challenges you to write queries, and rewards you with delightful frog animations when you succeed!

### Key Features

- **10 Progressive Levels**: From basic metric selection to complex aggregations
- **Interactive Learning**: Write real PromQL queries and see instant results
- **Sandbox Mode**: Experiment freely with PromQL without any pressure
- **Real-World Context**: Each level connects to actual alerting scenarios
- **Progress Tracking**: Your progress is saved locally
- **Visual Feedback**: Animated frog companion celebrates your success

## 🎯 Learning Path

### Concepts Covered

1. **Basic Metric Selection** - Understanding metric names
2. **Label Matchers** - Filtering by labels
3. **Multiple Labels** - Complex filtering
4. **Aggregation Functions** - sum(), avg(), count(), max()
5. **Grouping** - Using by() clause
6. **Rate Functions** - rate(), irate() for counters
7. **Alert Context** - How queries connect to real alerts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or download this repository
cd promql-froggy

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development

```bash
# Run dev server with hot reload
npm run dev

# Type check
npm run build

# Preview production build
npm run preview
```

## 🎮 How to Play

1. **Start at Home**: View your progress and learning statistics
2. **Choose a Level**: Select from the level selection screen
3. **Read the Challenge**: Each level explains the concept and mission
4. **Write Your Query**: Use the PromQL editor to craft your solution
5. **Run & Check**: Execute your query and check if it matches the solution
6. **Watch the Frog**: See the frog hop across lily pads when you succeed!
7. **Learn Alert Context**: Understand how each query applies to real monitoring

## 🏗️ Architecture

### Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: CSS Modules + Custom CSS
- **State Management**: React Hooks + Context API
- **Storage**: localStorage for progress tracking

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Button, Card, etc.
│   ├── layout/         # Header, navigation
│   └── level/          # QueryEditor, ResultDisplay, FrogAnimation
├── pages/              # Route pages
│   ├── Home.tsx        # Landing page
│   ├── LevelSelect.tsx # Level selection
│   ├── Level.tsx       # Main game page
│   └── Sandbox.tsx     # Free experimentation
├── data/               # Level definitions and sample metrics
├── engine/             # Mock PromQL execution engine
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

## 🧪 Mock PromQL Engine

This app includes a lightweight mock execution engine that simulates PromQL behavior without requiring an actual Prometheus server. It supports:

- Basic metric selectors
- Label matchers (`{label="value"}`)
- Aggregation operators (sum, avg, count, max, min)
- Grouping with `by()`
- Functions (rate, irate, increase)

**Note**: This is a simplified educational implementation. For production use, always test queries against a real Prometheus instance.

## 🎨 Customization

### Adding New Levels

Edit [src/data/levels.ts](src/data/levels.ts) to add new challenges:

```typescript
{
  id: 11,
  title: 'Your Level Title',
  concept: 'Concept Name',
  description: '🐸 Description of the challenge',
  hint: 'Helpful hint for users',
  sampleMetrics: yourMetrics,
  solutionQuery: 'expected_query',
  alertContext: 'Real-world alert explanation',
}
```

### Adding Sample Metrics

Edit [src/data/sampleMetrics.ts](src/data/sampleMetrics.ts) to create new metric datasets.

## 🤝 Contributing

This is an educational project. Feel free to:

- Add more levels and challenges
- Improve the PromQL parser
- Enhance animations and UI
- Fix bugs and improve documentation
- Share feedback and ideas

## 📝 License

MIT License - Feel free to use this project for learning and teaching PromQL!

## 🙏 Acknowledgments

- Inspired by [Flexbox Froggy](https://flexboxfroggy.com/) by Thomas Park
- Built for the DevOps and SRE community
- Prometheus logo and PromQL are trademarks of the [Cloud Native Computing Foundation](https://www.cncf.io/)

## 🔗 Resources

- [Prometheus Documentation](https://prometheus.io/docs/)
- [PromQL Basics](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [Query Examples](https://prometheus.io/docs/prometheus/latest/querying/examples/)

---

**Happy Learning! 🐸📊**

Made with ❤️ for the monitoring community
