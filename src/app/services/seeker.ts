"use server";

import { db } from "@/db/config";
import { CreateSeekerDTO, seeker } from "@/db/schema/seeker";

export async function createSeeker(seekerValues: CreateSeekerDTO) {
  await db.insert(seeker).values(seekerValues);
}
