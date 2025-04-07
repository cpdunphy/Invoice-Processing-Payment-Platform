"use server";

import { db } from "@/lib/db/index";
import { invoices } from "@/lib/db/schema";

export async function getInvoices() {
  return await db.select().from(invoices).orderBy(invoices.uploadDate);
}
