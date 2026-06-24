import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "@/db/schema";

function getDatabaseEnv() {
  const url = process.env.TURSO_CONNECTION_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error("TURSO_CONNECTION_URL is not configured");
  }

  return { url, authToken };
}

const { url, authToken } = getDatabaseEnv();

const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });
