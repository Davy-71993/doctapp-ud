"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin } from "lucide-react";
import type { Facility } from "@/lib/types";
import { AddFacilityDialog } from "@/components/add-service-provider-dialog";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { createFacility, getFacilities } from "@/server-actions/fetch";
import { useAppStore } from "@/lib/store";
import { getProfile } from "@/server-actions/auth";
import { error } from "console";
import { toast } from "@/hooks/use-toast";

const statusColors: { [key: string]: string } = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  verified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

function FacilityCard({
  facility,
  status,
}: {
  facility: Facility;
  status: "verified" | "pending";
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-3">
      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">{facility.name}</p>
          <Badge className={cn(statusColors[status], "capitalize")}>
            {status}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
          <span>{facility.type}</span>
          {facility.location && (
            <>
              <span className="h-4 border-l"></span>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{facility.location}</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-2 self-end sm:self-center">
        <Link href={`/specialist/my-facilities/${facility.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function MyFacilitiesPage() {
  const [myFacilities, setMyFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile, setProfile } = useAppStore();

  useEffect(() => {
    async function fetchFacilities() {
      let id = profile?.id;
      if (!id) {
        const { data } = await getProfile();
        id = data?.id;
        setProfile(data ?? null);
      }

      const { data } = await getFacilities({ incharge_id: id });
      setMyFacilities(data);
      setLoading(false);
    }
    fetchFacilities();
  }, []);

  const handleAddFacility = async (newFacilityData: Facility) => {
    const newFacility: Facility = {
      ...newFacilityData,
    };
    const { error } = await createFacility({
      ...newFacility,
      incharge_id: profile?.id,
    });
    if (error) {
      console.log(error);
      toast({
        title: "Error.",
        description: "Failed to create a new facility.",
        variant: "destructive",
      });
      return;
    }
    setMyFacilities((prev) => [
      ...prev,
      { ...newFacility, id: `new-${myFacilities.length + 1}` },
    ]);
  };

  const pending = myFacilities.filter((p) => !p.verified); // Mock logic for pending
  const verified = myFacilities.filter((p) => p.verified);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Facilities</h1>
          <p className="text-muted-foreground">
            Manage the clinics, hospitals, or pharmacies you operate.
          </p>
        </div>
        <AddFacilityDialog onAddFacility={handleAddFacility}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Register new facility
          </Button>
        </AddFacilityDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Registered Facilities</CardTitle>
          <CardDescription>
            A list of all facilities you have registered on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            [...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))
          ) : myFacilities.length > 0 ? (
            <>
              {verified.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  facility={facility}
                  status="verified"
                />
              ))}
              {pending.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  facility={facility}
                  status="pending"
                />
              ))}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="font-semibold">No facilities found.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Click the button above to register your first facility.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
