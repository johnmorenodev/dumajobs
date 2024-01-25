"use server";

import { db } from "@/db/config";
import { CreateEmployerDTO, employer } from "@/db/schema/employer";

export async function createEmployer(employerData: CreateEmployerDTO) {
  await db.insert(employer).values(employerData);
}
