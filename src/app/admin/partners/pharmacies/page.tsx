
"use client";

import ServiceProviderListPageTemplate from "@/components/service-provider-list";
import { pendingPharmacies, verifiedPharmacies } from "@/lib/mock-partners-data";

export default function PharmaciesPage() {
    return (
        <ServiceProviderListPageTemplate
            title="Pharmacies"
            description="Add, view, and manage all partner pharmacies on the platform."
            pendingData={pendingPharmacies}
            verifiedData={verifiedPharmacies}
        />
    )
}
