import { pgTable, text } from "drizzle-orm/pg-core";

export const employer = pgTable("employer", {
  id: text("id").primaryKey().notNull(),
  email: text("emai").unique().notNull(),
});

export type CreateEmployerDTO = typeof employer.$inferInsert;
