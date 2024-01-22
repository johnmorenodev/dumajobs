import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { session } from "./session";
import { key } from "./auth_key";

export const user = pgTable("auth_user", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  session: many(session),
  key: many(key),
}));
