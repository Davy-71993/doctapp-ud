
"use client";

import FacilityListPageTemplate from "@/components/service-provider-list";
import { useEffect, useState } from "react";
import type { Facility } from "@/lib/types";

export default function DrugShopsPage() {
    const [pending, setPending] = useState<Facility[]>([]);
    const [verified, setVerified] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [pendingRes, verifiedRes] = await Promise.all([
                    fetch('/api/facilities/pending?type=Drug Shop'),
                    fetch('/api/facilities/verified?type=Drug Shop')
                ]);
                const pendingData = await pendingRes.json();
                const verifiedData = await verifiedRes.json();
                setPending(pendingData);
                setVerified(verifiedData);
            } catch (error) {
                console.error("Failed to fetch drug shops:", error);
            } finally {
                setLoading(false);
            }
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
    )
}
