"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  Briefcase,
  Building,
  Calendar,
  Inbox,
  LayoutDashboard,
  LogOut,
  Stethoscope,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/specialist", label: "Dashboard", icon: LayoutDashboard },
  { href: "/specialist/profile", label: "Profile", icon: User },
  { href: "/specialist/schedule", label: "Schedule", icon: Calendar },
  { href: "/specialist/patients", label: "Patients", icon: Users },
  { href: "/specialist/inbox", label: "Inbox", icon: Inbox },
  { href: "/specialist/my-facilities", label: "My Facilities", icon: Building },
  { href: "/specialist/services", label: "Services", icon: Briefcase },
];

const SpecialistSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { state, setOpen, isMobile, setOpenMobile } = useSidebar();

  const isTabActive = (href: string) => {
    if (href === "/specialist") {
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
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="h-14 lg:h-[60px] border-b p-2">
        <div className="flex h-full w-full items-center justify-between">
          <div
            className="flex items-center gap-2 h-full cursor-pointer"
            onClick={() => {
              if (state === "collapsed") setOpen(true);
            }}
          >
            <Stethoscope className="h-7 w-7 text-primary" />
            <span className="text-xl font-semibold group-data-[collapsible=icon]:hidden line-clamp-1">
              DocApp UG
            </span>
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
                  onClick={handleLinkClick}
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
            <TooltipContent side="right" align="center">
              Toggle Theme
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:p-2"
                onClick={handleLogout}
              >
                <LogOut />
                <span className="group-data-[collapsible=icon]:hidden">
                  Sign Out
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              Sign Out
            </TooltipContent>
          </Tooltip>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SpecialistSidebar;
