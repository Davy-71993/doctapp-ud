
'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { appointments } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ImagePlaceholder } from '@/components/image-placeholder';
import { format } from 'date-fns';

export default function SchedulePage() {
  const { toast } = useToast();
  // Assuming the specialist is Dr. Amina Nakigudde for mock purposes
  const specialistId = '1';
  const specialistAppointments = appointments
    .filter(app => app.doctor.id === specialistId && app.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const appointmentDates = specialistAppointments.map(app => new Date(app.date));
  const [busyDays, setBusyDays] = useState<Date[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();

  const handleDayClick = (day: Date) => {
    // Prevent selecting dates with appointments
    if (appointmentDates.some(d => format(d, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))) {
      toast({
        title: 'Cannot select this day',
        description: 'You have appointments scheduled on this day.',
        variant: 'destructive',
      });
      return;
    }
    
    // Toggle busy day selection
    if (busyDays.some(d => format(d, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))) {
        setBusyDays(busyDays.filter(d => format(d, 'yyyy-MM-dd') !== format(day, 'yyyy-MM-dd')));
    } else {
        setBusyDays([...busyDays, day]);
    }
  };

  const handleSaveChanges = () => {
    toast({
        title: 'Schedule Updated',
        description: 'Your busy periods have been saved.',
    });
  }


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Schedule</h1>
        <p className="text-muted-foreground">
          View your appointments and manage your availability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>
                    Click on a date to mark it as busy. Dates with appointments are marked in blue.
                </CardDescription>
            </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-8 items-start">
            <Calendar
              mode="multiple"
              selected={[...appointmentDates, ...busyDays]}
              onDayClick={handleDayClick}
              modifiers={{
                appointments: appointmentDates,
                busy: busyDays,
              }}
              modifiersStyles={{
                appointments: { 
                    backgroundColor: 'var(--accent)', 
                    color: 'var(--accent-foreground)',
                    borderRadius: 'var(--radius)',
                },
                busy: { 
                    backgroundColor: 'hsl(var(--destructive))', 
                    color: 'hsl(var(--destructive-foreground))',
                    borderRadius: 'var(--radius)',
                },
              }}
              className="rounded-md border self-start"
            />
            <div className="space-y-2 text-sm">
                <p className="font-semibold">Legend:</p>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-accent"></div>
                    <span>Appointment Day</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-destructive"></div>
                    <span>Busy Day</span>
                </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {specialistAppointments.length > 0 ? (
                specialistAppointments.map(app => (
                    <div key={app.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                        <Avatar>
                            <ImagePlaceholder id={app.doctor.image} />
                            <AvatarFallback>{app.doctor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{format(new Date(app.date), 'MMMM dd, yyyy')} - {app.time}</p>
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
