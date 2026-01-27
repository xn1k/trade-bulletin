# Setup Instructions

## Important: Database Setup Required

Before you can create events, you **must** run the database schema in Supabase.

### Step 1: Access Supabase SQL Editor

1. Go to your Supabase project: https://app.supabase.com
2. Click on your project
3. In the left sidebar, click on **SQL Editor**
4. Click **New query**

### Step 2: Run the Schema

1. Open the file `supabase-schema.sql` in this project
2. Copy ALL the contents (Ctrl+A, Ctrl+C)
3. Paste into the Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter)

You should see a success message like "Success. No rows returned"

### Step 3: Verify Tables Were Created

1. In Supabase, click **Table Editor** in the left sidebar
2. You should see these tables:
   - `profiles`
   - `events`
   - `items`
   - `messages`

### Step 4: Enable Realtime (for Big Screen mode)

1. In Supabase, go to **Database** > **Replication**
2. Find the `items` table
3. Toggle it **ON** for Realtime
4. Find the `messages` table
5. Toggle it **ON** for Realtime

### Common Issues

#### "invalid input syntax for type uuid"
This means the tables don't exist yet. Run the SQL schema from `supabase-schema.sql`.

#### "permission denied for table"
This means Row Level Security is blocking access. The schema includes RLS policies, so make sure you ran the ENTIRE schema file.

#### Events/Items not appearing
Check that you're logged in with the same Google account and that the tables were created successfully.

### Testing the Setup

After running the schema:

1. Try logging in with Google
2. Try creating an event
3. If it works, you'll be redirected to the event page
4. Try adding a card to test the full flow
