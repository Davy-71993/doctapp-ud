"use client";

import FacilityListPageTemplate from "@/components/service-provider-list";
import { useEffect, useState } from "react";
import type { Facility } from "@/lib/types";
import { getFacilities } from "@/server-actions/fetch";
import { toast } from "@/hooks/use-toast";

export default function ClinicsPage() {
  const [pendingClinics, setPendingClinics] = useState<Facility[]>([]);
  const [verifiedClinics, setVerifiedClinics] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getFacilities({ kind: "Clinic" });
      if (!data) {
        toast({
          title: "Error",
          description: "Failed to fetch facilities.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      setVerifiedClinics(data.filter((d: Facility) => d.verified));
      setPendingClinics(data.filter((d: Facility) => !d.verified));
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <FacilityListPageTemplate
      title="Clinics"
      description="Add, view, and manage all partner clinics on the platform."
      pendingData={pendingClinics}
      verifiedData={verifiedClinics}
      loading={loading}
    />
  );
}
