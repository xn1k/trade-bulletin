# Trade Bulletin

A real-time digital trade board for local game stores (LGS), built specifically for Magic: The Gathering events.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database & Auth**: Supabase (PostgreSQL + Real-time)
- **Card Data**: Scryfall API
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **QR Codes**: qrcode.react

## Features

- Real-time trade board with live updates
- Card autocomplete powered by Scryfall
- Event management with auto-closing
- User authentication via Google OAuth
- Role-based access (User, Moderator, Admin)
- Big screen display mode with auto-scroll
- In-app messaging system
- QR code generation for events

## Getting Started

### 1. Clone and Install

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy the SQL from `supabase-schema.sql` and run it in the Supabase SQL Editor
3. Enable Google OAuth in Authentication > Providers
4. Copy your project URL and anon key

### 3. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual values:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Project Structure

```
├── app/
│   ├── auth/          # Authentication pages
│   ├── admin/         # Admin dashboard
│   ├── event/[id]/    # Event pages
│   └── layout.tsx     # Root layout
├── components/        # Reusable UI components
├── lib/
│   ├── supabase/      # Supabase client config
│   └── types/         # TypeScript types
└── middleware.ts      # Auth middleware
```

## Database Schema

- **profiles**: User accounts with roles
- **events**: Trading events with start/end times
- **items**: Cards listed for trade (WTB/WTS)
- **messages**: Direct messages between traders

## Key Features Implementation

### Card Autocomplete
Uses Scryfall's autocomplete API to ensure accurate card names and fetch high-res images.

### Event Auto-Close
Events automatically close when their `end_time` is reached. Implement this with a Supabase Edge Function or cron job.

### Big Screen Mode
Navigate to `/event/[id]/display` for a read-only view with auto-scrolling perfect for displaying on a TV at the store.

### Role-Based Permissions
- **Users**: Can create items and send messages
- **Moderators**: Can delete any items or events
- **Admins**: Full access including user role management

## Deploy on Vercel

The easiest way to deploy is with [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repo in Vercel
3. Add your environment variables
4. Deploy

Check the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
