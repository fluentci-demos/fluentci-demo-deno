import { Client } from "./deps.ts";

const client = new Client({
  user: Deno.env.get("POSTGRES_USER") || "postgres",
  password: Deno.env.get("POSTGRES_PASSWORD"),
  database: Deno.env.get("POSTGRES_DB") || "denoapi_test",
  hostname: "localhost",
  port: 5432,
});

await client.connect();

await client.queryArray(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  );
`);

export default client;
