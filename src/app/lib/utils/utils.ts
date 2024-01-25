import { auth } from "@clerk/nextjs";
import { UserRole } from "../../../../types";

export const checkRole = (role: UserRole) => {
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === role;
};

const { sessionClaims } = auth();
export const userRole = sessionClaims?.metadata.role;
