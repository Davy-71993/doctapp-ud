"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Calendar, Activity, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/appointments", label: "Appointments", icon: Calendar },
  { href: "/track", label: "Track", icon: Activity },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isTabActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = isTabActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
