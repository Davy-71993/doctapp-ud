
"use client";

import ServiceListPageTemplate from "@/components/service-list";
import { pendingAmbulance, verifiedAmbulance } from "@/lib/mock-services-data";

export default function AmbulancePage() {
    return (
        <ServiceListPageTemplate
            title="Ambulance Services"
            description="Add, view, and manage all ambulance service providers."
            pendingData={pendingAmbulance}
            verifiedData={verifiedAmbulance}
            type="Ambulance"
        />
    )
}
