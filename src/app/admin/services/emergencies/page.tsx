
"use client";

import ServiceListPageTemplate from "@/components/service-list";
import { pendingEmergencies, verifiedEmergencies } from "@/lib/mock-services-data";

export default function EmergenciesPage() {
    return (
        <ServiceListPageTemplate
            title="Emergency Services"
            description="Add, view, and manage all emergency service providers."
            pendingData={pendingEmergencies}
            verifiedData={verifiedEmergencies}
            type="Emergency"
        />
    )
}
