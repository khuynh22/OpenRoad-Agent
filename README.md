# OpenRoad Agent 🚀

> Built for [MLH Hacks for Hackers](https://events.mlh.io/events/13143) - January 2026

A **Hacker Onboarding Platform** that analyzes GitHub repositories and generates personalized contribution roadmaps using AI. Perfect for open source contributors looking for their next project.

## 🌟 Features

- 🔍 **AI-Powered Analysis** - Gemini 2.0 analyzes repository structure and suggests beginner-friendly entry points
- 📊 **Health Metrics** - File churn and bug frequency analytics (Snowflake integration optional)
- 🎙️ **Voice Mentorship** - Optional AI voice guidance using ElevenLabs
- 💾 **Smart Caching** - MongoDB Atlas stores roadmaps for quick retrieval
- 🎨 **Terminal UI** - Hacker-themed dashboard built with Next.js
- 🐳 **Dockerized** - Run the entire stack with `docker-compose up`

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Hono.js on Node.js
- **AI**: Google Gemini 2.0 Flash
- **Database**: MongoDB Atlas
- **Voice**: ElevenLabs TTS (optional)
- **Analytics**: Snowflake (optional)
- **Deployment**: Docker + Docker Compose

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Cloudflare account (for Workers deployment)
- API keys for: GitHub, Gemini, MongoDB Atlas, ElevenLabs (Snowflake optional)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```

2. Set up environment secrets with Wrangler:
   ```bash
   npx wrangler secret put GITHUB_TOKEN
   npx wrangler secret put GEMINI_API_KEY
   npx wrangler secret put MONGODB_URI
   npx wrangler secret put ELEVENLABS_API_KEY
   # Optional Snowflake credentials:
   npx wrangler secret put SNOWFLAKE_ACCOUNT
   npx wrangler secret put SNOWFLAKE_USER
   npx wrangler secret put SNOWFLAKE_PASSWORD
   ```

3. Start the development server:
   ```Quick Start

### Prerequisites

- Docker & Docker Compose
- API keys (GitHub, Gemini, MongoDB required; ElevenLabs and Snowflake optional)

### Setup

1. **Clone and configure environment:**
   ```bash
   git clone <your-repo-url>
   cd OpenRoad-Agent
   cp .env.example .env
   ```

2. **Add your API keys to `.env`:**
   ```env
   GITHUB_TOKEN=ghp_your_token_here
   GEMINI_API_KEY=your_gemini_key_here
   MONGODB_URI=mongodb+srv://...
   ELEVENLABS_API_KEY=your_key_here  # Optional
   ```

3. **Start the application:**
   ```bash
   docker-compose up --build
   ```

4. **Access the dashboard:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8787.",
          "difficulty": "beginner"
        }
      ]
    },
    "healthMetrics": [...],
    "fileTree": [...]
  }
}
```

### `POST /api/voice/mentor`
Generate voice audio for mentor introduction.

**Request:**
```json
{
  "architectureSummary": "...",
  "repoName": "next.js"
}
```

### `GET /api/roadmaps`
List recent roadmaps.

###🎯 How It Works

1. **Enter a GitHub URL** in the search bar
2. **AI analyzes** the repository structure, tech stack, and architecture
3. **Get personalized roadmap** with beginner-friendly entry points ranked by difficulty
4. **View health metrics** showing file stability and bug frequency
5. **Listen to mentor intro** (optional voice guidance)
## 📝 Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Backend | Hono.js on Cloudflare Workers |
| AI | Gemini 1.5 Pro |
| Database | MongoDB Atlas (Data API) |
| Analytics | Snowflake (REST API) |
| Voice | ElevenLabs TTS |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 API Configuration

### Required Environment Variables

| Variable | Description |
|----------|-------------|
| `GITHUB_TOKEN` | GitHub Personal Access Token |
| `GEMINI_API_KEY` | Google AI Studio API key |
| `MONGODB_URI` | MongoDB Atlas connection string |

### Optional Environment Variables

| Variable | Description |
|----------|-------------|
| `ELEVENLABS_API_KEY` | ElevenLabs API key (for voice features) |
| `SNOWFLAKE_ACCOUNT` | Snowflake account (for real metrics) |
| `SNOWFLAKE_USER` | Snowflake username |
| `SNOWFLAKE_PASSWORD` | Snowflake password |

> **Note**: Without Snowflake credentials, the app uses mock health metrics. Without ElevenLabs, voice features are disabled.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built for [MLH Hacks for Hackers 2026](https://events.mlh.io/events/13143)** 🎉