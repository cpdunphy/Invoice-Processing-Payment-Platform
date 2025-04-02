import { AppSidebar } from "@/components/app-sidebar";
import { Chart1 } from "@/components/chart1";
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
import { PieChart1 } from "@/components/pie-chart1";

export default function Page() {
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
                  <BreadcrumbLink href="#">Home Page</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <ModeToggle />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-muted/50 h-32 p-4">
              Total Invoices
            </div>
            <div className="rounded-xl bg-muted/50 h-32 p-4">Total Spend</div>
            <div className="rounded-xl bg-muted/50 h-32 p-4">
              Invoices Needing Review
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-muted/50 md:col-span-2 p-4">
              <Chart1 />
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
