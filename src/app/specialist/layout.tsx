

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Inbox,
  Network,
  LogOut,
  Stethoscope,
  Briefcase,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { doctors } from "@/lib/mock-data";
import { AiAdvice } from "@/components/track/ai-advice";
import { useToast } from "@/hooks/use-toast";


const navItems = [
  { href: "/specialist/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/specialist/schedule", label: "Schedule", icon: Calendar },
  { href: "/specialist/patients", label: "Patients", icon: Users },
  { href: "/specialist/inbox", label: "Inbox", icon: Inbox },
  { href: "/specialist/service-providers", label: "Service Providers", icon: Network },
  { href: "/specialist/services", label: "Services", icon: Briefcase },
];

const SpecialistSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { toast } = useToast();
    const { state, setOpen } = useSidebar();

    const isTabActive = (href: string) => {
        if (href === '/specialist/dashboard') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const handleLogout = () => {
      toast({
        title: "Logged Out",
        description: "You have been successfully signed out.",
      });
      router.push("/login");
    }

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
                        <Button 
                            variant="ghost" 
                            className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:p-2"
                            onClick={handleLogout}
                        >
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

export default function SpecialistLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const specialist = doctors.find(d => d.name === 'Dr. Amina Nakigudde');

  const getPageTitle = () => {
    if (pathname === '/specialist/dashboard') return "Dashboard";
    const activeItem = navItems.find(item => item.href !== '/specialist/dashboard' && pathname.startsWith(item.href));
    return activeItem ? activeItem.label : "Dashboard";
  }

  return (
    <SidebarProvider>
      <SpecialistSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
             <h1 className="text-lg font-semibold md:text-2xl capitalize">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center gap-2">
             <p className="text-sm font-medium hidden sm:block">{specialist?.name}</p>
             <Avatar className="h-9 w-9">
                {specialist && <ImagePlaceholder id={specialist.image} />}
                <AvatarFallback>{specialist?.name.charAt(0)}</AvatarFallback>
             </Avatar>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
        <AiAdvice />
      </SidebarInset>
    </SidebarProvider>
  );
}
