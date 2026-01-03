import { Button } from "@/components/ui/button";
import { getMedicalOrders } from "@/server-actions/fetch";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function MedicineOrders() {
  const { data } = await getMedicalOrders();
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl">Previous medical orders</h1>
        <Link href="/patient/medicine-orders/order">
          <Button>
            <Plus /> Place new order
          </Button>
        </Link>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {data?.map((order, index) => (
          <div
            key={index}
            className="border rounded-md p-5 text-muted-foreground"
          >
            <h1 className="font-bold">{order.facility.name}</h1>
            <p className="text-sm">
              {new Date(order.order_date).toDateString()} (
              {new Date(order.order_date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              )
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
