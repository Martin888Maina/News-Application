# News Application

A full-stack news search and discovery app powered by [NewsAPI.org](https://newsapi.org).
Browse top headlines on load, search across 150,000+ sources, filter by date range,
language, and sort order, and click through to read the full article.

**Live:** https://news.martinmaina.dev

## Features

- Top headlines on first load (no search required)
- Full-text search with 400ms debounce
- Filters: sort (newest / popularity / relevancy), language (en / es / fr / de / it / pt), from/to date
- "Load more" pagination
- Responsive grid (single column under 600px)
- Lazy-loaded images with inline SVG fallback for missing/broken thumbnails
- Keyboard-friendly with visible focus rings
- The NewsAPI key never reaches the browser — all calls are proxied through the Node backend

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React 19 + Vite, pure CSS (no UI framework) |
| Backend | Node.js + Express, axios for upstream calls |
| Security | helmet, express-rate-limit, env-driven CORS |
| Deployment | DigitalOcean Droplet · Nginx reverse proxy · PM2 · Let's Encrypt |

## Local Development

### Prerequisites

- Node.js 18+
- A NewsAPI.org API key (free tier is fine)

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Open .env and set NEWS_API_KEY to your real key
npm run dev
```

Runs on http://localhost:5000. Health check: http://localhost:5000/api/health

### Frontend

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs on http://localhost:5173 with a dev proxy that forwards `/api/*` to the backend.

## Production Build (single-server)

In production, one Node process serves both the API and the built React app:

```bash
# Build the frontend
cd frontend && npm run build

# Run the backend in production mode
cd ../backend
NODE_ENV=production node src/server.js
```

Open http://localhost:5000 — the React app and the API are served from the same origin.

## API Reference

All routes are proxied through `/api/news/*` so the upstream key stays on the server.

| Method | Path | Notes |
|---|---|---|
| `GET` | `/api/health` | Returns `{ status, timestamp }` |
| `GET` | `/api/news/everything?q=...&from=...&to=...&sortBy=...&language=...&pageSize=...&page=...` | NewsAPI `/v2/everything` |
| `GET` | `/api/news/top-headlines?country=...&category=...&pageSize=...&page=...` | NewsAPI `/v2/top-headlines` |
| `GET` | `/api/news/sources?language=...&country=...&category=...` | NewsAPI `/v2/sources` |

Rate limiter: 100 requests per 15 minutes per IP on `/api/*`.

## Environment Variables

### `backend/.env`
```
PORT=5000
NODE_ENV=development
NEWS_API_KEY=<your key>
NEWS_API_BASE_URL=https://newsapi.org/v2
CORS_ORIGIN=http://localhost:5173
```

### `frontend/.env`
```
VITE_API_BASE_URL=/api
```

## License

MIT — see [LICENSE.txt](LICENSE.txt).
