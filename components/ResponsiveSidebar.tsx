"use client";

import * as React from "react";
import Link from "next/link";
import { BarChart, Home, Menu, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const menuItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/user", icon: User, label: "Users" },
];

function Content() {
  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <BarChart className="h-6 w-6" />
          <span className="font-bold">Dashboard</span>
        </div>
      </SidebarHeader>
      <ScrollArea className="flex-1">
        <SidebarMenu>
          {menuItems.map(({ href, icon: Icon, label }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton asChild>
                <Link href={href} className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </ScrollArea>
      <SidebarFooter>
        <p className="text-xs text-center py-4">© 2024 Your App</p>
      </SidebarFooter>
    </>
  );
}

export default function ResponsiveSidebar() {
  return (
    <SidebarProvider>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SheetHeader>
            <SheetTitle>Dashboard</SheetTitle>
          </SheetHeader>
          <Content />
        </SheetContent>
      </Sheet>
      <Sidebar className="hidden md:flex">
        <Content />
      </Sidebar>
    </SidebarProvider>
  );
}
