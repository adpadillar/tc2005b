import { Pool } from "pg";

class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      // Use the Pool class to create a new pool
      idleTimeoutMillis: 0,
      connectionTimeoutMillis: 0,
      connectionString:
        "postgres://postgres.oigisgmjkmrhmylxutpu:WDXN3XeR5qFIYBL6@aws-0-us-west-1.pooler.supabase.com:5432/postgres",
      allowExitOnIdle: false,
      keepAlive: true,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }
}

const db = Database.getInstance().getPool();

export default db;
