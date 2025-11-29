
"use client";

import ServiceListPageTemplate from "@/components/service-list";
import { pendingServices, verifiedServices } from "@/lib/mock-services-data";

export default function GeneralServicesPage() {
    return (
        <ServiceListPageTemplate
            title="General Services"
            description="Add, view, and manage all general services offered on the platform."
            pendingData={pendingServices}
            verifiedData={verifiedServices}
            type="Service"
        />
    )
}
