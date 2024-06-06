import { Pool } from "pg";

const db = new Pool({
  // Use the Pool class to create a new pool
  connectionString:
    "postgres://postgres.oigisgmjkmrhmylxutpu:WDXN3XeR5qFIYBL6@aws-0-us-west-1.pooler.supabase.com:5432/postgres",
});

export default db;
