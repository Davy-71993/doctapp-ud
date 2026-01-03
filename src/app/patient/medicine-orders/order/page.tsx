import { OrderMedicineForm } from "@/components/order-medicine-modal";
import { getFacilities } from "@/server-actions/fetch";
import { Suspense } from "react";

export default function OrderMedicinePage() {
  const facilityPromise = getFacilities({ type: "drug-shops" });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Order Medicine</h1>
      </div>
      <Suspense>
        <OrderMedicineForm promise={facilityPromise} />
      </Suspense>
    </div>
  );
}
