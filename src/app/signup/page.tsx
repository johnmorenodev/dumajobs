import { auth } from "@clerk/nextjs";
import { userRole } from "../lib/utils/utils";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = auth();

  if (userId) {
    if (userRole === "EMPLOYER") redirect("/employer");
    if (userRole === "SEEKER") redirect("/seeker");
  } else {
    redirect("/signup/seeker");
  }
}
