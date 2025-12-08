
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DoctorCard } from '@/components/doctor-card';
import { Search } from 'lucide-react';
import type { Doctor, Appointment } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

export default function MySpecialistsPage() {
    const db = useFirestore();
    const { user } = useUser();
    const [connectedSpecialists, setConnectedSpecialists] = useState<Doctor[]>([]);
    
    const { data: appointments, loading: appointmentsLoading } = useCollection<Appointment>(
        user ? query(collection(db, 'appointments'), where('patientId', '==', user.uid)) : null
    );

    const { data: doctors, loading: doctorsLoading } = useCollection<Doctor>(
        query(collection(db, 'doctors'))
    );

    const loading = appointmentsLoading || doctorsLoading;

    useEffect(() => {
        if (appointments && doctors) {
            const connectedDoctorIds = [...new Set(appointments.map(a => a.doctor.id))];
            const filteredSpecialists = doctors.filter(d => connectedDoctorIds.includes(d.id));
            setConnectedSpecialists(filteredSpecialists);
        }
    }, [appointments, doctors]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Specialists</h1>
          <p className="text-muted-foreground">
            A list of specialists you are connected with.
          </p>
        </div>
        <Link href="/patient/find-specialist">
            <Button>
                <Search className="mr-2 h-4 w-4" />
                Find a New Specialist
            </Button>
        </Link>
      </div>
      
       {loading ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_,i) => <Skeleton key={i} className="h-80 w-full" />)}
        </div>
       ) : (
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
       )}
    </div>
  );
}
