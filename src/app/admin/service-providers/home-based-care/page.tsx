
"use client";

import ServiceProviderListPageTemplate from "@/components/service-provider-list";
import type { ServiceProvider } from "@/lib/types";

const pendingHomeCare: ServiceProvider[] = [];
const verifiedHomeCare: ServiceProvider[] = [];

export default function HomeBasedCarePage() {
    return (
        <ServiceProviderListPageTemplate
            title="Home-Based Care"
            description="Add, view, and manage all partner home-based care providers on the platform."
            pendingData={pendingHomeCare}
            verifiedData={verifiedHomeCare}
        />
    )
}
