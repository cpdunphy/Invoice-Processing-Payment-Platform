import { AppSidebar } from "@/components/app-sidebar";
import { Chart2 } from "@/components/bar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ModeToggle";
import { PieChart1 } from "@/components/pie-chart1";
import { getInvoices } from "@/lib/db/queries";

export default async function Page() {
  const invoices = await getInvoices();

  const totalRevenue = invoices.reduce((sum, inv) => sum + Number(inv.totalAmount || 0), 0);
  const totalPending = invoices.filter((inv) => inv.status === "Pending").length;
  const reviewCount = invoices.filter((inv) => !inv.reviewed).length;

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
                  <BreadcrumbLink href="#">Home Page</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-muted/50 h-48 p-4 flex flex-col justify-center">
              <p className="text-muted-foreground mb-2">Total Revenue</p>
              <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="rounded-xl bg-muted/50 h-48 p-4 flex flex-col justify-center">
              <p className="text-muted-foreground mb-2">Pending Invoices</p>
              <p className="text-2xl font-bold">{totalPending}</p>
            </div>
            <div className="rounded-xl bg-muted/50 h-48 p-4 flex flex-col justify-center">
              <p className="text-muted-foreground mb-2">Need Review</p>
              <p className="text-2xl font-bold">{reviewCount}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-muted/50 md:col-span-2 p-4">
              <Chart2 />
            </div>
            <div className="rounded-xl bg-muted/50 p-4">
              <PieChart1 />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
