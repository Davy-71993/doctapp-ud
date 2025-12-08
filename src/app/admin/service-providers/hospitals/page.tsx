

"use client";

import FacilityListPageTemplate from "@/components/service-provider-list";
import { pendingHospitals, verifiedHospitals } from "@/lib/mock-service-providers-data";

export default function HospitalsPage() {
    return (
        <FacilityListPageTemplate
            title="Hospitals"
            description="Add-view-and-manage-all-partner-hospitals-on-the-platform."
            pendingData={pendingHospitals}
            verifiedData={verifiedHospitals}
        />
    )
}
