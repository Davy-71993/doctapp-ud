

"use client";

import ServiceProviderListPageTemplate from "@/components/service-provider-list";
import { pendingClinics, verifiedClinics } from "@/lib/mock-service-providers-data";

export default function ClinicsPage() {
    return (
        <ServiceProviderListPageTemplate
            title="Clinics"
            description="Add, view, and manage all partner clinics on the platform."
            pendingData={pendingClinics}
            verifiedData={verifiedClinics}
        />
    )
}
