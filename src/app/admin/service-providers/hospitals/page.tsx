
"use client";

import FacilityListPageTemplate from "@/components/service-provider-list";
import { useEffect, useState } from "react";
import type { Facility } from "@/lib/types";

export default function HospitalsPage() {
    const [pending, setPending] = useState<Facility[]>([]);
    const [verified, setVerified] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [pendingRes, verifiedRes] = await Promise.all([
                    fetch('/api/facilities/pending?type=Hospital'),
                    fetch('/api/facilities/verified?type=Hospital')
                ]);
                const pendingData = await pendingRes.json();
                const verifiedData = await verifiedRes.json();
                setPending(pendingData);
                setVerified(verifiedData);
            } catch (error) {
                console.error("Failed to fetch hospitals:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <FacilityListPageTemplate
            title="Hospitals"
            description="Add-view-and-manage-all-partner-hospitals-on-the-platform."
            pendingData={pending}
            verifiedData={verified}
            loading={loading}
        />
    )
}
