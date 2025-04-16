"use server";

import { db } from "@/lib/db";
import { invoices } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

interface StoreInvoiceParams {
  vendorName: string;
  fileUrl: string;
  status: "pending" | "Done";
  totalAmount: number;
  dueDate: string; // ISO format
  invoiceNumber: string;
}

export async function storeInvoice(data: StoreInvoiceParams) {
  try {
    await db.insert(invoices).values({
      vendorName: data.vendorName,
      fileUrl: data.fileUrl,
      status: data.status,
      totalAmount: data.totalAmount,
      dueDate: new Date(data.dueDate),
      invoiceNumber: data.invoiceNumber,
      reviewed: false,
    });

    return { success: true };
  } catch (error) {
    console.error("DB Insert Error:", error);
    return { success: false, error: "Failed to store invoice" };
  }
}
