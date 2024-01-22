import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./auth_user";

export const key = pgTable("user_key", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  hashed_password: text("hashed_password"),
});

export const keyRelations = relations(key, ({ one }) => ({
  user: one(user),
}));
