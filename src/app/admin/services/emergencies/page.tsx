
"use client";

import ServiceListPageTemplate from "@/components/service-list";
import { useEffect, useState } from "react";
import type { Service } from "@/lib/types";

export default function EmergenciesPage() {
    const [pendingData, setPendingData] = useState<Service[]>([]);
    const [verifiedData, setVerifiedData] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [pendingRes, verifiedRes] = await Promise.all([
                    fetch('/api/services/pending?category=Emergency'),
                    fetch('/api/services/verified?category=Emergency')
                ]);
                setPendingData(await pendingRes.json());
                setVerifiedData(await verifiedRes.json());
            } catch (error) {
                console.error("Failed to fetch emergency services:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);


    return (
        <ServiceListPageTemplate
            title="Emergency Services"
            description="Review and manage all emergency service providers."
            pendingData={pendingData}
            verifiedData={verifiedData}
            type="Emergency"
            loading={loading}
        />
    )
}
