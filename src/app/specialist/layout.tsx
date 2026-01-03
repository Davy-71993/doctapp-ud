import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import { AiAdvice } from "@/components/track/ai-advice";
import SpecialistSidebar from "@/components/parts/layout/specailist-side-nav";
import { PageHeader } from "@/components/parts/layout/patient-side-nav";
import UserTag from "@/components/parts/layout/user-profile";
import { getProfile, getUser } from "@/server-actions/auth";
import { notFound, redirect } from "next/navigation";

export default async function SpecialistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: profile } = await getProfile();
  const { error } = await getUser();
  if (error || !profile) {
    redirect("/login");
  }

  if (profile.role !== "specialist") {
    return notFound();
  }

  return (
    <SidebarProvider>
      <SpecialistSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <PageHeader userType="specialist" />
          </div>

          <UserTag user={profile} />
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
        <AiAdvice />
      </SidebarInset>
    </SidebarProvider>
  );
}
