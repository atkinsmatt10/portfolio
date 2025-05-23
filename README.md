# Portfolio

Personal portfolio built with Next.js, TypeScript, and Tailwind CSS featuring smooth page animations powered by Motion.dev.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Motion.dev** - Modern React animation library for smooth page transitions
- **MDX** - Markdown with JSX for blog content
- **Vercel Analytics** - Performance tracking

## Features

- ✨ **Smooth Page Animations** - Beautiful slide-in transitions on page load using Motion.dev
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 📝 **MDX Blog** - Write blog posts in Markdown with React components
- 🌤️ **Live Weather** - Real-time weather data for Philadelphia
- 📊 **Analytics** - Performance tracking with Vercel Analytics

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Animation Details

The site uses [Motion.dev](https://motion.dev/docs/react-animation) for elegant page transitions:

- **Page Transition**: Smooth slide-in from bottom with fade effect
- **Staggered Sections**: Each content section animates in sequence with progressive delays
- **Custom Easing**: Natural motion curves for professional feel
- **Performance Optimized**: Hardware-accelerated transforms for smooth 60fps animations

Components:
- `PageTransition` - Wraps entire page content
- `AnimatedSection` - Individual section animations with customizable delays 