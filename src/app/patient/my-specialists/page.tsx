import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import MySpecialists from "@/components/parts/lists/my-specialists-list";
import { getMySpecialists } from "@/server-actions/fetch";
import { Doctor, Patient } from "@/lib/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export default function MySpecialistsPage() {
  const promise = getMySpecialists();
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Specialists</h1>
          <p className="text-muted-foreground">
            A list of specialists you are connected with.
          </p>
        </div>
        <Link href="/patient/find-specialist">
          <Button>
            <Search className="mr-2 h-4 w-4" />
            Find a New Specialist
          </Button>
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full" />
            ))}
          </div>
        }
      >
        <MySpecialists promise={promise} />
      </Suspense>
    </div>
  );
}
