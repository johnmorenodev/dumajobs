import { CreateUserSchema } from "@/app/signup/signup-form";
import { auth } from "@/auth/lucia";
import { LuciaError } from "lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { values } = await request.json();
  const { username, password } = values;

  try {
    const isValid = CreateUserSchema.parse({ ...values, password: "123" });
  } catch (error) {
    return new Response({ message: "Invalid Data" }, { status: 403 });
  }

  try {
    const user = await auth.createUser({
      key: {
        providerId: "username", // auth method
        providerUserId: username.toLowerCase(), // unique id when using "username" auth method
        password, // hashed by Lucia
      },
      attributes: {
        username,
      },
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/", // redirect to profile page
      },
    });
  } catch (e) {
    // this part depends on the database you're using
    // check for unique constraint error in user table
    if (e instanceof LuciaError && e.message === "AUTH_DUPLICATE_KEY_ID") {
      return NextResponse.json(
        {
          error: "Username already taken",
        },
        {
          status: 403,
        }
      );
    }

    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      {
        status: 500,
      }
    );
  }
};
