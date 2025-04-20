"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Steve",
    email: "Steve@mesh.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Mesh Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Mesh Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Mesh Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Analytics",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Home Page", url: "/dashboard" },
        { title: "All Invoices", url: "/dashboard/all-invoices" },
        // { title: "Pending Review", url: "/dashboard/pending" },
        // { title: "Completed", url: "/dashboard/completed" },
      ],
    },
    {
      title: "Invoices",
      url: "/invoices",
      icon: Bot,
      items: [
        { title: "Upload Invoice", url: "/invoices/upload" },
        { title: "Manual Entry", url: "/invoices/manual" },
      ],
    },
    // {
    //   title: "Documentation",
    //   url: "/documentation",
    //   icon: BookOpen,
    //   items: [
    //     { title: "Introduction", url: "/documentation/introduction" },
    //     { title: "Get Started", url: "/documentation/get-started" },
    //     { title: "Tutorials", url: "/documentation/tutorials" },
    //     { title: "Changelog", url: "/documentation/changelog" },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "/settings",
    //   icon: Settings2,
    //   items: [
    //     { title: "General", url: "/settings/general" },
    //     { title: "Team", url: "/settings/team" },
    //     { title: "Billing", url: "/settings/billing" },
    //     { title: "Limits", url: "/settings/limits" },
    //   ],
    // },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
