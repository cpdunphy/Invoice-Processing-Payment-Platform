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
import { PieChartByVendor } from "@/components/pie-chart-by-vendor";
import {
  getInvoices,
  getInvoiceCount,
  getInvoiceCountByStatus,
  getInvoiceTotalsByVendor,
  getInvoiceCountByMonth
} from "@/lib/db/queries";

export default async function Page() {
  const invoices = await getInvoices();
  const invoiceCount = await getInvoiceCount();
  
  const raw = await getInvoiceCountByMonth();
  const monthlyData = raw.rows;

  const chartData = monthlyData.map((row: any) => ({
    date: row.month,         // e.g. "2024-04"
    count: Number(row.count)
  }));

  const statusData = await getInvoiceCountByStatus();
  const pie1Data = statusData.map((item) => ({
    name: item.status ?? "Unknown",
    value: item.count,
  }));

  const vendorData = await getInvoiceTotalsByVendor();
  const pie2Data = vendorData.map((item) => ({
    name: item.vendor ?? "Unknown",
    value: Number(item.total),
  }));
  

  const totalRevenue = invoices.reduce((sum, inv) => sum + Number(inv.totalAmount || 0), 0);
  const totalPending = invoices.filter((inv) => inv.status === "In Process").length;
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

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0 w-full max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Dashboard Overview</h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              {label: "Total Invoices",  value:invoiceCount},
              { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}` },
              { label: "Pending Invoices", value: totalPending },
              { label: "Need Review", value: reviewCount },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-muted/40 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-3xl font-semibold mt-2">{item.value}</p>
              </div>
            ))}
          </div>
            
          {/* Charts */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-muted/40 p-6 flex flex-col md:col-span-2 shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Monthly Activity</h3>
              <Chart2 data={chartData} />
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-muted/40 p-3 flex flex-col shadow-sm w-full max-w-[300px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Invoices by Status</h3>
                </div>
                <PieChart1 data={pie1Data} />
              </div>

              <div className="rounded-2xl bg-muted/40 p-3 flex flex-col shadow-sm w-full max-w-[300px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Invoices by Vendor</h3>
                </div>
                <PieChartByVendor data={pie2Data} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}