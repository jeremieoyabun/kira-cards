# Kira Cards — Official TCG Retailer

Landing page for Kira Cards, Thailand's authorized Pokemon & One Piece TCG retailer.

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Vercel** (deployment)

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deploy to Vercel

### Option 1: Via GitHub (Recommended)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Deploy — done!

### Option 2: Via CLI
```bash
npm i -g vercel
vercel
```

## Project Structure
```
kira-cards/
├── public/
│   └── images/          # Booster & logo assets
├── src/
│   ├── app/
│   │   ├── layout.tsx   # Root layout + metadata
│   │   └── page.tsx     # Landing page (all sections)
│   └── styles/
│       └── globals.css  # All styles
├── package.json
├── next.config.js
└── tsconfig.json
```
