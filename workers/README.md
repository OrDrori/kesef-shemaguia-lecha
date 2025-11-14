# Cloudflare Workers + D1 Database

This directory contains the backend API for Kesef Shemaguia Lecha.

## What's included?

- **`api/index.ts`** - Cloudflare Workers API endpoints
- **`schema.sql`** - D1 database schema
- **`../wrangler.toml`** - Cloudflare Workers configuration

## Features

### Current API Endpoints:

1. **POST /api/analytics** - Track questionnaire completions
2. **POST /api/contact** - Save contact form submissions
3. **GET /api/stats** - Get usage statistics

### Future Features (ready to add):

- User accounts and authentication
- Save questionnaire results
- Admin dashboard
- Email notifications

## Setup Instructions

See the main deployment guide in `/DEPLOYMENT_GUIDE.md`

## Local Development

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create kesef-shemaguia-lecha-db

# Run schema
wrangler d1 execute kesef-shemaguia-lecha-db --file=workers/schema.sql

# Test locally
wrangler dev

# Deploy
wrangler deploy
```

## Database Schema

### `analytics` table
- Tracks questionnaire completions
- Stores answers as JSON for future analysis

### `contacts` table
- Stores contact form submissions
- Can be used for support/feedback

## Security

- CORS enabled for frontend access
- No authentication required for analytics (anonymous)
- Future: Add API keys for admin endpoints
