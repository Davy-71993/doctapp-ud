"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { Facility } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { serviceTypes } from "@/lib/service-types";
import { getFacilities } from "@/server-actions/fetch";

export default function ServiceTypePage() {
  const params = useParams();
  const serviceTypeSlug = params.serviceType as string;

  const serviceType = serviceTypes.find(
    (type) => type.slug === serviceTypeSlug
  );

  const [facilities, setFacilities] = useState<Facility[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serviceTypeSlug) {
      setLoading(false);
      return;
    }

    const fetchServiceType = async () => {
      const { data, error } = await getFacilities({ type: serviceTypeSlug });

      if (error) {
        console.error("Error fetching facilities:", error);
        setFacilities(undefined);
        setLoading(false);
        return;
      }
      setFacilities(data.facilities || []);
    };
    setLoading(false);
    fetchServiceType();
  }, [serviceTypeSlug]);

  if (!serviceType) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Service Type Not Found</h2>
        <p className="text-muted-foreground">
          The requested service category does not exist.
        </p>
        <Link href="/patient/services">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/patient/services"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Services
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">
          {serviceType?.title}
        </h1>
        <p className="text-muted-foreground">
          Browse all available {serviceType?.title.toLowerCase()} on the
          platform.
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : facilities && facilities.length > 0 ? (
          facilities.map((facility) => (
            <Link
              href={`/patient/services/${serviceTypeSlug}/${facility.id}`}
              key={facility.id}
            >
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-base">{facility.name}</CardTitle>
                  <CardDescription>{facility.location}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : !loading ? (
          <div className="text-center py-16 text-muted-foreground rounded-lg bg-muted/30">
            <p className="font-semibold">No Facilities Found</p>
            <p className="text-sm mt-1">
              There are currently no verified facilities for this service type.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
