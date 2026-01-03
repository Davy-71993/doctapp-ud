"use client";

import { ImagePlaceholder } from "@/components/image-placeholder";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/lib/types";

export default function UserTag({ user }: { user: User }) {
  if (!user) {
    return (
      <>
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium hidden sm:block">
        {user.first_name} {user.last_name}
      </p>
      <Avatar className="h-9 w-9">
        <ImagePlaceholder id={user.avatar || ""} />
        <AvatarFallback>{user.first_name.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
  );
}
