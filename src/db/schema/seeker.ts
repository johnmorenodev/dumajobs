import { pgTable, text } from "drizzle-orm/pg-core";

export const seeker = pgTable("seeker", {
  id: text("id").primaryKey().notNull(),
  email: text("emai").unique().notNull(),
});

export type CreateSeekerDTO = typeof seeker.$inferInsert;
