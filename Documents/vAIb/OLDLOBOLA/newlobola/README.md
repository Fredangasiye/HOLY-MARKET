# 🚀 Mzansi Football Eyes - Gamified Football Platform

A comprehensive gamified football scouting platform for South Africa's rising stars! Level up your game with achievements, quests, leaderboards, and AI-powered guidance.

## 🎮 Features

- **Gamified Player Profiles** with levels, XP, and rarity tiers
- **Achievement System** with 12+ achievements across 6 categories
- **Quest System** with daily, weekly, and special challenges
- **Leaderboards** with multiple ranking types
- **AI-Powered Uncle Scout** for guidance and advice
- **Real-time Notifications** for achievements and quests
- **Beautiful UI** with custom animations and effects

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: Wouter
- **State Management**: React Query
- **Authentication**: Supabase
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd newlobola
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
newlobola/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── achievement-system.tsx
│   │   │   ├── quest-system.tsx
│   │   │   ├── leaderboard.tsx
│   │   │   ├── notification-system.tsx
│   │   │   ├── gamified-player-profile.tsx
│   │   │   └── uncle-scout.tsx
│   │   ├── pages/            # Page components
│   │   ├── lib/              # Utilities and configurations
│   │   └── main.tsx          # App entry point
│   └── index.html
├── shared/                   # Shared types and schemas
├── package.json
├── vite.config.ts
└── tailwind.config.cjs
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎮 Gamification Features

### Player Profiles
- Level system (1-100)
- Rarity tiers (Common to Legendary)
- XP progression
- Animated 3D frames
- Stats visualization

### Achievements
- **Technical**: Video uploads, skill improvements
- **Tactical**: Scout evaluations, ratings
- **Physical**: Fitness milestones
- **Social**: Community engagement
- **Scouting**: Club contacts, trials
- **Special**: Platform milestones

### Quests
- **Daily Quests**: Refresh at midnight
- **Weekly Quests**: Refresh on Sundays
- **Special Quests**: One-time achievements
- Difficulty levels (Easy, Medium, Hard)
- Time-limited challenges

### Leaderboards
- Overall rankings
- Monthly champions
- Weekly winners
- Most viewed players
- Most liked players
- Most active creators

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Green (#10B981)
- **Accent**: Purple (#8B5CF6)
- **Warning**: Yellow (#F59E0B)
- **Success**: Green (#059669)

### Animations
- Pulse glow effects
- Bounce animations
- Achievement unlocks
- XP gain animations
- Level up celebrations

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Tailwind Configuration
The project uses Tailwind CSS with custom animations and utilities defined in `client/src/index.css`.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the [GAMIFICATION_FEATURES.md](./GAMIFICATION_FEATURES.md) for detailed feature documentation
- Open an issue on GitHub
- Contact the development team

---

**Mzansi Football Eyes** - Level up your football game! 🚀⚽ 