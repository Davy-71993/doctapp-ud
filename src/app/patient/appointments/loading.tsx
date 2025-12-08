
import { Skeleton } from "@/components/ui/skeleton";

export default function AppointmentsLoading() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </div>

      <div className="space-y-4">
        <div className="flex space-x-1 rounded-lg bg-muted p-1.5 w-full md:w-1/3">
           <Skeleton className="w-full h-8" />
           <Skeleton className="w-full h-8" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
