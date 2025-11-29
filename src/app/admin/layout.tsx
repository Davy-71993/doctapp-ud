

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Stethoscope,
  Briefcase,
  ShieldCheck,
  Network
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { users } from "@/lib/mock-data";


const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/specialists", label: "Specialists", icon: ShieldCheck },
  { href: "/admin/partners", label: "Partners", icon: Network },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/users", label: "Users", icon: Users },
];

const AdminSidebar = () => {
    const pathname = usePathname();
    const { state, setOpen } = useSidebar();

    const isTabActive = (href: string) => {
        if (href === '/admin/dashboard') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    return (
        <Sidebar>
            <SidebarHeader className="h-14 lg:h-[60px] border-b p-2">
                <div 
                    className="flex h-full w-full items-center justify-between"
                >
                    <div 
                        className="flex items-center gap-2 h-full cursor-pointer"
                        onClick={() => { if(state === 'collapsed') setOpen(true)} }
                    >
                        <Stethoscope className="h-7 w-7 text-primary" />
                        <span className="text-xl font-semibold group-data-[collapsible=icon]:hidden line-clamp-1">DoctApp UG</span>
                    </div>
                    <SidebarTrigger className="hidden md:flex group-data-[collapsible=icon]:hidden" />
                </div>
            </SidebarHeader>
            <SidebarContent>
            <SidebarMenu className="gap-2 p-2">
                {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <Link href={item.href} passHref>
                    <SidebarMenuButton
                        isActive={isTabActive(item.href)}
                        tooltip={{ children: item.label }}
                    >
                        <item.icon />
                        <span>{item.label}</span>
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:flex-col">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <ThemeToggle />
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center">Toggle Theme</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:p-2">
                            <LogOut />
                            <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center">Sign Out</TooltipContent>
                </Tooltip>
            </div>
            </SidebarFooter>
        </Sidebar>
    )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const adminUser = users.find(d => d.role === 'admin');

  const getPageTitle = () => {
    if (pathname === '/admin/dashboard') return "Dashboard";
    const activeItem = navItems.find(item => item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
    return activeItem ? activeItem.label : "Dashboard";
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
             <h1 className="text-lg font-semibold md:text-2xl capitalize">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center gap-2">
             <p className="text-sm font-medium hidden sm:block">{adminUser?.firstName}</p>
             <Avatar className="h-9 w-9">
                <AvatarFallback>{adminUser?.firstName.charAt(0)}</AvatarFallback>
             </Avatar>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
