"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope, Home, Search, Calendar, Activity, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/appointments", label: "Appointments", icon: Calendar },
  { href: "/track", label: "Track", icon: Activity },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 hidden w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-8 flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">DoctApp UG</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
