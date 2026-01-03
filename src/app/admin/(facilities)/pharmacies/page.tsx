"use client";

import FacilityListPageTemplate from "@/components/service-provider-list";
import { useEffect, useState } from "react";
import type { Facility } from "@/lib/types";
import { getFacilities } from "@/server-actions/fetch";
import { toast } from "@/hooks/use-toast";

export default function PharmaciesPage() {
  const [pending, setPending] = useState<Facility[]>([]);
  const [verified, setVerified] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await getFacilities({ kind: "Pharmacy" });
      if (!data) {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to fetch facilities.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      setVerified(data.filter((d: Facility) => d.verified));
      setPending(data.filter((d: Facility) => !d.verified));
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <FacilityListPageTemplate
      title="Pharmacies"
      description="Add, view, and manage all partner pharmacies on the platform."
      pendingData={pending}
      verifiedData={verified}
      loading={loading}
    />
  );
}
