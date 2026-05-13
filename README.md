# Portfolio

Personal portfolio built with Next.js, TypeScript, and Tailwind CSS featuring smooth page animations powered by Motion.dev.

## Tech Stack

- **Next.js 16** - React framework with App Router and Turbopack builds
- **React 19** - UI runtime
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Motion.dev** - Modern React animation library for smooth page transitions
- **MDX** - Markdown with JSX for blog content
- **Vercel Analytics** - Performance tracking

## Features

- ✨ **Smooth Page Animations** - Beautiful slide-in transitions on page load using Motion.dev
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 📝 **MDX Blog** - Write blog posts in Markdown with React components
- 🎵 **Text-to-Speech** - Stream audio narration of blog posts using ElevenLabs API
- 🌤️ **Live Weather** - Cached weather data for Philadelphia, refreshed every 10 minutes
- 📊 **Analytics** - Performance tracking with Vercel Analytics

## Getting Started

Requires Node.js 22 through 24 and pnpm 10. The repo includes `.tool-versions` for asdf users and a `packageManager` pin for Corepack-compatible installs.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create `.env.local` for local API-backed features:

```bash
# .env.local
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`ELEVENLABS_API_KEY` enables text-to-speech narration. The Philadelphia weather badge uses Open-Meteo and does not require an API key. `NEXT_PUBLIC_SITE_URL` is used when generating RSS links and should be set to the production URL in Vercel.

## Development Commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

`pnpm audit` should return no known vulnerabilities before deploys.

## Animation Details

The site uses [Motion.dev](https://motion.dev/docs/react-animation) for elegant page transitions:

- **Page Transition**: Smooth slide-in from bottom with fade effect
- **Staggered Sections**: Each content section animates in sequence with progressive delays
- **Custom Easing**: Natural motion curves for professional feel
- **Performance Optimized**: Hardware-accelerated transforms for smooth 60fps animations

Components:
- `PageTransition` - Wraps entire page content
- `AnimatedSection` - Individual section animations with customizable delays
