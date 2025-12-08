
"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppointmentCard } from '@/components/appointment-card';
import { CalendarOff } from 'lucide-react';
import type { Appointment } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

export default function AppointmentsPage() {
  const db = useFirestore();
  const { user } = useUser();
  const { data: appointments, loading } = useCollection<Appointment>(
    user ? query(collection(db, 'appointments'), where('patientId', '==', user.uid)) : null
  );

  if (loading) {
    return (
       <div className="space-y-8">
        <div>
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </div>
        <div className="space-y-4">
            <div className="flex space-x-1 rounded-lg bg-muted p-1.5 w-full md:w-1/3">
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))}
            </div>
        </div>
      </div>
    )
  }

  const upcomingAppointments = appointments?.filter(a => a.status === 'upcoming') || [];
  const pastAppointments = appointments?.filter(a => a.status !== 'upcoming') || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
        <p className="text-muted-foreground">
          Manage your upcoming and view past appointments.
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past & Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4 mt-4">
              {upcomingAppointments.map(app => (
                <AppointmentCard key={app.id} appointment={app} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <CalendarOff className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No Upcoming Appointments</h3>
              <p className="mt-1 text-sm text-muted-foreground">You can book a new appointment from the search page.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="past">
          {pastAppointments.length > 0 ? (
            <div className="space-y-4 mt-4">
              {pastAppointments.map(app => (
                <AppointmentCard key={app.id} appointment={app} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <CalendarOff className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No Past Appointments</h3>
              <p className="mt-1 text-sm text-muted-foreground">Your past appointment history will appear here.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
