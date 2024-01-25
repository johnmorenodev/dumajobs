import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const DB_URL = process.env.DB_URL!;

// for query purposes
const queryClient = postgres(DB_URL);
export const db = drizzle(queryClient);
