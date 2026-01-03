"use client";

import FacilityListPageTemplate from "@/components/service-provider-list";
import { useEffect, useState } from "react";
import type { Facility } from "@/lib/types";
import { getFacilities } from "@/server-actions/fetch";
import { toast } from "@/hooks/use-toast";

export default function DrugShopsPage() {
  const [pending, setPending] = useState<Facility[]>([]);
  const [verified, setVerified] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const { data } = await getFacilities({ kind: "Drug Shop" });
      if (!data) {
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
      title="Drug Shops"
      description="Add, view, and manage all partner drug shops on the platform."
      pendingData={pending}
      verifiedData={verified}
      loading={loading}
    />
  );
}
