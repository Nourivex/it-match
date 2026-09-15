# Supabase setup

1. Apply `supabase/migrations/202609150001_it_tech_match.sql` to the booth project.
2. Apply `supabase/seed.sql` to publish the versioned booth content.
3. Set these values in the local `.env` file used by Vite:

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-anon-key
```

Use only the publishable/anon key in the browser. Never place a service-role or secret key in Vite environment variables.

Without these values, or while Supabase is unreachable, the game uses the bundled content and queues anonymous session writes locally.
