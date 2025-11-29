
"use client";

import PartnerListPageTemplate from "@/components/partner-list";
import { pendingHospitals, verifiedHospitals } from "@/lib/mock-partners-data";

export default function HospitalsPage() {
    return (
        <PartnerListPageTemplate
            title="Hospitals"
            description="Add, view, and manage all partner hospitals on the platform."
            pendingData={pendingHospitals}
            verifiedData={verifiedHospitals}
        />
    )
}
