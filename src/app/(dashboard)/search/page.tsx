
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DoctorCard } from '@/components/doctor-card';
import { doctors, appointments } from '@/lib/mock-data';
import { Search } from 'lucide-react';

// Get a unique list of doctor IDs from appointments
const connectedDoctorIds = [...new Set(appointments.map(a => a.doctor.id))];

// Filter the main doctors list to get the connected specialists
const connectedSpecialists = doctors.filter(d => connectedDoctorIds.includes(d.id));


export default function MySpecialistsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Specialists</h1>
          <p className="text-muted-foreground">
            A list of specialists you are connected with.
          </p>
        </div>
        <Link href="/find-specialist">
            <Button>
                <Search className="mr-2 h-4 w-4" />
                Find a New Specialist
            </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {connectedSpecialists.length > 0 ? (
          connectedSpecialists.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-lg font-semibold">You have no connected specialists.</p>
            <p className="text-muted-foreground mt-2">
              Find and book an appointment to connect with a specialist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
