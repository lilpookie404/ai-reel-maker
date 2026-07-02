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

- `/videos/demo-1.mp4`: final mix
- `/videos/demo-2.mp4`: raw cut

## Vercel

When deploying from the repository root, set the Vercel root directory to `web`.
No environment variables are required for this static frontend demo.
The frontend does not call the FastAPI backend or use API tokens.

Deployment checklist:

- Root Directory: `web`
- Build Command: `npm run build`
- Install Command: `npm install`
- Output: Next.js default
- Environment Variables: none for the frontend

After deployment, verify that the homepage loads and both `/videos/demo-1.mp4` and
`/videos/demo-2.mp4` play from the static site.
