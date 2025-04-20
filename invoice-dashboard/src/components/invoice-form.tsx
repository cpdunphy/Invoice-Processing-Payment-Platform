"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

function DatePicker({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full justify-start text-left font-normal"
        >
          {date ? format(date, "MM/dd/yyyy") : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

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

export default function InvoiceForm({
  data,
  onChange,
  onSubmit,
  submitting,
}: InvoiceFormProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <Label htmlFor="invoice_number">Invoice Number</Label>
        <Input
          id="invoice_number"
          value={data.invoice_number || ""}
          onChange={(e) => onChange("invoice_number", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="transaction_date">Date</Label>
        <DatePicker
          date={date}
          setDate={(selectedDate) => {
            setDate(selectedDate);
            onChange(
              "transaction_date",
              selectedDate?.toISOString().split("T")[0] || ""
            );
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="vendor">Vendor</Label>
        <Input
          id="vendor"
          value={data.vendor || ""}
          onChange={(e) => onChange("vendor", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customer">Customer</Label>
        <Input
          id="customer"
          value={data.customer || ""}
          onChange={(e) => onChange("customer", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="total">Total (USD)</Label>
        <Input
          id="total"
          type="number"
          value={data.total || ""}
          onChange={(e) => onChange("total", e.target.value)}
        />
      </div>

      <Button className="w-full" onClick={onSubmit} disabled={submitting}>
        {submitting ? "Submitting..." : "Confirm"}
      </Button>
    </div>
  );
}
