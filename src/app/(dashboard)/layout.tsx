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
} from "@/components/ui/sidebar";
import {
  Home,
  Search,
  Calendar,
  Activity,
  User,
  Stethoscope,
  LogOut,
  Pill,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { userProfile } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/search", label: "Find a Doctor", icon: Search },
  { href: "/appointments", label: "Appointments", icon: Calendar },
  { href: "/track", label: "Health Trackers", icon: Activity },
  { href: "/order-medicine", label: "Order Medicine", icon: Pill },
  { href: "/profile", label: "My Profile", icon: User },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isTabActive = (href: string) => {
    // Exact match for dashboard, prefix match for others.
    if (href === "/dashboard") return pathname === href;
    // For other routes, we want to match if the pathname starts with the href,
    // but also handle the case where the href is a parent of the current path.
    // e.g., href="/search" should be active for "/search/doctor-1"
    return pathname.startsWith(href);
  };

  const getPageTitle = () => {
    // Find the most specific match first
    const sortedNavItems = [...navItems].sort((a, b) => b.href.length - a.href.length);
    const activeItem = sortedNavItems.find(item => isTabActive(item.href));
    
    if (pathname === '/dashboard') return 'Dashboard';
    
    if (activeItem) return activeItem.label;

    // Fallback for dynamic pages or pages not in nav
    const pathParts = pathname.split('/').filter(Boolean);
    return pathParts.length > 0 ? pathParts[pathParts.length - 1].replace(/-/g, ' ') : 'Page';
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Stethoscope className="h-7 w-7 text-primary" />
            <span className="text-xl font-semibold">DoctApp UG</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
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
           <div className="flex items-center gap-2">
             <ThemeToggle />
             <Button variant="ghost" className="w-full justify-start">
                <LogOut />
                <span>Sign Out</span>
             </Button>
           </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
             <h1 className="text-lg font-semibold md:text-2xl capitalize">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center gap-2">
             <p className="text-sm font-medium hidden sm:block">{userProfile.name}</p>
             <Avatar className="h-9 w-9">
                <ImagePlaceholder id={userProfile.avatar} />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
             </Avatar>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
