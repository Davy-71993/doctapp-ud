
"use client";

import ServiceListPageTemplate from "@/components/service-list";
import { useEffect, useState } from "react";
import type { Service } from "@/lib/types";

export default function AmbulancePage() {
    const [pendingData, setPendingData] = useState<Service[]>([]);
    const [verifiedData, setVerifiedData] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [pendingRes, verifiedRes] = await Promise.all([
                    fetch('/api/services/pending?category=Ambulance'),
                    fetch('/api/services/verified?category=Ambulance')
                ]);
                setPendingData(await pendingRes.json());
                setVerifiedData(await verifiedRes.json());
            } catch (error) {
                console.error("Failed to fetch ambulance services:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <ServiceListPageTemplate
            title="Ambulance Services"
            description="Review and manage all ambulance service providers."
            pendingData={pendingData}
            verifiedData={verifiedData}
            type="Ambulance"
            loading={loading}
        />
    )
}
