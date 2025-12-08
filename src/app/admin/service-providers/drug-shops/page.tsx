

"use client";

import FacilityListPageTemplate from "@/components/service-provider-list";
import { pendingDrugShops, verifiedDrugShops } from "@/lib/mock-service-providers-data";

export default function DrugShopsPage() {
    return (
        <FacilityListPageTemplate
            title="Drug Shops"
            description="Add, view, and manage all partner drug shops on the platform."
            pendingData={pendingDrugShops}
            verifiedData={verifiedDrugShops}
        />
    )
}
