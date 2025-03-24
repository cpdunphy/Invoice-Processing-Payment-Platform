// Description: This file contains the schema for the database tables.

import { pgTable, uuid, varchar, text, timestamp, decimal, boolean, integer, json } from 'drizzle-orm/pg-core';

// USE-TABLE: For AUTH and ROles
export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(), // Unique user ID
    name: varchar('name', { length: 255 }),      // User's full name
    email: varchar('email', { length: 255 }).unique(), // Email for login
    role: varchar('role', { length: 50 }),       // 'Admin', 'Accountant', 'User'
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

  // INVOICES TABLE - Main invoice data
  export const invoices = pgTable('invoices', {
    id: uuid('id').defaultRandom().primaryKey(),
    vendorName: varchar('vendor_name', { length: 255 }),
    fileUrl: text('file_url'),                            // S3 file location
    uploadDate: timestamp('upload_date').defaultNow(),
    status: varchar('status', { length: 50 }),            // 'Pending', 'Processing', etc.
    totalAmount: decimal('total_amount'),                 // Extracted total
    dueDate: timestamp('due_date'),
    invoiceNumber: varchar('invoice_number', { length: 100 }),
    reviewed: boolean('reviewed').default(false),         // If human reviewed
    createdAt: timestamp('created_at').defaultNow(),
  });
  
// INVOICE ITEMS TABLE - Items in the invoice
export const invoiceItems = pgTable('invoice_items', {
    id: uuid('id').defaultRandom().primaryKey(),
    vendorsName: varchar('vendors_name', { length: 255 }),
    invoiceId: uuid('invoice_id').references(() => invoices.id), // FK to invoice
    description: text('description'),
    totalPrice: decimal('total_price'),
  });

  // AUDIT LOG TABLE - Record of changes to invoices
export const auditLogs = pgTable('audit_logs', {
    id: uuid('id').defaultRandom().primaryKey(),
    invoiceId: uuid('invoice_id').references(() => invoices.id),
    userId: uuid('user_id').references(() => users.id),
    action: varchar('action', { length: 50 }),      // 'UPLOAD', 'PROCESS', 'EDIT'
    createdAt: timestamp('created_at').defaultNow(),
  });

    // VENDORS TABLE - Optional vendor data linked to invoices
    export const vendors = pgTable('vendors', {
        id: uuid('id').defaultRandom().primaryKey(), 
        name: varchar('name', { length: 255 }),
        address: text('address'),
        email: varchar('email', { length: 255 }),
        phone: varchar('phone', { length: 50 }),
        createdAt: timestamp('created_at').defaultNow(),
      });