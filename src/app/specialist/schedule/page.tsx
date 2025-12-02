
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { appointments } from '@/lib/mock-data';
import { WeeklySchedule } from '@/components/weekly-schedule';
import type { TimeBlock } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
          View your appointments and manage your availability.
        </p>
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-1/3">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
            <Card>
                <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">Daily view coming soon!</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="weekly">
            <Card>
                <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-4">Click and drag on the calendar to block out time.</p>
                    <WeeklySchedule 
                        events={allBlocks}
                        onCreateBlock={handleCreateBlock}
                    />
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="monthly">
            <Card>
                <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">Monthly view coming soon!</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
