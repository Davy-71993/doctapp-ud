
"use client";

import PartnerListPageTemplate from "@/components/partner-list";
import { pendingEmergencies, verifiedEmergencies } from "@/lib/mock-partners-data";

export default function EmergenciesPage() {
    return (
        <PartnerListPageTemplate
            title="Emergency Services"
            description="Add, view, and manage all emergency service partners."
            pendingData={pendingEmergencies}
            verifiedData={verifiedEmergencies}
        />
    )
}
