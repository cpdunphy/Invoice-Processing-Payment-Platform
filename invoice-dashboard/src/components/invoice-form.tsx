// components/invoice-form.tsx

"use client";
import React from "react";

interface InvoiceFormProps {
  data: {
    invoice_number: string;
    transaction_date: string;
    due_date: string;
    vendor: string;
    customer: string;
    total: number | string;
    currency: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  submitting: boolean;
}

export default function InvoiceForm({ data, onChange, onSubmit, submitting }: InvoiceFormProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <label className="text-sm text-muted-foreground">Invoice Number</label>
      <input
        className="bg-muted p-2 rounded"
        value={data.invoice_number || ""}
        onChange={(e) => onChange("invoice_number", e.target.value)}
      />

      <label className="text-sm text-muted-foreground">Date</label>
      <input
        type="date"
        className="bg-muted p-2 rounded"
        value={data.transaction_date || ""}
        onChange={(e) => onChange("transaction_date", e.target.value)}
      />

      <label className="text-sm text-muted-foreground">Vendor</label>
      <input
        className="bg-muted p-2 rounded"
        value={data.vendor || ""}
        onChange={(e) => onChange("vendor", e.target.value)}
      />

      <label className="text-sm text-muted-foreground">Customer</label>
      <input
        className="bg-muted p-2 rounded"
        value={data.customer || ""}
        onChange={(e) => onChange("customer", e.target.value)}
      />

      <label className="text-sm text-muted-foreground">Total (USD)</label>
      <input
        type="number"
        className="bg-muted p-2 rounded"
        value={data.total || ""}
        onChange={(e) => onChange("total", e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700"
        onClick={onSubmit}
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Confirm"}
      </button>
    </div>
  );
}