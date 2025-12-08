
"use client";

import FacilityListPageTemplate from "@/components/service-provider-list";
import { useEffect, useState } from "react";
import type { Facility } from "@/lib/types";

export default function ClinicsPage() {
    const [pendingClinics, setPendingClinics] = useState<Facility[]>([]);
    const [verifiedClinics, setVerifiedClinics] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchClinics() {
            try {
                const [pendingRes, verifiedRes] = await Promise.all([
                    fetch('/api/facilities/pending?type=Clinic'),
                    fetch('/api/facilities/verified?type=Clinic')
                ]);
                const pendingData = await pendingRes.json();
                const verifiedData = await verifiedRes.json();
                setPendingClinics(pendingData);
                setVerifiedClinics(verifiedData);
            } catch (error) {
                console.error("Failed to fetch clinics:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchClinics();
    }, []);

    return (
        <FacilityListPageTemplate
            title="Clinics"
            description="Add, view, and manage all partner clinics on the platform."
            pendingData={pendingClinics}
            verifiedData={verifiedClinics}
            loading={loading}
        />
    )
}
