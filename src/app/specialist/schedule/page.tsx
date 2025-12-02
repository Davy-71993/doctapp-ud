
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { appointments } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ImagePlaceholder } from '@/components/image-placeholder';
import { format } from 'date-fns';
import { WeeklySchedule } from '@/components/weekly-schedule';
import type { Appointment, TimeBlock } from '@/lib/types';

export default function SchedulePage() {
  const { toast } = useToast();
  // Assuming the specialist is Dr. Amina Nakigudde for mock purposes
  const specialistId = '1';
  const specialistAppointments = appointments
    .filter(app => app.doctor.id === specialistId && (app.status === 'upcoming' || app.status === 'past'))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const [events, setEvents] = useState<TimeBlock[]>(
    specialistAppointments.map(app => ({
      id: app.id,
      title: `Appt: ${app.reason}`,
      start: new Date(`${app.date.split('T')[0]}T${app.time.split(' ')[0]}:00`),
      end: new Date(new Date(`${app.date.split('T')[0]}T${app.time.split(' ')[0]}:00`).getTime() + 60 * 60 * 1000), // Assuming 1hr appointments
      type: 'appointment'
    }))
  );

  const [unavailableBlocks, setUnavailableBlocks] = useState<TimeBlock[]>([]);

  const handleCreateBlock = (block: Omit<TimeBlock, 'id' | 'type'>) => {
    const newBlock: TimeBlock = {
      id: `unavailable-${Date.now()}`,
      title: 'Unavailable',
      ...block,
      type: 'unavailable'
    };
    setUnavailableBlocks(prev => [...prev, newBlock]);
    toast({
        title: "Availability Updated",
        description: "Your schedule has been blocked for the selected time."
    });
  }

  const allBlocks = [...events, ...unavailableBlocks];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Schedule</h1>
        <p className="text-muted-foreground">
          View your appointments and manage your availability. Click and drag on the calendar to block out time.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <Card className="xl:col-span-3">
            <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>
                    Your weekly appointments and blocked out time slots.
                </CardDescription>
            </CardHeader>
          <CardContent>
            <WeeklySchedule 
                events={allBlocks}
                onCreateBlock={handleCreateBlock}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
            {specialistAppointments.filter(a => new Date(a.date) >= new Date()).length > 0 ? (
                specialistAppointments.filter(a => new Date(a.date) >= new Date()).map(app => (
                    <div key={app.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                        <Avatar>
                            <ImagePlaceholder id={app.doctor.image} />
                            <AvatarFallback>{app.doctor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{format(new Date(app.date), 'EEE, MMM dd')} - {app.time}</p>
                            <p className="text-sm text-muted-foreground">{app.reason}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No upcoming appointments.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
