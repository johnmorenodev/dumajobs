// auth/lucia.ts
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";
import { queryClient } from "@/db/config";

// expect error (see next section)
export const auth = lucia({
  env: "DEV", // "PROD" if deployed to HTTPS
  middleware: nextjs_future(), // NOT nextjs()
  sessionCookie: {
    expires: false,
  },
  adapter: postgresAdapter(queryClient, {
    user: "auth_user",
    key: "user_key",
    session: "user_session",
  }),

  getUserAttributes: (data) => {
    return {
      username: data.username,
    };
  },
});

export type Auth = typeof auth;
