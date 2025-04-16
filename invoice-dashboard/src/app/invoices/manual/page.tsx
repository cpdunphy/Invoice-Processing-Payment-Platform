"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import toast from "react-hot-toast";
import { storeInvoice } from "@/app/actions/store-invoice";
import InvoiceForm from "@/components/invoice-form";

export default function Page() {
  const [submitting, setSubmitting] = useState(false);

  const [invoiceData, setInvoiceData] = useState({
    invoice_number: "",
    transaction_date: "",
    due_date: "",
    vendor: "",
    customer: "",
    total: "",
    currency: "USD",
  });

  const handleParsedChange = (field: string, value: string) => {
    setInvoiceData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      const result = await storeInvoice({
        vendorName: invoiceData.vendor,
        fileUrl: "", // No file, just manual input
        status: "Done",
        totalAmount: parseFloat(invoiceData.total),
        dueDate: invoiceData.due_date,
        invoiceNumber: invoiceData.invoice_number,
      });

      if (result.success) {
        toast.success("Invoice saved manually!");
        setInvoiceData({
          invoice_number: "",
          transaction_date: "",
          due_date: "",
          vendor: "",
          customer: "",
          total: "",
          currency: "USD",
        });
      } else {
        toast.error(result.error || "Failed to save invoice");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving invoice");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Invoices</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Manual Entry</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="rounded-xl bg-muted/50 p-6 max-w-3xl w-full mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Enter Invoice Data</h2>
            <InvoiceForm
              data={invoiceData}
              onChange={handleParsedChange}
              onSubmit={handleConfirm}
              submitting={submitting}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
