"use server";

import { db } from "@/lib/db/index";
import { invoices } from "@/lib/db/schema";
import { count, sql } from "drizzle-orm";

export async function getInvoices() {
  return await db.select().from(invoices).orderBy(invoices.uploadDate);
}

export async function getInvoiceCount() {
  const result = await db.select({ count: count() }).from(invoices);
  return result[0].count;
}

export async function getInvoiceCountByStatus() {
  return await db
    .select({
      status: invoices.status,
      count: count(),
    })
    .from(invoices)
    .groupBy(invoices.status);
}

export async function getInvoiceTotalsByVendor() {
  return await db
    .select({
      vendor: invoices.vendorName,
      total: sql<number>`SUM(${invoices.totalAmount})`.as("total"),
    })
    .from(invoices)
    .groupBy(invoices.vendorName);
}

export async function getInvoiceCountByDate() {
  return await db
    .select({
      date: invoices.uploadDate,
      count: count(),
    })
    .from(invoices)
    .groupBy(invoices.uploadDate);
}

export async function getInvoiceCountByMonth() {
  return await db.execute(
    sql`
    SELECT 
      TO_CHAR(${invoices.uploadDate}, 'YYYY-MM') AS month,
      COUNT(*) AS count
    FROM ${invoices}
    GROUP BY month
    ORDER BY month;
  `
  );
}