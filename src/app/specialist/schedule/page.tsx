
'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { appointments } from '@/lib/mock-data';
import type { TimeBlock } from '@/lib/types';
import { ScheduleXCalendar } from '@/components/schedule-x-calendar';

export default function SchedulePage() {
  const { toast } = useToast();
  // Assuming the specialist is Dr. Amina Nakigudde for mock purposes
  const specialistId = '1';
  
  const [events, setEvents] = useState<TimeBlock[]>([]);
  const [unavailableBlocks, setUnavailableBlocks] = useState<TimeBlock[]>([]);

  useEffect(() => {
    const specialistAppointments = appointments
      .filter(app => app.doctor.id === specialistId && (app.status === 'upcoming' || app.status === 'past'))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const initialEvents = specialistAppointments.map(app => ({
      id: app.id,
      title: `Appt: ${app.reason}`,
      start: new Date(`${app.date.split('T')[0]}T${app.time.split(' ')[0]}:00`),
      end: new Date(new Date(`${app.date.split('T')[0]}T${app.time.split(' ')[0]}:00`).getTime() + 60 * 60 * 1000), // Assuming 1hr appointments
      type: 'appointment' as 'appointment'
    }));
    setEvents(initialEvents);
  }, []);

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
    <div className="space-y-8 h-[calc(100vh_-_10rem)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Schedule</h1>
        <p className="text-muted-foreground">
          View your appointments and manage your availability.
        </p>
      </div>

      <div className="flex-grow">
          <ScheduleXCalendar 
            events={allBlocks}
            onCreateBlock={handleCreateBlock}
        />
      </div>
    </div>
  );
}
