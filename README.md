This is the Buzz Innovations Ltd services site and internal lead generation engine.

## Lead Engine

The `/lead-engine` workspace runs a 3-stage pipeline:

1. Google Places scraper using Text Search and Place Details.
2. Website audit agent with homepage crawl, mobile, speed, CTA, form, booking, SEO, SSL, and design checks.
3. Outreach generator that creates short personalized cold emails and exports CRM-ready CSV files.

Create `.env.local` from `.env.example` and set:

```bash
GOOGLE_PLACES_API_KEY=your_google_places_key
```

For local testing without Google API calls:

```bash
LEAD_ENGINE_MOCK=true
```

Runs are stored under `data/lead-engine/` as JSON plus CSV. To also mirror data to PostgreSQL, install `pg`, set `LEAD_STORAGE=postgres`, and provide `DATABASE_URL`. The app will create `lead_engine_runs` and `lead_engine_records` if they do not exist.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
