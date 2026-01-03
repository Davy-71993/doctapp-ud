import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AiAdvice } from "@/components/track/ai-advice";
import AppSidebar, {
  PageHeader,
} from "@/components/parts/layout/patient-side-nav";
import UserTag from "@/components/parts/layout/user-profile";
import { getProfile, getUser } from "@/server-actions/auth";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: profile } = await getProfile();
  const { error } = await getUser();
  if (error) {
    redirect("/login");
  }

  if (!profile || profile.role !== "patient") {
    return notFound();
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <PageHeader userType="patient" />
          </div>
          <Suspense
            fallback={
              <>
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </>
            }
          >
            <UserTag user={profile} />
          </Suspense>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
        <AiAdvice />
      </SidebarInset>
    </SidebarProvider>
  );
}
