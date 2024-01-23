"use server";

import { auth } from "@/auth/lucia";
import { CreateUserDTO } from "../signup/signup-form";
import * as context from "next/headers";
import { LuciaError } from "lucia";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export const signup = async (credentials: CreateUserDTO) => {
  const { username, password } = credentials;
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
    const authRequest = auth.handleRequest("POST", context);
    authRequest.setSession(session);

    return { sucess: false };
  } catch (e) {
    return { sucess: false, error: e };
    // this part depends on the database you're using
    // check for unique constraint error in user table
    // if (e instanceof LuciaError && e.message === "AUTH_DUPLICATE_KEY_ID") {
    //   return NextResponse.json(
    //     {
    //       error: "Username already taken",
    //     },
    //     {
    //       status: 403,
    //     }
    //   );
    // }
  }
};
