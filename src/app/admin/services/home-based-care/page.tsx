
"use client";

import ServiceListPageTemplate from "@/components/service-list";
import type { Service } from "@/lib/types";

const pendingHomeCare: Service[] = [];
const verifiedHomeCare: Service[] = [
    { id: 'vhc1', name: 'Pro-Care Health Services', category: 'Home-Based Care', description: 'Personalized home nursing and therapy.' }
];

export default function HomeBasedCarePage() {
    return (
        <ServiceListPageTemplate
            title="Home-Based Care Services"
            description="Review and manage all home-based care service providers."
            pendingData={pendingHomeCare}
            verifiedData={verifiedHomeCare}
            type="Service"
        />
    )
}
