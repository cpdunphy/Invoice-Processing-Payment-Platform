import { db } from "@/db";
import { invoices } from "@/db/schema"; 
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { invoiceNumber, vendorName, totalAmount, dueDate, fileUrl, status, reviewed } = await req.json();

    // Insert extracted invoice data into the invoices table
    const [newInvoice] = await db.insert(invoices).values({
      invoiceNumber,  
      vendorName,     
      totalAmount,    
      dueDate: new Date(dueDate),
      fileUrl,        // S3 URL
      status: status || "Pending", // Default to "Pending" if not provided
      reviewed: reviewed || false, // Default to false
    }).returning();

    return NextResponse.json({ message: "Invoice stored successfully", invoice: newInvoice });
  } catch (error) {
    console.error("Error inserting invoice:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
