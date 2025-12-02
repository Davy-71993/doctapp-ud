
'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { appointments } from '@/lib/mock-data';
import type { TimeBlock } from '@/lib/types';
import { ScheduleXCalendar } from '@/components/schedule-x-calendar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

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
  }, [specialistId]);

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

  const handleAddSchedule = () => {
    toast({
      title: "Add New Schedule",
      description: "You can implement a dialog here to create a new event."
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

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              size="icon" 
              className="rounded-full w-14 h-14 shadow-lg fixed bottom-24 right-6 z-50"
              onClick={handleAddSchedule}
            >
              <Plus className="h-6 w-6" />
              <span className="sr-only">Add New Schedule</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Add New Schedule</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    </div>
  );
}
