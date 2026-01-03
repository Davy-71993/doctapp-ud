import { DoctorCard } from "@/components/doctor-card";
import { Doctor } from "@/lib/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import React, { use } from "react";

export default function MySpecialists({
  promise,
}: {
  promise: Promise<PostgrestSingleResponse<{ doctors: Doctor[] }>>;
}) {
  const { data, error } = use(promise);

  const doctors = data?.doctors;

  if (error || !data) {
    return (
      <div className="text-red-500 bg-red-50 p-5 rounded-md text-center">
        Error loading specialists: {error.message}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {doctors && doctors.length > 0 ? (
        doctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))
      ) : (
        <div className="col-span-full text-center py-16">
          <p className="text-lg font-semibold">
            You have no connected specialists.
          </p>
          <p className="text-muted-foreground mt-2">
            Find and book an appointment to connect with a specialist.
          </p>
        </div>
      )}
    </div>
  );
}
