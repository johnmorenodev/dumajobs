import { bigint, pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./auth_user";
import { relations } from "drizzle-orm";

export const session = pgTable("user_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  activeExpires: bigint("active_expires", { mode: "number" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: "number" }).notNull(),
});

export const sessionRelation = relations(session, ({ one }) => ({
  user: one(user),
}));
