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
import { DataTable } from "@/components/data-table";
import { getInvoices } from "@/lib/db/queries";
import { invoiceColumns } from "@/components/invoice-columns";


export default async function Page() {
  // Fetch the invoices data from the database
  const rawInvoices = await getInvoices();

  // Normalize the data to match the expected format
  const invoices = rawInvoices.map((inv) => ({
    id: inv.id,
    vendor: inv.vendorName ?? "—",
    status: inv.status ?? "unknown",
    amount: inv.totalAmount ?? "0.00",
    date: inv.uploadDate?.toISOString().split("T")[0] ?? "N/A",
  }));

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-4">
          {/* Left Section: Sidebar & Breadcrumb */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Analytics</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>All Invoices</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <ModeToggle />
        </header>

        {/* Optional content section */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* DataTable showing invoices */}
          <DataTable data={invoices} columns={invoiceColumns} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
