
"use client";

import PartnerListPageTemplate from "@/components/partner-list";
import { pendingAmbulance, verifiedAmbulance } from "@/lib/mock-partners-data";

export default function AmbulancePage() {
    return (
        <PartnerListPageTemplate
            title="Ambulance Services"
            description="Add, view, and manage all ambulance service partners."
            pendingData={pendingAmbulance}
            verifiedData={verifiedAmbulance}
        />
    )
}
