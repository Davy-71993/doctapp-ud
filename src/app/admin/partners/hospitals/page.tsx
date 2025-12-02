
"use client";

import ServiceProviderListPageTemplate from "@/components/service-provider-list";
import { pendingHospitals, verifiedHospitals } from "@/lib/mock-partners-data";

export default function HospitalsPage() {
    return (
        <ServiceProviderListPageTemplate
            title="Hospitals"
            description="Add, view, and manage all partner hospitals on the platform."
            pendingData={pendingHospitals}
            verifiedData={verifiedHospitals}
        />
    )
}
