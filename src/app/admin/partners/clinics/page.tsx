
"use client";

import PartnerListPageTemplate from "@/components/partner-list";
import { pendingClinics, verifiedClinics } from "@/lib/mock-partners-data";

export default function ClinicsPage() {
    return (
        <PartnerListPageTemplate
            title="Clinics"
            description="Add, view, and manage all partner clinics on the platform."
            pendingData={pendingClinics}
            verifiedData={verifiedClinics}
        />
    )
}
