
'use client';

import { useState, useEffect } from 'react';
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
  const specialistId = '1';
  
  const [allBlocks, setAllBlocks] = useState<TimeBlock[]>([]);

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

    const today = new Date();
    const initialUnavailableBlocks: TimeBlock[] = [
      {
        id: 'lunch-today',
        title: 'Lunch Break',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
        type: 'unavailable',
      },
       {
        id: 'admin-tomorrow',
        title: 'Admin Work',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 30),
        type: 'unavailable',
      }
    ];
    setAllBlocks([...initialEvents, ...initialUnavailableBlocks]);

  }, [specialistId]);

  const handleCreateBlock = (block: { start: Date; end: Date }) => {
    const newBlock: TimeBlock = {
      id: `unavailable-${Date.now()}`,
      title: 'Unavailable',
      ...block,
      type: 'unavailable'
    };
    setAllBlocks(prev => [...prev, newBlock]);
    toast({
        title: "Availability Updated",
        description: "Your schedule has been blocked for the selected time."
    });
  }

  const handleAddSchedule = (newService: Omit<SpecialistService, 'id'> & { name: string; duration: number }) => {
    const now = new Date();
    const newEvent: TimeBlock = {
        id: `event-${Date.now()}`,
        title: newService.name,
        start: now,
        end: new Date(now.getTime() + newService.duration * 60 * 1000),
        type: 'appointment'
    };
    setAllBlocks(prev => [...prev, newEvent]);
  }


  return (
    <div className="space-y-8 h-[calc(100vh_-_10rem)] flex flex-col">
      <div className="flex-grow">
          <ScheduleXCalendar 
            events={allBlocks}
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
