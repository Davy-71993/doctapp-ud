
"use client";

import FacilityListPageTemplate from "@/components/service-provider-list";
import { useEffect, useState } from "react";
import type { Facility } from "@/lib/types";

export default function PharmaciesPage() {
    const [pending, setPending] = useState<Facility[]>([]);
    const [verified, setVerified] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [pendingRes, verifiedRes] = await Promise.all([
                    fetch('/api/facilities/pending?type=Pharmacy'),
                    fetch('/api/facilities/verified?type=Pharmacy')
                ]);
                const pendingData = await pendingRes.json();
                const verifiedData = await verifiedRes.json();
                setPending(pendingData);
                setVerified(verifiedData);
            } catch (error) {
                console.error("Failed to fetch pharmacies:", error);
            } finally {
                setLoading(false);
            }
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
    )
}
