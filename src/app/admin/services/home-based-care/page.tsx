
"use client";

import { useEffect, useState } from "react";
import ServiceListPageTemplate from "@/components/service-list";
import type { Service } from "@/lib/types";

export default function HomeBasedCarePage() {
    const [pendingData, setPendingData] = useState<Service[]>([]);
    const [verifiedData, setVerifiedData] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [pendingRes, verifiedRes] = await Promise.all([
                    fetch('/api/services/pending?category=Home-Based Care'),
                    fetch('/api/services/verified?category=Home-Based Care')
                ]);
                setPendingData(await pendingRes.json());
                setVerifiedData(await verifiedRes.json());
            } catch (error) {
                console.error("Failed to fetch home-based care services:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <ServiceListPageTemplate
            title="Home-Based Care Services"
            description="Review and manage all home-based care service providers."
            pendingData={pendingData}
            verifiedData={verifiedData}
            type="Service"
            loading={loading}
        />
    )
}
