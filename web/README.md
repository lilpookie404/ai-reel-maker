# Vidora Frontend

Vidora is a static, Vercel-ready demo for the AI reel workflow in this repository.
It presents the generated videos as product proof without calling the FastAPI backend
or requiring Replicate API tokens.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm test
npm run lint
npm run build
```

## Demo Videos

The videos are served from `public/videos/`:

- `/videos/demo-1.mp4`: finished reel with AI-added sound effects
- `/videos/demo-2.mp4`: raw generated reel without audio

## Vercel

When deploying from the repository root, set the Vercel root directory to `web`.
No environment variables are required for this static frontend demo.
