# SuperAgents Landing Page

A modern, dark-themed landing page for SuperAgents built with Next.js 15, React 19, Tailwind CSS v4, and shadcn/ui.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS v4, shadcn/ui
- **Animations**: Framer Motion
- **Particles**: tsparticles (Aceternity-style sparkles)
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout + theme provider
│   │   ├── page.tsx          # Main page composition
│   │   └── globals.css       # Theme CSS variables
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── aceternity/       # Particle effects
│   │   ├── sections/         # Page sections
│   │   └── layout/           # Header/Footer
│   └── lib/
│       ├── utils.ts          # cn() utility
│       └── constants.ts      # Data constants
└── public/                   # Static assets
```

## Deployment

### Vercel (Recommended)

```bash
npx vercel
```

### Static Export

The project is configured for static export by default. Build and deploy the `out` directory to any static host:

```bash
npm run build
# Deploy the `out` folder
```

## Features

- Dark theme with custom CSS variables
- Sparkles particle effect (Aceternity-style)
- Responsive design (mobile-first)
- Framer Motion animations
- SEO optimized with Open Graph tags
- Copy-to-clipboard command functionality
