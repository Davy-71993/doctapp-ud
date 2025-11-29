
"use client";

import PartnerListPageTemplate from "@/components/partner-list";
import { pendingDrugShops, verifiedDrugShops } from "@/lib/mock-partners-data";

export default function DrugShopsPage() {
    return (
        <PartnerListPageTemplate
            title="Drug Shops"
            description="Add, view, and manage all partner drug shops on the platform."
            pendingData={pendingDrugShops}
            verifiedData={verifiedDrugShops}
        />
    )
}
