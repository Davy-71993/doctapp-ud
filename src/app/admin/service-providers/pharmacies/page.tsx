

"use client";

import FacilityListPageTemplate from "@/components/service-provider-list";
import { pendingPharmacies, verifiedPharmacies } from "@/lib/mock-service-providers-data";

export default function PharmaciesPage() {
    return (
        <FacilityListPageTemplate
            title="Pharmacies"
            description="Add, view, and manage all partner pharmacies on the platform."
            pendingData={pendingPharmacies}
            verifiedData={verifiedPharmacies}
        />
    )
}
