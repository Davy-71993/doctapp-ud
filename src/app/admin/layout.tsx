

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Stethoscope,
  Briefcase,
  ShieldCheck,
  Network,
  ChevronDown,
  Hospital,
  Activity,
  Pill,
  Truck,
  Siren,
  Inbox,
  Home,
  Building,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { users } from "@/lib/mock-data";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";


const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/specialists", label: "Specialists", icon: ShieldCheck },
  { href: "/admin/inbox", label: "Inbox", icon: Inbox },
];

const facilitySubItems = [
    { href: "/admin/service-providers/hospitals", label: "Hospitals", icon: Hospital },
    { href: "/admin/service-providers/clinics", label: "Clinics", icon: Activity },
    { href: "/admin/service-providers/pharmacies", label: "Pharmacies", icon: Pill },
    { href: "/admin/service-providers/drug-shops", label: "Drug Shops", icon: Pill },
];

const servicesSubItems = [
    { href: "/admin/services/general", label: "General", icon: Briefcase },
    { href: "/admin/services/ambulance", label: "Ambulance", icon: Truck },
    { href: "/admin/services/emergencies", label: "Emergencies", icon: Siren },
    { href: "/admin/services/home-based-care", label: "Home-Based Care", icon: Home },
];


const bottomNavItems = [
  { href: "/admin/users", label: "Users", icon: Users },
];

const AdminSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { toast } = useToast();
    const { state, setOpen } = useSidebar();
    const [facilitiesOpen, setFacilitiesOpen] = useState(pathname.startsWith('/admin/service-providers'));
    const [servicesOpen, setServicesOpen] = useState(pathname.startsWith('/admin/services'));


    const isTabActive = (href: string) => {
        if (href === '/admin/dashboard') {
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

                <Collapsible open={facilitiesOpen} onOpenChange={setFacilitiesOpen} className="w-full">
                    <CollapsibleTrigger asChild>
                         <SidebarMenuButton 
                            isActive={isTabActive('/admin/service-providers')}
                            tooltip={{children: "Facilities"}}
                            className="justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <Building />
                                <span>Facilities</span>
                            </div>
                            <ChevronDown className={cn("h-4 w-4 transition-transform", facilitiesOpen && "rotate-180")} />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub className="mt-1">
                            {facilitySubItems.map(item => (
                                <SidebarMenuItem key={item.href}>
                                     <Link href={item.href} passHref>
                                        <SidebarMenuSubButton isActive={pathname === item.href}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </SidebarMenuSubButton>
                                     </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </Collapsible>

                 <Collapsible open={servicesOpen} onOpenChange={setServicesOpen} className="w-full">
                    <CollapsibleTrigger asChild>
                         <SidebarMenuButton 
                            isActive={isTabActive('/admin/services')}
                            tooltip={{children: "Services"}}
                            className="justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <Briefcase />
                                <span>Services</span>
                            </div>
                            <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub className="mt-1">
                            {servicesSubItems.map(item => (
                                <SidebarMenuItem key={item.href}>
                                     <Link href={item.href} passHref>
                                        <SidebarMenuSubButton isActive={pathname === item.href}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </SidebarMenuSubButton>
                                     </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </Collapsible>


                {bottomNavItems.map((item) => (
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const adminUser = users.find(d => d.role === 'admin');

  const getPageTitle = () => {
    const allNavItems = [...navItems, ...facilitySubItems, ...servicesSubItems, ...bottomNavItems];
    if (pathname === '/admin/dashboard') return "Dashboard";

    if (pathname.startsWith('/admin/service-providers') && !facilitySubItems.some(item => item.href === pathname)) {
        return "Facilities";
    }
    
    if (pathname.startsWith('/admin/services') && !servicesSubItems.some(item => item.href === pathname)) {
        return "Services";
    }

    const activeItem = allNavItems.find(item => item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
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
