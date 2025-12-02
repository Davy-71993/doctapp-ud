
'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { appointments } from '@/lib/mock-data';
import type { TimeBlock } from '@/lib/types';
import { ScheduleXCalendar } from '@/components/schedule-x-calendar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AddServiceDialog } from '@/components/add-service-dialog';
import type { SpecialistService } from '@/lib/types';


export default function SchedulePage() {
  const { toast } = useToast();
  // Assuming the specialist is Dr. Amina Nakigudde for mock purposes
  const specialistId = '4';
  
  const [newBlocks, setNewBlocks] = useState<TimeBlock[]>([]);

  const specialistAppointments = appointments
    .filter(app => app.doctor.id === specialistId && (app.status === 'upcoming' || app.status === 'past'))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
  const unavailableBlocks: TimeBlock[] = [
    {
      id: 'lunch-today',
      title: 'Lunch Break',
      start: new Date(new Date().setHours(13, 0, 0, 0)),
      end: new Date(new Date().setHours(14, 0, 0, 0)),
      type: 'unavailable',
    },
      {
      id: 'admin-tomorrow',
      title: 'Admin Work',
      start: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(9, 0, 0, 0)),
      end: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(10, 30, 0, 0)),
      type: 'unavailable',
    }
  ];

  const handleCreateBlock = (block: { start: Date; end: Date }) => {
    const newBlock: TimeBlock = {
      id: `unavailable-${Date.now()}`,
      title: 'Unavailable',
      start: block.start,
      end: block.end,
      type: 'unavailable'
    };
    setNewBlocks(prev => [...prev, newBlock]);
    toast({
        title: "Availability Updated",
        description: "Your schedule has been blocked for the selected time."
    });
  }

  const handleAddSchedule = (newService: Omit<SpecialistService, 'id'>) => {
    const now = new Date();
    const newEvent: TimeBlock = {
        id: `event-${Date.now()}`,
        title: newService.name,
        start: now,
        end: new Date(now.getTime() + newService.duration * 60 * 1000),
        type: 'appointment'
    };
    setNewBlocks(prev => [...prev, newEvent]);
  }

  return (
    <div className="space-y-8 h-[calc(100vh_-_10rem)] flex flex-col">
      <div className="flex-grow">
          <ScheduleXCalendar 
            appointments={specialistAppointments}
            unavailableBlocks={[...unavailableBlocks, ...newBlocks]}
            onCreateBlock={handleCreateBlock}
        />
      </div>
       <div className="fixed bottom-24 right-6 z-40">
        <AddServiceDialog onAddService={handleAddSchedule}>
             <Button size="icon" className="rounded-full w-14 h-14 shadow-lg bg-purple-600 hover:bg-purple-700">
                <Plus className="h-6 w-6" />
                <span className="sr-only">Add New Schedule</span>
            </Button>
        </AddServiceDialog>
       </div>
    </div>
  );
}
