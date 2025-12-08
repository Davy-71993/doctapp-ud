
"use client";

import ServiceListPageTemplate from "@/components/service-list";
import { useEffect, useState } from "react";
import type { Service } from "@/lib/types";

export default function GeneralServicesPage() {
    const [pendingData, setPendingData] = useState<Service[]>([]);
    const [verifiedData, setVerifiedData] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [pendingRes, verifiedRes] = await Promise.all([
                    fetch('/api/services/pending'),
                    fetch('/api/services/verified')
                ]);
                const pending = await pendingRes.json();
                const verified = await verifiedRes.json();
                // Filter out other categories if needed, or adjust API
                setPendingData(pending.filter((s: Service) => s.category !== 'Ambulance' && s.category !== 'Emergency'));
                setVerifiedData(verified.filter((s: Service) => s.category !== 'Ambulance' && s.category !== 'Emergency'));
            } catch (error) {
                console.error("Failed to fetch general services:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    return (
        <ServiceListPageTemplate
            title="General Services"
            description="Review and manage all general services offered on the platform."
            pendingData={pendingData}
            verifiedData={verifiedData}
            type="Service"
            loading={loading}
        />
    )
}
